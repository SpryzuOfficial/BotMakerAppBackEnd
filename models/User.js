const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
    username: { 
        type: String,
        required: true
    },

    email: { 
        type: String, 
        required: true,
        unique: true 
    },

    password: { 
        type: String,
        required: true,
        bcrypt: true
    }
});

UserSchema.plugin(require('mongoose-bcrypt'));

module.exports = model('User', UserSchema);