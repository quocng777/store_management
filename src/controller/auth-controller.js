const userService = require('../service/auth-service');

const SESSION_EXPIRE = Number.parseInt(process.env.SESSION_EXPIRE);

const register = async (req, res, next) => {
    try {
        let {
            name,
            email,
            phone,
            birthDate,
            password,
            address,
            gender
        } = req.body;
    
        const user = await userService.register({
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

    return res.status(200).json({
        user: {
            id: req.user.id,
        }
    });
}

module.exports = {
    register,
    login
}