const httpStatus = require('http-status'); 

class ResponseDTO {
    data;
    message;
    code;

    constructor(data, message, code) {
        this.data = data;
        this.message = message;
        this.code = code;
    }

    static success(data) {
        return new ResponseDTO(data, httpStatus['200_NAME'], httpStatus[200])
    } 

    static created(data) {
        return new ResponseDTO(data, httpStatus['201_NAME'], httpStatus[201])
    }
}

module.exports = ResponseDTO;