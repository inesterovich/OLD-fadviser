const { Router } = require('express');
const auth = require('../middleware/auth.middleware');
const AccountSchema = require('../model/Account.model');
const UserModel = require('../model/User.model');
const OperationSchema = require('../model/Operation.model');
const { model } = require('mongoose');

const OperationModel = model('Operation', OperationSchema);
const AccountModel = model('Account', AccountSchema);


const router = Router();


// /api/secure/accounts

router.post('/createaccount', auth, async (req, res) => {
    // Создаём новый счет

    try {
        
        const { name, sum } = req.body;

        const userId = req.user.userId;
          
        const user = await UserModel.findOne({ _id: userId });
        const accounts = user.accounts;
        
        const existing = accounts.find((account) => account.name === name);

        if (existing) {
            return res.status(401).json({ message: 'У вас уже есть счет с таким названием' });
        }


        const account = new AccountModel({ name });

        const date = new Date();
        const category = `Создание счета: ${name}`;
        const operation = new OperationModel({ date, category, sum });
        
        account.operations.push(operation);

        account.updateSum();
        accounts.push(account);



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
        const categories = user.categories;

        res.json({accounts, categories}); 
    } catch (error) {
        res.status(500).json({ message: `${error.message}. Error was catched in ${__filename}, route accounts` });
    }
})


router.post('/accounts/:id', auth, async (req, res) => {

    try {

        const accountId = req.params.id;
        const userId = req.user.userId;

        const {date, category, sum, type, operationId } = req.body;
        
        const user = await UserModel.findOne({ _id: userId });
        const accounts = user.accounts;
        const currentAccount = accounts.find((account) => String(account._id) === accountId);
        


        
        switch (type) {
            case 'add operation':

              
                
                const operation = new OperationModel({ date, category, sum });
            
                
                currentAccount.operations.push(operation);
            
                currentAccount.sum = currentAccount.operations.map((item) => item = item.sum).reduce((sum, current) => sum + current, 0);
                
                
                currentAccount.sortOperations();
                currentAccount.updateSum();
                currentAccount.updateDate();
            
                await user.save();
            
                res.json(currentAccount);
                    
                break;
            
            case 'edit operation':

                const updateIndex = currentAccount.operations.findIndex((operation) => String(operation._id) === operationId);
            
                const newOperation = new OperationModel({ date, category, sum, _id: operationId });

                currentAccount.operations[updateIndex] = newOperation;

                currentAccount.sortOperations();
                currentAccount.updateSum();
                currentAccount.updateDate(newOperation);

                await user.save()

                
                res.json(currentAccount);
          
                break;
            
            case 'delete operation':


                const deleteIndex = currentAccount.operations.findIndex((operation) => String(operation._id) === operationId);
                
                currentAccount.operations.splice(deleteIndex, 1);
                currentAccount.updateSum();

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
        
        if (error.message === 'Операция запрещена: дата создания счёта не может быть больше следующей операции.') {
            res.status(400).json({ message : error.message})
        } else {
            res.status(500).json({ message: error.message || `Something went wrong, try again`});
        }
        
}
})




module.exports = router;

