const express = require('express');

require('dotenv').config();

const router = require('./router');
const errorHandlerMiddleware = require('./middleware/error-handler-middleware');

const app = express();

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