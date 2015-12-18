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

});

app.options('/profile', cors(corsOptions));
app.post('/profile', cors(corsOptions), function (req, res) {

});

app.options('/temperature', cors(corsOptions));
app.post('/temperature', cors(corsOptions), function (req, res) {

});

// Web socket

var tempValue = 0;
var humValue = 0;

wss.on('connection', function (ws) {
    ws.send(tempValue);

    setInterval(function () {
        ws.send(tempValue);
    }, 30000);

    ws.on('message', function (message) {
        if(message == 'isOn') {
            ws.send(boilerState);
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