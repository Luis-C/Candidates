const config = require('../config.json');
const jwt = require('jsonwebtoken');
const db = require('../_helpers/database');
const Stalker = db.Stalker;


module.exports = {
    addStalker,
    getAllStalkers
}
async function getAllStalkers() {
    return await Stalker.find();
}
async function addStalker(stalkerParam) {

    // validate
   if (await Stalker.findOne({ email:stalkerParam.email, skillMinimums: stalkerParam.skillMinimums})) {
        throw 'Duplicate stalker,  "' + stalkerParam.email + '" is already taken with identical skill requirements';
    }

    const stalker = new Stalker(stalkerParam);

    // save user
    await stalker.save();
}
