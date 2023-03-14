const { Router } = require('express');
const { check } = require('express-validator');

const { addPlugin, removePlugin } = require('../controllers/plugin');

const validateJsonFields = require('../middlewares/validateJsonFields');

const router = Router();

router.post('/add', [
    check('name', 'Name is required').not().isEmpty(),
    check('options', 'Options are required').not().isEmpty(),
    validateJsonFields
], addPlugin);

router.delete('/remove', [
    check('name', 'Plugin name is required').not().isEmpty(),
    validateJsonFields
], removePlugin);

module.exports = router;