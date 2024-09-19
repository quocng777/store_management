const dataSource = require("../config/db");
const User = require("../model/user-model");
const VerificationCode = require("../model/verification-code-model")

const verificationCodeRepo = dataSource.getRepository(VerificationCode);
const userRepo = dataSource.getRepository(User);

const CHARACTER_DOMAIN = "0123456789";
const EXPIRATION_TIME = Number.parseInt(process.env.VERIFICATION_EXPIRATION_TIME);

const createRandomToken = () => {
    let token = "";

    for(let i = 0; i < 4; i++) {
        let rand = Math.floor(Math.random() * 10);
        token += CHARACTER_DOMAIN[rand];
    }

    return token;
}

const createVerificationToken = async (userId) => {

        // delete previous token before creating new one
       await verificationCodeRepo.createQueryBuilder('verificationCode')
       .delete()
       .from(VerificationCode)
       .where('user_id = :userId', { userId })
       .execute();

       const user = await userRepo.findOne({
        where: {
            id: userId,
        }
       })

       const token = createRandomToken();
       verificationCodeRepo.save({
        user,
        token,
        expire: new Date(Date.now() + EXPIRATION_TIME)
       })

       return token;
};

module.exports = {
    createVerificationToken,
}