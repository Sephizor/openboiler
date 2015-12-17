var gpio = require('pi-gpio');
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

gpio.open(7, "in");

setInterval(function () {
    gpio.read(7, function (err, value) {
        if(err) {
            console.log(err);
        }
        else {
            tempValue = value;
            console.log(value);
        }
    });
}, 30000);

process.on('SIGINT', function() {
    console.log('Shutting down GPIO');
    gpio.close(7);
    process.exit();
});