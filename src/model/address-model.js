const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Address = sequelize.define('address', {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
    },
    houseNumber: {
        type: DataTypes.INTEGER,
    },
    ward: {
        type: DataTypes.STRING
    },
    district: {
        type: DataTypes.STRING
    },
    city: {
        type: DataTypes.STRING
    }
}, {
    tableName: 'address',
    timestamps: false,
});

module.exports = Address;