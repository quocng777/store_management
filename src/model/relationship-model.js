const { EntitySchema } = require('typeorm');

const Relationship = new EntitySchema({
    name: 'Relationship',
    tableName: 'relationship',
    columns: {
        id: {
            type: "bigint",
            primary: true,
            generated: true,
        },
        role: {
            type: "enum",
            enum: ["owner", "employee"],
            default: "employee"
        },
        startDate: {
            type: "timestamp",
            name: "start_date",
        },
        endDate: {
            type: "timestamp",
            name: "end_date",
        }
    }, 
    relations: {
        user: {
            target: "User",
            type: "many-to-one",
            joinColumn: {name: "user_id"},
        },
        store: {
            target: "Store",
            type: "many-to-one",
            joinColumn: {name: "store_id"}
        },
    }
});

module.exports = Relationship;