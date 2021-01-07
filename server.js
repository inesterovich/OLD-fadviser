const express = require('express');
const mongoose = require('mongoose');
const config = require('config');

const server = express();

const PORT = config.get('port') || 5000;

server.use(express.json({ extended: true }));

server.use('/api/auth', require('./routes/auth.routes'));


async function start() {
    try {
        const MONGO_URI = config.get('mongoUri')
        mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })
    
        server.listen(5000, () => console.log(`Server has been started on port ${PORT}`));
        
    } catch (error) {
        console.log(`Error: ${error.message}. Error was catched in ${__filename}`);
        process.exit(1);
    }

}

start();

