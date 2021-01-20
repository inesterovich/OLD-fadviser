const { Schema, model, Types } = require('mongoose');

const CategorySchema = new Schema({
    name: {
        type: 'String',
        required: true
    },

  
})



module.exports = CategorySchema;

// А вот список категорий юзеру не надо? По идее надо бы. 

// Хорош пыхтеть. Делаем по частям. 