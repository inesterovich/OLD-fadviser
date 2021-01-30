const fs = require('fs');
const express = require('express');
const config = require('config');
const path = require('path');
const mongoose = require('mongoose');
const logger = require('morgan');

const server = express();
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'log/access.log'), {
    flags: 'a'
})

server.use(logger('combined', {stream: accessLogStream}));


server.use(express.json({ extended: true }));

server.use('/api/auth', require('./routes/auth.routes'));
server.use('/api/secure', require('./routes/secure.routes'));

const PORT = config.get('port') || 5000;

if (process.env.NODE_ENV === 'production') {
    server.use('/', express.static(path.join(__dirname, 'client', 'build')));
    server.get('*', (req, res) => { 
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    });
}


async function start() {

    try {
        await mongoose.connect(config.get('mongoUri'), {

            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        })

        server.listen(PORT, () => console.log(`Server has been started on ${PORT}...`));
        
    } catch (error) {
        console.log(error);
        process.exit(1);
    }


    
}

start();


