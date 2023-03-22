const botExists = require('./botExists');
const userExists = require('./userExists');
const userBotMatch = require('./userBotMatch');
const updateDiscordClient = require('./updateDiscordClient');
const pluginDBExists = require('./pluginDBExists');
const pluginObjExists = require('./pluginObjExists');
const savePluginData = require('./savePluginData');

module.exports = {
    botExists,
    userExists,
    userBotMatch,
    updateDiscordClient,
    pluginDBExists,
    pluginObjExists,
    savePluginData,
}