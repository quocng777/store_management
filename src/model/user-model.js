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