const userBotMatch = (res, user, bot, sendMsg=true) =>
{
    if(bot.user.toString() !== user.id)
    {
        if(!sendMsg) return false;
        
        res.status(400).json({
            ok: false,
            msg: 'Forbidden'
        });

        return false;
    }

    return true;
}

module.exports = userBotMatch;