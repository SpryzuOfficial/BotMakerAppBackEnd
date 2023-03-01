const { Router } = require('express');
const { check } = require('express-validator');

const { registerBot, 
        createSlashCommand, 
        deleteSlashCommand, 
        addPlugin, 
        getUserBots,
        editBot,
        removePlugin, 
        toggleBotStatus,
        deleteBot} = require('../controllers/bot');
const validateJsonFields = require('../middlewares/validateJsonFields');

const router = Router();

router.post('/register', [
    check('name', 'Name is required').not().isEmpty(),
    check('image', 'Image is required').not().isEmpty(),
    check('botId', 'Bot Id is required').not().isEmpty(),
    check('guildIds', 'Guild Ids are required').not().isEmpty(),
    check('token', 'Bot token is required').not().isEmpty(),
    validateJsonFields
], registerBot);

router.get('/', getUserBots);

router.post('/edit', editBot);

router.delete('/', deleteBot);

router.post('/status', toggleBotStatus);

router.post('/slash/add', [
    check('name', 'Name is required').not().isEmpty(),
    check('description', 'Description is required').not().isEmpty(),
    check('reply', 'Reply embed is required').not().isEmpty(),
    validateJsonFields
], createSlashCommand);

router.delete('/slash/remove', [
    check('uid', 'uid is required').not().isEmpty(),
    validateJsonFields
], deleteSlashCommand);

router.post('/plugins/add', [
    check('name', 'Name is required').not().isEmpty(),
    check('options', 'Options are required').not().isEmpty(),
    validateJsonFields
], addPlugin);

router.delete('/plugins/remove', [
    check('name', 'Plugin name is required').not().isEmpty(),
    validateJsonFields
], removePlugin);

module.exports = router;