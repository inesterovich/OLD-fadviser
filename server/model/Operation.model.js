const { Schema, model, Types } = require('mongoose');

const OperationSchema = new Schema({
    date: {
        type: Date,
        required: true,
        default: new Date()
    },

    comment: {
        type: String,
        required: true,
    },

    sum: {
        type: Number,
        required: true,
        default: 0
    },

})



module.exports = OperationSchema;

// Пока в принципе без категории
// Категории делаются точно так же, как и всё остальное: ссылка на коллекцию и внутренние настройки
// Доходная или расходная категория - различаем по параметру income true/false
// Без вложенных категорий. Их тоже не делаем
// Пока я без понятия, как создать дефолтный список категорий