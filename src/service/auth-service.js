const userModel = require('../model/user-model');
const bcrypt = require('bcrypt');
const ResponseDTO = require('../dto/response-dto');


const register = async (user) => {
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

module.exports = {
    register
}