const userService = require('../service/auth-service');

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

module.exports = {
    register,
}