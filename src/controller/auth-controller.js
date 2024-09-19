const userService = require('../service/auth-service');

const register = async (req, res, next) => {
    try {
        let {
            name,
            email,
            phone,
            birthDate,
            password
        } = req.body;
    
        const user = await userService.register({
            name, email, phone, birthDate, password
        });
    
        return res.status(200)
        .json(user);
    } catch (err) {
        next(err);
    }
};

module.exports = {
    register,
}