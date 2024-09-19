// const { DataTypes } = require("sequelize");
// const sequelize = require("../config/db");

// const Address = sequelize.define('address', {
//     id: {
//         type: DataTypes.BIGINT,
//         primaryKey: true,
//     },
//     houseNumber: {
//         type: DataTypes.INTEGER,
//     },
//     ward: {
//         type: DataTypes.STRING
//     },
//     district: {
//         type: DataTypes.STRING
//     },
//     city: {
//         type: DataTypes.STRING
//     }
// }, {
//     tableName: 'address',
//     timestamps: false,
// });

const { EntitySchema } = require('typeorm');

const Address = new EntitySchema({
    name: 'Address',
    tableName: 'address',
    columns: {
        id: {
            type: "bigint",
            primary: true,
        },
        houseNumber: {
            type: "int",
        },
        ward: {
            type: "varchar"
        },
        district: {
            type: "varchar"
        },
        city: {
            type: "varchar"
        }
    }
});

module.exports = Address;