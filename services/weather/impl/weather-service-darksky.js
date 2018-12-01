

const axios = require('axios');
const { WeatherService } = require('../weather-service');

function WeatherServiceDarksky() { };
var teste = new WeatherService();

WeatherServiceDarksky.prototype = teste;
WeatherServiceDarksky.prototype.getTemperature = doGetTemperature;
WeatherServiceDarksky.prototype.getApparentTemperature = doGetApparentTemperature;

module.exports = { WeatherServiceDarksky };

async function doGetTemperature(adress) {
	let coordinates = await this.getCoordinates(adress);
	let response = await queryWeatherService(coordinates);
	return fToC(response.data.currently.temperature);
}

async function doGetApparentTemperature(adress) {
	let coordinates = await this.getCoordinates(adress);
	let response = await queryWeatherService(coordinates);
	return  fToC(response.data.currently.apparentTemperature);
}

async function queryWeatherService(coordinates) {
	try {
		const secretKey = 'c2c92ee18c05ee06c78e98ab6ad0eadf';
		const weatherURL = `https://api.darksky.net/forecast/${secretKey}/`;
		try {
			const response = axios.get(`${weatherURL}${coordinates.lat},${coordinates.lng}`);
			return response;
		} catch (err) {
			return false;
		}

	} catch (err) {
		console.log();
	}
}

function fToC(fahrenheit) {
	let fTemp = fahrenheit;
	return (fTemp - 32) * 5 / 9;
} 