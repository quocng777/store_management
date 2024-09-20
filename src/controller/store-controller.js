const { response } = require("express");
const ResponseDTO = require("../dto/response-dto");
const InvalidParamsException = require("../exception/invalid-params-exception");
const storeService = require('../service/store-service');

const createStore = async (req, res, next) => {
    try {

        let { name, phone, email, houseNumber, ward, district, city } = req.body;

        if(!name || !phone && !email && !houseNumber && !ward && !district && !city)
            throw new InvalidParamsException('Invalid params');

        ward = Number.parseInt(ward);

        const address = { houseNumber, ward, district, city };
        const user = req.user;

        let logo;
        if(req.file) {
            logo = '/static/' + req.file?.filename;
        }

        const store = {
            name, phone, email, logo, address
        }

        const savedStore = await storeService.createStore(user, store);

        return res.status(201)
        .json(ResponseDTO.created(savedStore));
    } catch(err) {
        console.error(err);
        next(err);
    }
}

module.exports = {
    createStore
};