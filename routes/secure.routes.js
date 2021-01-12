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
       
       */


        await user.save();

     return  res.json({account});


    } catch (error) {
        
        res.status(500).json({ message: `${error.message}. Error was catched in ${__filename}, line ${error.lineno}` });
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

    const user = await UserModel.findOne({ _id: userId });
    const accounts = user.accounts;
    
    const currentAccount = accounts.find((account) => String(account._id) === accountId);

    const { date, comment, sum } = req.body;

    const OperationModel = model('Operation', OperationSchema);
    const operation = new OperationModel({ date, comment, sum });

    
    currentAccount.operations.push(operation);

    currentAccount.sum = currentAccount.operations.map((item) => item = item.sum).reduce((sum, current) => sum + current, 0);

    /*
    Добавлять операции умеем. Теперь нужна 
    1. Правильная переадрессация
    2. Изменение операции
    3. Сортировка по дате (именно для этого полная дата нужна)
    4. Обновление суммы
    5. Удаление операции


    Как я это хочу сделать. 

    
    */

    await user.save();

    res.json(currentAccount)
} catch (error) {
    res.status(500).json({ message: `${error.message}. Error was catched in ${__filename}, line ${error.lineno}` });
}
})



module.exports = router;

