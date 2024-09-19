const express = require('express');

require('dotenv').config();

const router = require('./router');

const app = express();

app.use(express.json());
app.use(express.urlencoded(
    {extended: false}
));

app.use('/', router);


const PORT = process.env.APP_PORT || 8080;

app.listen(
    PORT, () => {
        console.log(`Server is running on PORT ${PORT}`);
    }
);