
const jwt = require('jsonwebtoken');
const request = require('request');
const { getTokenFromRequest } = require('./tokenManipulator');

exports.roleAuthorization = function (roles) {

    return async function (req, res, next) {
        let token = getTokenFromRequest(req);
        var decoded = jwt.decode(token);
        let tokenRoles = decoded.roles;
        req.roles = tokenRoles;
        for (var i = 0; i < tokenRoles.length; i++) {
            let tokenRole = tokenRoles[i];
            if (roles.indexOf(tokenRole) > -1) {
                return next();
            }

        }
        res.status(401).json({ error: 'You are not authorized to view this content' });
        return next('Unauthorized');

    }
}
