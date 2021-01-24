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
        // Условие на длину операции > 1 
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

    // Вот где косяк. Надо предусмотреть крайний случай, что дату первой операции менять вообще можно. 
    if (this.operations.length > 1) {


        if (this.operations[0].date >= this.operations[1].date) {

            this.operations[0].date = new Date(this.operations[1].date - 1)
            
            
                if (String(editedOperaation._id) === String(this.operations[0]._id)) {
    
                    throw new Error('Операция запрещена: дата создания счёта не может быть больше следующей операции.')
                } 
    
                
            }
        
    }
    

  
        
  
    
   

    /*  
    При такой логике оно само собой не ломается, но лучше бы предупредить юзера, что "это нельзя делать". Мне, по сути, нужно передавать редактируемую операцию

    Если дата новой операции больше даты следующей операции и это начальная операция - выдать ответ: Операция запрещена
    */
}

AccountSchema.methods.updateSum = function () {
    // Через map и reduce делаю всё это
   this.sum = this.operations.map((item) => item = item.sum).reduce((sum, current) => sum + current, 0);
}



module.exports = AccountSchema;