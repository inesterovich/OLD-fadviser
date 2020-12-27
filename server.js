const express = require('express');
const config = require('config');
const path = require('path');
const mongoose = require('mongoose');

const server = express();

server.use(express.json({ extended: true }));

const PORT = config.get('port') || 5000;

async function start() {
    try {
        const mongoUri = config.get('mongoUri');

        await mongoose.connect(mongoUri, {
            useNewUrlParser: true, 
            useUnifiedTopology: true,
            useCreateIndex: true,
        })

        
        server.listen(PORT, () => console.log(`Server started succesfully on port: ${PORT}`))
        
    } catch (error) {
        console.log(`Server error: ${error.message}. Error catched in ${__filename}`);
        process.exit(1);
    }
}


start();
