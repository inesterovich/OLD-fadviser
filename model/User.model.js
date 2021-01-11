const { Schema, model, Types } = require('mongoose');
const AccountSchema = require('./Account.model');

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
    
    accounts: [
        AccountSchema
    ],

    categories: [{
        type: Types.ObjectId,
        ref: 'Category'
    }]
})

const UserModel = model('User', UserSchema);

module.exports = UserModel;