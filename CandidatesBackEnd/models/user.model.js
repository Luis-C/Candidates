const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
        username: { type: String, unique: true, required: true },
        email: { type: String, required: true },
        hash: { type: String, required: true },
        skills: [{
                name: {type: String, required: true},
                experience: Number,
                description: String
        }],
        jobSeeking: Boolean
    }
);

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('User', schema);
