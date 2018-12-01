exports.weatherServiceLocator = function () {

    return async function (req, res, next) {

        const { WeatherServiceDarksky } = require('../services/weather/impl/weather-service-darksky');
        const {  WeatherServiceFake }  =  require('../services/weather/impl/weather-service-fake');

        let WeatherServiceController = function (weatherService) {
            this.weatherService = weatherService;
        };
        WeatherServiceController.prototype.execute = async function () {
            let temp = await this.weatherService.getTemperature();
            let atemp = await this.weatherService.getApparentTemperature();
            return { 'temperature': temp, apparent_temperature: atemp };
        };

        var tokenRoles = req.roles;
        var wsService = (tokenRoles.indexOf('creator') > -1) ? new WeatherServiceDarksky() : new WeatherServiceFake();
        let controller = new WeatherServiceController(wsService);

        req.service = controller;

        return next();

    }
}
