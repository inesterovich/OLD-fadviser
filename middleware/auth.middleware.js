const jwt = require('jsonwebtoken');
const config = require('config');


module.exports = async (req, res, next) => {
    if (req.method === 'OPTIONS') {
        return next();
    }

    try {
        const token = req.headers.authorization.split(' ')[1];

        if (!token) {
            return res.status(401).json({message: 'Нет авторизации'})
        }

        // Где-то здесь валидацию проводить или отдельно функцию генерации токена вынести?

        const decoded = jwt.verify(token, config.get('jwtSecret'));
     

        req.user = decoded;
        next();
        

    } catch (error) {
        res.status(401).json({ message: error.message})
    }


}