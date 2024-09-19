const { DataSource } = require('typeorm');

const dataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: ["src/model/*.js"],
    logging: true,
    synchronize: false,
});

dataSource.initialize()
.then(() => {
    console.log('Database connected');
})
.catch((error) => {
    console.error(error);
    console.log('Have errors when connecting database');
})

module.exports = dataSource;