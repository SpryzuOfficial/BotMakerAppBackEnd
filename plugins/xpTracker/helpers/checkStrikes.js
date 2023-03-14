const checkStrikes = (user, message, restrictions) =>
{
    user.strikes += 1;

    if(user.strikes > restrictions.strikes.num) 
    {
        user.xp -= restrictions.strikes.xpPunish;

        if(user.xp < 0) user.xp = 0;

        user.strikes = 0;
    }

    user.lastMsg = message;
}

module.exports = { checkStrikes }