class InvalidParamsException extends Error {
    constructor(message) {
        super(message);
    }
};

module.exports = InvalidParamsException;