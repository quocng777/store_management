const transporter = require('../config/mail');

const mailOptions = {
    form: process.env.MAIL_USER,
}

const sendVerificationCode = async(to, token) => {
    try {
        transporter.sendMail({
            ...mailOptions,
            to,
            subject: 'Confirm your account',
            html: `This is your confirm toke: ${code}`,
        })
    } catch(err) {
        console.log(err);
    }
}

module.exports = {
    sendVerificationCode
}