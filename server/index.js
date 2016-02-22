var dht = require('node-dht-sensor');
var WebSocketServer = require('ws').Server;
var wss = new WebSocketServer({ port: 8082 });
var fs = require('fs');
var app = require('express')();
var cors = require('cors');
var bodyParser = require('body-parser');
var jsonfile = require('jsonfile');
var http = require('http');
var ps = require('child_process').exec;

// Web API

var profiles = [];
var activeProfile = {};
var activeTemperature = 7;
var isManualOverride = false;
var overriddenTemperature = 0;
var overrideTime = 0;
var overrideTimeFrom = 0;
var timerInterval;
var overrideTimeout;
var apiKey = fs.readFileSync('./weather-api-key.txt', 'utf-8');

Date.prototype.getDayOfWeek = function(){   
    return ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][ this.getDay() ];
};

var currentDay = new Date().getDayOfWeek();
var currentHour = new Date().getHours();

var getProfiles = function () {
    profiles.length = 0;
    var profilePaths = fs.readdirSync('./profiles');

    profilePaths.forEach(function (path) {
        var contents = fs.readFileSync('./profiles/' + path, 'utf-8');
        profiles.push(JSON.parse(contents));
    });
}

getProfiles();

var getActiveProfile = function () {
    var activeName = fs.readFileSync('./activeprofile', 'utf-8').trim();
    var filtered = profiles.filter(function (profile) {
        return profile.name == activeName;
    })[0];

    return filtered;
};

var setCurrentHour = function () {
    currentDay = new Date().getDayOfWeek();
    currentHour = new Date().getHours();
    setActiveTemperature();
};

var setActiveTemperature = function () {
    var matchedDay = activeProfile.days.filter(function (day) {
        return day.name == currentDay;
    })[0];

    activeTemperature = matchedDay.times.filter(function (time) {
        return time.hour == currentHour;
    })[0].temperature;
};

activeProfile = getActiveProfile();

var startTiming = function () {
    timerInterval = setInterval(setCurrentHour, 3600000);
};

var sync = function () {
    var dateToCheck = new Date();
    dateToCheck.setHours(dateToCheck.getHours() + 1);
    dateToCheck.setMinutes(0);
    dateToCheck.setSeconds(0);
    dateToCheck.setMilliseconds(0);
    var timeUntilNextHour = dateToCheck.getTime() - Date.now();
    setTimeout(startTiming(), timeUntilNextHour);
};

sync();
setActiveTemperature();

var whitelist = [
    'http://192.168.1.180:8080'
];

var corsOptions = {
  origin: function(origin, callback){
    var originIsWhitelisted = whitelist.indexOf(origin) !== -1;
    callback(null, true);
  }
};

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/weather', cors(corsOptions), function (req, res) {
    http.get('http://api.openweathermap.org/data/2.5/weather?q=Edinburgh&units=metric&appid=' + apiKey, function (response) {
        var retData = '';
        response.on('data', function (data) {
            retData += data;
        });
        response.on('end', function () {
            retData = JSON.parse(retData);
            res.json({
                temp: retData.main.temp,
                pressure: retData.main.pressure,
                minTemp: retData.main.temp_min,
                maxTemp: retData.main.temp_max,
                sunrise: retData.sys.sunrise * 1000,
                sunset: retData.sys.sunset * 1000,
		summary: retData.weather[0].main,
		icon: retData.weather[0].icon
            });    
        });
    }).on('error', function (err) {
        res.send(err);
    });
});

app.get('/profiles', cors(corsOptions), function (req, res) {
    getProfiles();
    res.json(profiles);
});

app.options('/profile', cors(corsOptions));
app.post('/profile', cors(corsOptions), function (req, res) {
    var newProfile = req.body;

    var profileName = newProfile.name.toLowerCase();

    jsonfile.writeFile('./profiles/' + profileName + '.profile', newProfile);

    res.end();
});

app.delete('/profile', cors(corsOptions), function (req, res) {
    var profileName = req.body.name.toLowerCase();

    fs.unlink('./profiles/' + profileName + '.profile');

    res.end();
});

app.get('/activeprofile', cors(corsOptions), function (req, res) {
    if(isManualOverride) {
        res.json({ temp: overriddenTemperature, resetTime: overrideTimeFrom + overrideTime });
    }
    res.json(activeProfile);
});

app.options('/activeprofile', cors(corsOptions));
app.post('/activeprofile', cors(corsOptions), function (req, res) {
    fs.writeFileSync('./activeprofile', req.body.name);
    res.end();
});

app.options('/temperature', cors(corsOptions));
app.post('/temperature', cors(corsOptions), function (req, res) {
    overriddenTemperature = req.body.temperature;
    overrideTime = req.body.time;
    overrideTimeFrom = Date.now();

    clearInterval(timerInterval);
    activeTemperature = overriddenTemperature;
    overrideTimeout = setTimeout(startTiming(), overrideTime);

    res.end();
});

app.delete('/temperature', cors(corsOptions), function (req, res) {
    overriddenTemperature = 0;
    overrideTime = 0;
    overrideTimeFrom = 0;
    clearTimeout(overrideTimeout);
    startTiming();
});

app.listen(8081);

// Web socket

var tempValue = 0;
var humValue = 0;

wss.on('connection', function (ws) {
    console.log('Client connected');
    var disconnected = false;
    ws.on('message', function (message) {
        if(message == 'isOn') {
            ws.send(boilerState);
        }
        else if(message == 'subscribe') {
            ws.send(JSON.stringify({ temp: tempValue, humidity: humValue}));

            var wsInterval = setInterval(function () {
                if(!disconnected) {
                    ws.send(JSON.stringify({ temp: tempValue, humidity: humValue}));
                }
                else {
                    clearInterval(wsInterval);
                }
            }, 30000);
        }
    });
    ws.on('close', function () {
        console.log('Client disconnected');
        disconnected = true;
    });
});

// Pi GPIO

var boilerState = false;

var sensor = {
    initialise: function () {
        return dht.initialize(11, 4);
    },
    read: function () {
        var readout = dht.read();
        tempValue = readout.temperature;
        humValue = readout.humidity;
    }
};

if(sensor.initialise()) {
    setInterval(function () {
        sensor.read();
        if(activeTemperature > tempValue) {
            if(!boilerState) {
                boilerState = true;
                ps('/usr/bin/bgas on');
            }
        }
        else {
            if(boilerState) {
                boilerState = false;
                ps('/usr/bin/bgas off');
            }
        }
    }, 30000);
}
