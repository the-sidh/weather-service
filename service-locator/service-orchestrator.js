function ServiceOrchestrator() {
    this.handleError = doHandleError;
}

module.exports = { ServiceOrchestrator };

async function doHandleError(req, res, err) {
    if (!(err && err.code && err.message)) {
        err = new Error();
        err.code = 520;
        err.message = 'Erro desconhecido';
    }
    res.status(err.code).send(err.message)
}




