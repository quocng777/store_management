const dataSource = require("../config/db");
const NotFoundException = require("../exception/notfound-exception");
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

const verifyUser = async(userId, token) => {
    const code = verificationCodeRepo
    .createQueryBuilder()
    .where('user_id = :userId', { userId })
    .getOne();

    if(!code) 
        throw new NotFoundException('Not found token');

    if(code === token && (new Date().getTime() > code.expire.getTime())) {
        await verificationCodeRepo.delete(code);
        return true;
    } else {
        return false;
    }

}

module.exports = {
    createVerificationToken,
    verifyUser,
}