const { cleanClient, loginClient } = require('../discord/clients');

const updateDiscordClient = async(bot) =>
{
    const { status, botId } = bot;

    if(status === 'Offline') return false;

    cleanClient(botId);
    return await loginClient(bot, true);
}

module.exports = updateDiscordClient;