const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const userService = require('../service/user-service');


passport.use(new LocalStrategy({
    usernameField: 'email'
}, async (username, password, done) => {
    try {
        const user = await userService.getUserByEmail(username);
        if(!user || !user.verified) {
            return done(null, false, 'Invalid credentials');
        }

        const isValid = await bcrypt.compare(password, user.password);

        if(isValid) {
            done(null, user);
        } else {
            done(null, false, 'Invalid credentials')
        }

    } catch(err) {
        console.error(err);
        done(err);
    }
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await userService.getById(id);
        done(null, user);
    } catch (error) {
        done(error);
    }
});

module.exports = passport;