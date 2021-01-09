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

AccountSchema.pre('save', function (next) {
    const Account = this;

    // Возможно, лучше это подсчитывать на фронте. Он лучше знает, когда и что меняется

    if (Account.operations.length !== 0) {

        this.sum = this.operations.reduce((sum, current) => sum + current, 0);
    } else if (Account.operations.length === 0) {
        this.sum = 0;
    }

    next();
})

const AccountModel = model('Account', AccountSchema);

module.exports = AccountModel;