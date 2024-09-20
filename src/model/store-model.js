const { EntitySchema } = require('typeorm');

const Store = new EntitySchema({
    name: 'Store',
    tableName: 'store',
    columns: {
        id: {
            type: "bigint",
            primary: true,
            generated: true,
        },
        name:{
            type: "varchar",
        },
        logo: {
            type: "varchar",
        },
        phone: {
            type: "varchar",
        },
        email: {
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

module.exports = Store;