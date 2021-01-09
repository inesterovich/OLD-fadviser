const { Schema, model, Types } = require('mongoose');


// Сюда не помешает дату создания
const AccountSchema = new Schema({

    name: {
        type: String,
        default: 'Мой счет',
        required: true
    },

    operations: [{
        type: Types.ObjectId,
        ref: 'Operation',
    }],

    sum: {
        type: Number,
        default: 0, 
    },

    owner: {
        type: Types.ObjectId,
        ref: 'User'
    }
})


const AccountModel = model('Account', AccountSchema);

module.exports = AccountModel;