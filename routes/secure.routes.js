const { Router } = require('express');
const auth = require('../middleware/auth.middleware');
const AccountSchema = require('../model/Account.model');
const UserModel = require('../model/User.model');
const OperationSchema = require('../model/Operation.model');
const {  model } = require('mongoose');


const router = Router();

/* Какие ссылки мне 100% нужны?
    Мне нужна ссылка генерации счета,
    Ссылка выдающая список счетов

*/


// /api/secure/accounts

router.post('/createaccount', auth, async (req, res) => {
    // Создаём новый счет

    try {
        
        const { name, sum } = req.body;

        const userId = req.user.userId;
            /* 
            Ещё раз переписываем. 

            Находим юзера.
            
            */
        const user = await UserModel.findOne({ _id: userId });
        const accounts = user.accounts;
        
        const existing = accounts.find((account) => account.name === name);

        if (existing) {
            return res.status(401).json({ message: 'У вас уже есть счет с таким названием' });
        }

        const AccountModel = model('Account', AccountSchema);

        const account = new AccountModel({ name });

        // Вот здесь создаём операцию. 


        const date = new Date();
        const comment = `Создание счета: ${name}`;
        const OperationModel = model('Operation', OperationSchema);
        const operation = new OperationModel({ date, comment, sum });
        
        account.operations.push(operation);

        account.sum = account.operations.map((item) => item = item.sum).reduce((sum, current) => sum + current, 0);
        accounts.push(account);

       /*  Пре-хук операции мне не поможет. А пре-хук аккаунта? 
       Вот есть у меня массив операций. Добавил первую операцию

       При каждом добавлении, изменении, удалении операции надо сортировать список заново
       
       */


        await user.save();

     return  res.json({account});


    } catch (error) {
        
        res.status(500).json({ message: `${error.message}. Error was catched in ${__filename}, rote createaccount` });
    }


    //  
})


router.get('/accounts', auth, async (req, res) => {

    // Этот метод выдает весь список счетов

    try {
        
        const user = await UserModel.findOne({ _id: req.user.userId });
        
        const accounts = user.accounts;

        res.json(accounts); 
    } catch (error) {
        res.status(500).json({ message: `${error.message}. Error was catched in ${__filename}, route accounts` });
    }
})


router.post('/accounts/:id', auth, async (req, res) => {

    try {

        const accountId = req.params.id;
        const userId = req.user.userId;

        const {date, comment, sum, type, operationId } = req.body;
        
        const user = await UserModel.findOne({ _id: userId });
        const accounts = user.accounts;
        const currentAccount = accounts.find((account) => String(account._id) === accountId);
        const OperationModel = model('Operation', OperationSchema);


        
        switch (type) {
            case 'add operation':

              
                
                const operation = new OperationModel({ date, comment, sum });
            
                
                currentAccount.operations.push(operation);
            
                currentAccount.sum = currentAccount.operations.map((item) => item = item.sum).reduce((sum, current) => sum + current, 0);
            
                await user.save();
            
                res.json(currentAccount);
                    
                break;
            
            case 'edit operation':

                const updateIndex = currentAccount.operations.findIndex((operation) => String(operation._id) === operationId);

                const newOperation = new OperationModel({ date, comment, sum });

                currentAccount.operations[updateIndex] = newOperation;

                await user.save()

               // Мне же надо как-то заполнять предыдущими значениями! То есть все данные надо передавать 

                
                res.json(currentAccount);
          
                break;
            
            case 'delete operation':


                const deleteIndex = currentAccount.operations.findIndex((operation) => String(operation._id) === operationId);

                
                currentAccount.operations.splice(deleteIndex, 1);

                await user.save();
                
                
                res.json(currentAccount);
                
                break;
              
            
            case 'delete account':

                
                const deleteAccountIndex = accounts.findIndex((account) => String(account._id) === accountId);
                    
                accounts.splice(deleteAccountIndex, 1);

                await user.save();
                res.json(accounts);
                break;
                    

             
            
            default:

                res.json('You forget to send a type')
        }
   


} catch (error) {
    res.status(500).json({ message: `${error.message}. Error was catched in ${__filename}, route createoperation` });
}
})




module.exports = router;

