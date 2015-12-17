var gpio = require('pi-gpio');

setTimeout(function () {
	gpio.open(7, "in", function (err) {
		gpio.read(7, function (data) {
			console.log(data);
		});
	});
}, 5000);