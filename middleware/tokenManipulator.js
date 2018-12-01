
module.exports.getTokenFromRequest = function (request) {
    var headerToken = request.get('Authorization');
    var queryToken = request.query.access_token;
    var bodyToken = request.body.access_token;

    if (!!headerToken + !!queryToken + !!bodyToken > 1) {
        throw new InvalidRequestError('Invalid request: only one authentication method is allowed');
    }

    if (headerToken) {
        return getTokenFromRequestHeader(request);
    }

    if (queryToken) {
        return getTokenFromRequestQuery(request);
    }

    if (bodyToken) {
        return getTokenFromRequestBody(request);
    }

    throw new UnauthorizedRequestError('Unauthorized request: no authentication given');
};

const getTokenFromRequestHeader = function (request) {
    var token = request.get('Authorization');
    var matches = token.match(/Bearer\s(\S+)/);

    if (!matches) {
        throw new InvalidRequestError('Invalid request: malformed authorization header');
    }

    return matches[1];
};

const getTokenFromRequestQuery = function (request) {
    if (!this.allowBearerTokensInQueryString) {
        throw new InvalidRequestError('Invalid request: do not send bearer tokens in query URLs');
    }

    return request.query.access_token;
};

const getTokenFromRequestBody = function (request) {
    if (request.method === 'GET') {
        throw new InvalidRequestError('Invalid request: token may not be passed in the body when using the GET verb');
    }

    if (!request.is('application/x-www-form-urlencoded')) {
        throw new InvalidRequestError('Invalid request: content must be application/x-www-form-urlencoded');
    }

    return request.body.access_token;
};