const dataSource = require("../config/db");
const Role = require("../model/role");
const Relationship = require("../model/relationship-model");
const Store = require("../model/store-model");
const Address = require("../model/address-model");

const storeRepo = dataSource.getRepository(Store);
const relRepo = dataSource.getRepository(Relationship);
const addressRepo = dataSource.getRepository(Address);

const createStore = async (user, store) => {
    const address = await addressRepo.save(store.address);

    store.address = { id: address.id };

    const savedStore = await storeRepo.save(store);

    const relation = {
        store: savedStore.id,
        user: {id: user.id}, 
        role: Role.OWNER,
        startDate: new Date()
    };

    console.log(relation);

    const relEntity = relRepo.create(relation);
    await relRepo.save(relEntity);
    return savedStore;
}

module.exports = {
    createStore,
}