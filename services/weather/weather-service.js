function WeatherService() {
  this.getTemperature = function (address) { },
    this.getApparentTemperature = function (address) { },
    this.getCoordinates = doGetCoordinates;
}

module.exports = { WeatherService };

async function doGetCoordinates(address) {
  return {
    lat: -23.533773,
    lng: -46.625290
  }
}

