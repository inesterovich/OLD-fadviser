const { Router } = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const User = require('../model/User.model');
const config = require('config');

const router = Router();

// /api/auth/register

router.post(
    '/register',
    [check('email', 'Некорректный email').isEmail(),
     check('password', 'Пароль слишком слабый').isStrongPassword()
    ],
    async (req, res) => {

        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {

                return res.status(400).json({ 
                    errors: errors.array(),
                    message: 'Incorrect data for registation'

                });
            }

        const { email, password } = req.body;

        const candidate = await User.findOne({ email });

        if (candidate) {
            return res.status(400).json({
                message: 'This user already exists'
            })
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        
        const user = new User({ email, password: hashedPassword });

        await user.save();

        res.status(201).json({ message: 'Registation completed successfully' });
    } catch (error) {
        res.status(500).json({ message: `Error: ${error.message} was catched in ${__filename}` });
    }
})

// /api/auth/login
router.post(
    '/login',
    [check('email', 'Incorrect email').isEmail(),
     check('password', 'You forget to enter a password').exists()],
    async (req, res) => {
        try {
            
            const errors = validationResult(req);

            if (!errors.isEmpty()) {

                return res.status(400).json({ 
                    errors: errors.array(),
                    message: 'Incorrect data for login'

                });
            }

            const { email, password } = req.body;

            const user = await User.findOne({ email });

            if (!user) {
                return res.status(400).json({ message: 'User not found' });
            }

            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                return res.status(400).json({ message: 'Password is incorrect' });
            }

            const token = jwt.sign(
                { userId: user.id },
                config.get('jwtSecret'), {
                expiresIn: '2 days'
            }
            );

            res.json({ token, userId: user.id });
        
        } catch (error) {
            res.status(500).json({ message: `Error: ${error.message} was catched in ${__filename}` });
        }


})

module.exports = router;