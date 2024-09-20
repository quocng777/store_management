const { use } = require('passport');
const ResponseDTO = require('../dto/response-dto');
const authService = require('../service/auth-service');
const InvalidParamsException = require('../exception/invalid-params-exception');

const SESSION_EXPIRE = Number.parseInt(process.env.SESSION_EXPIRE);

const register = async (req, res, next) => {
    try {
        let {
            name, email, phone, birthDate, password, address, gender
        } = req.body;

        if(!name || !email || !phone || !birthDate || !password || !address || !gender) {
            throw new InvalidParamsException('Invalid value');
        }

        birthDate = new Date(birthDate)
        
        const user = await authService.register({
            name, email, phone, birthDate, password, address, gender
        });
    
        return res.status(200)
        .json(user);
    } catch (err) {
        console.log(err);
        next(err);
    }
};

const login = (req, res, next) => {
    req.session.cookie.maxAge = SESSION_EXPIRE;
    req.session.cookie.expire = new Date(Date.now() + SESSION_EXPIRE);

    return res.status(200).json(
        ResponseDTO.success({
            id: req.user.id,
            email: req.user.email,
            name: req.user.name
        })
    );
}

const verifyAccount = async (req, res, next) => {
    try {
        const { email, token } = req.body;

        const user = await authService.verifyEmail(email, token);

        return res.status(200)
        .json(
            ResponseDTO.success(user)
        );
    } catch(err) {
        next(err);
    }
}

module.exports = {
    register,
    login,
    verifyAccount
}