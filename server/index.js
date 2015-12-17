var gpio = require('pi-gpio');

setInterval(function () {
	gpio.open(7, "in", function (err) {
		gpio.read(7, function (data) {
			console.log(data);
		});
	});
}, 5000);