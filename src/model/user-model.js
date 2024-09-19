// const sequelize = require('../config/db');
// const { DataTypes } = require('sequelize');
// const User = sequelize.define('User', {
//     id: {
//         type: DataTypes.BIGINT,
//         primaryKey: true,
//         autoIncrement: true,
//     },
//     name: {
//         type: DataTypes.STRING,
//         allowNull: false,
//     },
//     phone: {
//         type: DataTypes.STRING,
//     },
//     email: {
//         type: DataTypes.STRING,
//     },
//     birth_date: {
//         type: DataTypes.DATE,
//         field: 'birth_date'
//     },
//     avatar: {
//         type: DataTypes.STRING
//     },
//     gender: {
//         type: DataTypes.BOOLEAN
//     },
//     businessId: {
//         type: DataTypes.STRING,
//         field: 'business_id'
//     },
//     verified: {
//         type: DataTypes.BOOLEAN,
//     },
//     addressId: {
//         type: DataTypes.BIGINT,
//         field: 'address_id',
//         references: 'Address',
//         key: 'id'
//     },
//     password: {
//         type: DataTypes.STRING,
//         allowNull: false,
//     }
// }, {
//     tableName: 'user',
//     timestamps: false
// });

// module.exports = User;

const { EntitySchema } = require('typeorm');

const User = new EntitySchema({
    name: 'User',
    tableName: 'user',
    columns: {
        id: {
            type: "bigint",
            primary: true,
        },
        name: {
            type: "varchar",
        },
        phone: {
            type: "varchar",
        },
        email: {
            type: "varchar",
            nullable: false,
        },
        birth_date: {
            type: "date",
            name: "birth_date"
        },
        avatar: {
            type: "varchar"
        },
        gender: {
            type: "boolean"
        },
        businessId: {
            type: "varchar",
            name: "business_id"
        },
        verified: {
            type: "boolean"
        },
        password: {
            type: "varchar",
            nullable: false,
        }
    }, 
    relations: {
        address: {
            target: "Address",
            type: "one-to-one",
            joinColumn: {name: "address_id"},
        }
    }
});

module.exports = User;