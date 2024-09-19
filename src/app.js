const express = require('express');

require('dotenv').config();

const router = require('./router');
const errorHandlerMiddleware = require('./middleware/error-handler-middleware');
const passport = require('./config/passport');
const session = require('express-session');

const app = express();

app.use(session({
    secret: process.env.SESSION_SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: true
    }
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());
app.use(express.urlencoded(
    {extended: false}
));

app.use('/', router);

// handle global error
app.use(errorHandlerMiddleware);


const PORT = process.env.APP_PORT || 8080;

app.listen(
    PORT, () => {
        console.log(`Server is running on PORT ${PORT}`);
    }
);