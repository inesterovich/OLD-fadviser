const { Schema } = require('mongoose');
const OperationSchema = require('./Operation.model');



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


    try {
        
        if (this.operations.length > 1) {

            const croppedArray = this.operations.slice(1).sort((a, b) => a.date > b.date ? 1 : -1)
    
            this.operations = [this.operations[0], ...croppedArray];
    
        }
       
      
    } catch (error) {
        error.message = `Error was catched in sorting method hook, Message: ${error.message}`;
        throw error;
    }

   


}

AccountSchema.methods.updateDate = function (editedOperaation) {

   
    if (this.operations.length > 1) {


        if (this.operations[0].date >= this.operations[1].date) {

            this.operations[0].date = new Date(this.operations[1].date - 1)
            
            
                if (String(editedOperaation._id) === String(this.operations[0]._id)) {
    
                    throw new Error('Операция запрещена: дата создания счёта не может быть больше следующей операции.')
                } 
    
                
            }
        
    }
    
}

AccountSchema.methods.updateSum = function () {
  
   this.sum = this.operations.map((item) => item = item.sum).reduce((sum, current) => sum + current, 0);
}



module.exports = AccountSchema;