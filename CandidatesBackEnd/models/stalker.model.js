const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const schema = new Schema({
        email: { type: String, unique: true, required: true },
        skillsMinimums: [{name: String, experience: Number}],
    }
);

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Stalker', schema);
