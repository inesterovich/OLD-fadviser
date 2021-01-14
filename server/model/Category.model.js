const { Schema, model, Types } = require('mongoose');

const CategorySchema = new Schema({
    name: {
        type: 'String',
        required: true
    },

    categoryType: {
        type: Boolean,
        required: true
    },

    owner: {
        type: Types.ObjectId,
        ref: 'User'
    }
})


const CategoryModel = model('Category', CategorySchema);

module.exports = CategoryModel;

// А вот список категорий юзеру не надо? По идее надо бы. 

// Хорош пыхтеть. Делаем по частям. 