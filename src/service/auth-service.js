const User = require('../model/user-model');
const bcrypt = require('bcrypt');
const ResponseDTO = require('../dto/response-dto');
const InvalidParamsException = require('../exception/invalid-params-exception');
const dataSource = require('../config/db');
const verificationService = require('./verification-service');
const mailService = require('./mail-service');
const Address = require('../model/address-model');
const NotFoundException = require('../exception/notfound-exception');
const { In } = require('typeorm');
const { use } = require('passport');

const userRepository = dataSource.getRepository(User);
const addressRepo = dataSource.getRepository(Address);

const register = async (user) => {

    // check if email or phone number is unique
    if(await findByEmail(user.email)) {
        throw new InvalidParamsException(`${user.email} is used by other user`);
    }

    if (await findByPhone(user.phone)) {
        throw new InvalidParamsException(`${user.phone} is used by other user`);
    }

    if(user.address) {
        const address = await addressRepo.save(user.address);
        user.address = address;
    }

    user.verified = false;
    user.password = await bcrypt.hash(user.password, 10);

    const savedUser = await userRepository.save(user);

    const token = await verificationService.createVerificationToken(savedUser.id);

    mailService.sendVerificationCode(savedUser.email, token);

    return ResponseDTO.success(
        {
            name: savedUser.name,
            email: savedUser.email,
            phone: savedUser.phone,
            verified: savedUser.verified,
            birthDate: savedUser.birthDate,
            gender: savedUser.gender
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

const verifyEmail = async(email, token) => {
    const user = await userRepository
        .findOne({where: {email: email.toLowerCase().trim()}});
    if(!user) {
        throw new NotFoundException('User not found');
    } else if (user.verified) {
        throw new InvalidParamsException("User verified");
    }

    if(verificationService.verifyUser(user.id, token)) {
        userRepository.update({id: user.id}, {verified: true});

        return {
            id: user.id,
            name: user.name,
            email: user.email,
            verified: true,
        }
    } else {
        throw new InvalidParamsException('Invalid token');
    }

}

module.exports = {
    register,
    verifyEmail
}