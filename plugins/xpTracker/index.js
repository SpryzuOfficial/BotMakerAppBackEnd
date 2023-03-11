const { Client } = require('discord.js');
const Bot = require('../../models/Bot');
const Plugin = require('../../models/Plugin');

const config = async(client = new Client(), { xpMessage, grow, restrictions }) =>
{
    console.log(`Xp Tracker plugin configurated for ${client.user.tag}`);

    const checkStrikes = (user, message) =>
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

    const bot = await Bot.findOne({ botId: client.user.id });
    let plugin = await Plugin.findOne({ bot });

    if(!plugin)
    {
        plugin = new Plugin({ bot });
    }
    
    let currentData = plugin.data.filter(d => d.name === 'xpTracker')[0];

    if(!currentData)
    {
        const initialData = {
            name: 'xpTracker',
            users: []
        };

        currentData = initialData;
        plugin.data.push(initialData);
    }

    await plugin.save();

    client.on('messageCreate', async(message) =>
    {
        if(message.author.bot) return;

        const user = currentData.users.filter(user => user.id === message.author.id)[0];

        if(!user)
        {
            currentData.users.push({ id: message.author.id, xp: 0, lv: 1, next: grow.initial, time: new Date().getTime() - restrictions.time, strikes: 0, lastMsg: '' });
        }

        currentData.users.forEach(u =>
        {
            if(u.id === message.author.id)
            {
                const currentTime = new Date().getTime();

                if((currentTime - u.time) < restrictions.time) return checkStrikes(u, message.content);
                if(message.content.length < restrictions.minLength) return checkStrikes(u, message.content);
                if(restrictions.repeated && (message.content === u.lastMsg)) return checkStrikes(u, message.content);
                
                u.xp += xpMessage;
                
                if(u.xp > u.next) u.lv += 1;

                if(grow.type === 'linear') u.next = grow.initial * u.lv;

                if(grow.type === 'cuadratic') u.next = grow.factor * Math.pow(u.lv, 2) - u.lv + grow.initial;

                u.strikes = 0;
                u.time = currentTime;
                u.lastMsg = message.content;
            }
        });

        console.log(currentData.users)

        plugin.data = plugin.data.filter(d => d.name !== 'xpTracker');
        plugin.data.push(currentData);

        await plugin.save();
    });
}

module.exports = config;