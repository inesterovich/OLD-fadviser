const { Schema, model, Types } = require('mongoose');

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },

    password: {
        type: String,
       required: true, 
    },
    accounts: [{
        type: Types.ObjectId,
        ref: 'Account'
    }]
})

const UserModel = model('User', UserSchema);

module.exports = UserModel;