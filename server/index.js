var dht = require('node-dht-sensor');
var WebSocketServer = require('ws').Server;
var wss = new WebSocketServer({ port: 8082 });
var fs = require('fs');
var app = require('express')();
var cors = require('cors');

// Web API

var whitelist = [
    'http://192.168.1.180:8080'
];

var corsOptions = {
  origin: function(origin, callback){
    var originIsWhitelisted = whitelist.indexOf(origin) !== -1;
    callback(null, originIsWhitelisted);
  }
};

app.get('/profiles', cors(corsOptions), function (req, res) {
    var dir = './profiles';
    fs.readdir(dir, function (err, files) {
        var profiles = [];
        if(!err && files) {
            files.forEach(function (file) {
                var contents = fs.readFileSync(dir + '/' + file, 'utf-8');
                profiles.push(JSON.parse(contents));
            });
            res.json(profiles);
        }
        else {
            res.json([]);
        }
    });
});

app.options('/profile', cors(corsOptions));
app.post('/profile', cors(corsOptions), function (req, res) {

});

app.options('/temperature', cors(corsOptions));
app.post('/temperature', cors(corsOptions), function (req, res) {

});

app.listen(8081);

// Web socket

var tempValue = 0;
var humValue = 0;

wss.on('connection', function (ws) {
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