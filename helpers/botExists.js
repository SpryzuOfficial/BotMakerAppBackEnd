const Bot = require('../models/Bot');

const botExists = async(req, res) =>
{
    const botId = req.headers['x-bot'];

    if(!botId) 
    {
        res.status(400).json({
            ok: false,
            msg: 'Bot not found'
        });

        return undefined;
    }

    const bot = await Bot.findById(botId);
    if(!bot)
    {
        res.status(400).json({
            ok: true,
            msg: 'Bot not found'
        });
    }

    return bot;
}

module.exports = botExists;