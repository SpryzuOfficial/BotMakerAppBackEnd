const { userExists, botExists, userBotMatch, updateDiscordClient } = require('../helpers');

const addPlugin = async(req = request, res = response) =>
{
    try
    {
        const user = await userExists(req, res);
        if(!user) return;

        const bot = await botExists(req, res);
        if(!bot) return;

        if(!userBotMatch(res, user, bot)) return;

        const { name, options } = req.body;

        const plugins = bot.plugins.filter(plugin => plugin.name !== name);
        plugins.push({ name, options });

        bot.plugins = plugins;

        await bot.save();
        
        await updateDiscordClient(bot);

        res.status(200).json({
            ok: true,
            bot
        });
    } 
    catch (error) 
    {
        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Internal Server Error'
        });
    }
}

const removePlugin = async(req = request, res = response) =>
{
    try 
    {
        const user = await userExists(req, res);
        if(!user) return;

        const bot = await botExists(req, res);
        if(!bot) return;

        if(!userBotMatch(res, user, bot)) return;

        const { name } = req.body;

        bot.plugins = bot.plugins.filter(plugin => plugin.name !== name);

        await updateDiscordClient(bot);

        await bot.save();

        res.status(200).json({
            ok: true,
            bot
        });
    } 
    catch (error) 
    {
        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Internal Server Error'
        });
    }
}

module.exports = {
    addPlugin,
    removePlugin
}