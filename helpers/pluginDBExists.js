const Bot = require('../models/Bot');
const Plugin = require('../models/Plugin');

const pluginDBExists = async(client) =>
{
    const bot = await Bot.findOne({ botId: client.user.id });
    let plugin = await Plugin.findOne({ bot });

    if(!plugin)
    {
        plugin = new Plugin({ bot });
    }

    return plugin;
}

module.exports = pluginDBExists;