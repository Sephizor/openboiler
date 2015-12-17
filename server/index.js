var gpio = require('pi-gpio');

gpio.open(7, "in");

setInterval(function () {

    gpio.read(7, function (err, value) {
        if(err) {
            console.log(err);
        }
        else {
            console.log(value);
        }
    });
}, 5000);

process.on('SIGINT', function() {
    console.log('Shutting down GPIO');
    gpio.close(7);
});