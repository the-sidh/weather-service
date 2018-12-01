const jwt = require('jsonwebtoken');
const request = require('request');
const { getTokenFromRequest } = require('./tokenManipulator');
const { secret } = require('../config/configuration');


exports.tokenValidation = function (roles) {

    return async function (req, res, next) {
        let token = getTokenFromRequest(req);
        let validToken = await jwt.verify(token, secret, (err, decoded) => {
            return !!!err;
        });
        if (validToken) {
            let tokenValidationURL = 'http:\\\\localhost:3000\\oauth\\authenticate';
            let teste = await request.get(tokenValidationURL,
                function (error, response, body) {
                    // res.json({ msg: body });
                    if (response.statusCode !== 200) {
                        res.status(response.statusCode).send(response.statusMessage);
                    } else {
                        next();
                    }
                }).
                auth(null, null, true, token);
        } else {
            res.status(401).send('Malformed Token');
        }
    }
}