const { WeatherService } = require('../weather-service');

function WeatherServiceFake() { };
var ws = new WeatherService();

WeatherServiceFake.prototype = ws;
WeatherServiceFake.prototype.getTemperature = doGetTemperature;
WeatherServiceFake.prototype.getApparentTemperature = doGetApparentTemperature;

module.exports = { WeatherServiceFake };

async function doGetTemperature() {
	return 25;
}

function doGetApparentTemperature() {
	return 18;
}
