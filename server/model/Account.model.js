const { Schema, model, Types } = require('mongoose');
const OperationSchema = require('./Operation.model');


// Сюда не помешает дату создания
const AccountSchema = new Schema({

    name: {
        type: String,
        default: 'Мой счет',
        required: true
    },

    operations: [ OperationSchema ],

    sum: {
        type: Number,
        default: 0, 
    },

 
})

AccountSchema.methods.sortOperations = function () {
    // Сортирую поле this.operations по основанию date

    try {

        const croppedArray = this.operations.slice(1).sort((a, b) => a.date > b.date ? 1 : -1)
    
        this.operations = [this.operations[0], ...croppedArray];
      
    } catch (error) {
        error.message = `Error was catched in sorting method hook, Message: ${error.message}`;
        throw error;
    }

   


}

AccountSchema.methods.updateSum = function () {
    // Через map и reduce делаю всё это
   
}


AccountSchema.pre('save', function (next) {
    // Доступ к тому самому счёту я легко получаю
    /*
    2. Обновление суммы счета
    
    */
    
    try {
        this.sortOperations();
        next();
    } catch (error) {
        error.message = `Error was catched in sorting method hook, Message: ${error.message}`;
        throw error;
    }
    
    
})






module.exports = AccountSchema;