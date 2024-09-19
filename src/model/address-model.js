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
            name: "house_number"
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