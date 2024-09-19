const userModel = require('../model/user-model');
const bcrypt = require('bcrypt');
const ResponseDTO = require('../dto/response-dto');
const NotFoundException = require('../exception/notfound-exception');
const InvalidParamsException = require('../exception/invalid-params-exception');
const sequelize = require('../config/db');


const register = async (user) => {

    // check if email or phone number is unique
    if(findByEmail(user.email)) {
        throw new InvalidParamsException(`${user.email} is used by other user`);
    }

    if (findByPhone(user.phone)) {
        throw new InvalidParamsException(`${user.phone} is used by other user`);
    }

    user.password = await bcrypt.hash(user.password, 10);

    const savedUser = await userModel.create(user);

    return ResponseDTO.success(
        {
            name: savedUser.name,
            email: savedUser.email,
            phone: savedUser.phone
        }
    );
};

const findByEmail = (email) => {
    return userModel.findOne({
        where: {
            email: email.trim(),
        },
    })
}

const findByPhone = (phone) => {
    userModel.findOne({
        where: {
            phone: phone.trim(),
        },
    })
}

module.exports = {
    register
}