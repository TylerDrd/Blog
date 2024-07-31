const mongoose = require('mongoose');
const {Schema, model} =  mongoose;

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        minlength: 4,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address.']
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    }
});

const UserModel = model('User', UserSchema);

module.exports = UserModel;