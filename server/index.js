var gpio = require('pi-gpio');

setInterval(function () {
    gpio.open(7, "in");

    gpio.read(7, function (err, value) {
        if(err) {
            console.log(err);
        }
        else {
            console.log(value);
        }
        gpio.close(7);
    });
}, 5000);