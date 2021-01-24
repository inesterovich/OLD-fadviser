const { Schema, model, Types } = require('mongoose');
const AccountSchema = require('./Account.model');
const CategorySchema = require('./Category.model');

const CategoryModel = model('Category', CategorySchema);

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

    categories: {
        type: Object,
        income: [
            CategorySchema
        ],
        expenses: [
            CategorySchema
        ]
    }
})


UserSchema.methods.setDefaultCategories = function () {
    // this === user

   

    const incomeCategories = ['Зарплата', 'Подработки', 'Подарки', 'Инвестиции'];
    const expensesCategories = ['Фонд богатства', 'Текущие расходы', 'Долгосрочные накопления', 'Здоровье', 'Образование', 'Развлечения', 'Благотворительность'];


    this.categories.income = incomeCategories.map((name) => new CategoryModel({ name }));
    this.categories.expenses = expensesCategories.map((name) => new CategoryModel({ name }));
}

const UserModel = model('User', UserSchema);




module.exports = UserModel;