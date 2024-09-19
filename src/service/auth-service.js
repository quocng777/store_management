const User = require('../model/user-model');
const bcrypt = require('bcrypt');
const ResponseDTO = require('../dto/response-dto');
const InvalidParamsException = require('../exception/invalid-params-exception');
const dataSource = require('../config/db');

const userRepository = dataSource.getRepository(User);

const register = async (user) => {

    // check if email or phone number is unique
    if(await findByEmail(user.email)) {
        throw new InvalidParamsException(`${user.email} is used by other user`);
    }

    if (await findByPhone(user.phone)) {
        throw new InvalidParamsException(`${user.phone} is used by other user`);
    }

    user.password = await bcrypt.hash(user.password, 10);

    const savedUser = await userRepository.save(user);

    return ResponseDTO.success(
        {
            name: savedUser.name,
            email: savedUser.email,
            phone: savedUser.phone
        }
    );
};

const findByEmail = async (email) => {
    return await userRepository.findOne({
        where: {
            email: email.trim()
        }
    });
}

const findByPhone = async (phone) => {
    return await userRepository.findOne({
        where: {
            phone: phone.trim()
        }
    });
}

module.exports = {
    register
}