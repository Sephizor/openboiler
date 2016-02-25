## OpenBoiler

This project provides a reference for creating your own wireless thermostat for use with a British Gas/Drayton wireless receiver, DHT11 temperature sensor and an FS1000A 433MHz transmitter

### Configuration

* Change the WebAPI and WebSocket URL constants in `web/app/app.js` to be the URL of your Raspberry Pi
* Edit the scripts in the initscripts folder to change the "dir" and "cmd" variables.
* Copy the scripts to /etc/init.d and ensure they are executable (`chmod +x`)
* run `update-rc.d heating defaults` and `update-rc.d heating-web defaults`
* `git clone https://github.com/tommybobbins/Raspi_433`
* `cd TRANSMITTER && make prep && make bgas && cp bgas /usr/bin`
* run `npm install && bower install`