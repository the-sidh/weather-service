var express = require('express');
const router = express.Router();
const _ = require('lodash');
const { app } = require('../index');
const { roleAuthorization } = require('../middleware/authorization');
const { tokenValidation } = require('../middleware/tokenValidation');
const { weatherServiceLocator } = require('../service-locator/weather-service-orchestrator');

router.get('/weather/', [tokenValidation(), roleAuthorization(['creator', 'editor']), weatherServiceLocator()], getWeatherInfo);


async function getWeatherInfo(req, res, next) {

    let service = req.service;
    let weatherInfo = await service.execute();
    res.status(200).send(weatherInfo);
    next();
}




module.exports = router;