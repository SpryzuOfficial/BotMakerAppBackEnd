const { Router } = require('express');

const { check } = require('express-validator');

const { createUser, userLogin } = require('../controllers/auth');
const validateJsonFields = require('../middlewares/validateJsonFields');

const router = Router();

router.post('/', [check('username', 'Username is required').not().isEmpty(), 
    check('email', 'Email is required').not().isEmpty(),
    check('email', 'Invalid email').isEmail(),
    check('password', 'Password must have 8 characters').isLength({ min: 8 }),
    validateJsonFields
], createUser);

router.get('/', [check('email', 'Email is required').not().isEmpty(),
    check('email', 'Invalid email').isEmail(),
    check('password', 'Password is required').not().isEmpty(),
    validateJsonFields
], userLogin);

module.exports = router;