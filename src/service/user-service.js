const dataSource = require("../config/db");
const User = require("../model/user-model");

const userRepo = dataSource.getRepository(User);

const getUserByEmail = async(email) => {
    return await userRepo.findOne({
        where: {
            email:
            email.toLowerCase().trim()
        }
    })
};

const getById = async(id) => {
    return await userRepo.findOne({
        where: {
            id,
        }
    })
}

module.exports = {
    getUserByEmail,
    getById
}