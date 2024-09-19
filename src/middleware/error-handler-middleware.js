const ResponseDTO = require("../dto/response-dto");
const InvalidParamsException = require("../exception/invalid-params-exception");
const NotFoundException = require("../exception/notfound-exception")

const errorHandlerMiddleware = (err, request, response, next) => {
    if(err instanceof NotFoundException) {
        response.status(404).json(
            ResponseDTO.notfound(err.message)
        )
    } else if (err instanceof InvalidParamsException) {
        response.status(400).json(
            ResponseDTO.badRequest(err.message)
        )
    } else {
        response.status(500).json(
            ResponseDTO.notfound()
        );
    }
}

module.exports = errorHandlerMiddleware;