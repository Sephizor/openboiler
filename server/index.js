var dht = require('node-dht-sensor');
var WebSocketServer = require('ws').Server;
var wss = new WebSocketServer({ port: 8082 });
var fs = require('fs');
var app = require('express')();
var cors = require('cors');

// Web API

var profiles = [];
var activeProfile = {};
var activeTemperature = 7;

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
        return "Friday" == currentDay;
    })[0];

    activeTemperature = matchedDay.times.filter(function (time) {
        return time.hour == currentHour;
    })[0].temperature;
};

activeProfile = getActiveProfile();

var startTiming = function () {
    setInterval(setCurrentHour(), 3600000);
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

app.get('/profiles', cors(corsOptions), function (req, res) {
    getProfiles();
    res.json(profiles);
});

app.options('/profile', cors(corsOptions));
app.post('/profile', cors(corsOptions), function (req, res) {

});

app.get('/activeProfile', cors(corsOptions), function (req, res) {
    res.json(activeProfile);
});

app.options('/activeProfile', cors(corsOptions));
app.post('/activeProfile', cors(corsOptions), function (req, res) {
    fs.writeFileSync('./activeprofile', req.body.name);
});

app.options('/temperature', cors(corsOptions));
app.post('/temperature', cors(corsOptions), function (req, res) {

});

app.listen(8081);

// Web socket

var tempValue = 0;
var humValue = 0;

wss.on('connection', function (ws) {
    ws.on('open', function () {
        console.log('Client connected');
    })
    ws.on('message', function (message) {
        if(message == 'isOn') {
            ws.send(boilerState);
        }
        else if(message == 'subscribe') {
            ws.send(JSON.stringify({ temp: tempValue, humidity: humValue}));

            setInterval(function () {
                ws.send(JSON.stringify({ temp: tempValue, humidity: humValue}));
            }, 30000);
        }
    });
    ws.on('close', function () {
        console.log('Client disconnected');
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
        console.log(tempValue, humValue);
    }, 30000);
}