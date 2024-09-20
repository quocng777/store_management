const { EntitySchema } = require('typeorm');

const VerificationCode = new EntitySchema({
    name: 'VerificationCode',
    tableName: 'verification_code',
    columns: {
        id: {
            type: "bigint",
            primary: true,
            generated: true,
        },
        token: {
            type: "varchar"
        },
        expire: {
            type: "timestamp"
        }
    }, 
    relations: {
        user: {
            target: "User",
            type: "one-to-one",
            joinColumn: {name: "user_id"},
        }
    }
});

module.exports = VerificationCode;