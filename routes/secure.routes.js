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

        if (!sum) {
            sum = 0;
        }

        const date = new Date();
        const comment = `Создание счета: ${name}`;
        const OperationModel = model('Operation', OperationSchema);
        const operation = new OperationModel({ date, comment, sum });
        
        account.operations.push(operation);

        account.sum = account.operations.map((item) => item = item.sum).reduce((sum, current) => sum + current, 0);
        accounts.push(account);

        console.log(account);


        await user.save();

     return  res.json({account});

        /*
    
        const existing = await AccountModel.findOne({ name, owner: userId });
    
        if (existing) {
            return res.status(401).json({ message: 'У вас уже есть счет с таким названием' });
        }

        const account = new AccountModel({ name, owner: userId });

       
        
        if (sum) {

            const date = new Date();
            const comment = 'Создание счёта';

            const operation = { date, comment, sum, account: account._id };

            account.operations.push(operation);

            const accountSum = account.operations.map((item) => item = item.sum).reduce((sum, current) => sum + current, 0);

            account.sum = accountSum;
            
        
            
            
        }

        await account.save();

        res.json({ account });

            */

    } catch (error) {
        
        res.status(500).json({ message: `${error.message}. Error was catched in ${__filename}, route create` });
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

router.get('/:id', auth,  (req, res) => {
// Детальная информация о счёте
})




module.exports = router;

