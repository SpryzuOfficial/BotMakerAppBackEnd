const { Client } = require('discord.js');

const { pluginDBExists, pluginObjExists } = require('../../helpers');
const { checkStrikes } = require('./helpers/checkStrikes');

const config = async(client = new Client(), { xpMessage, grow, restrictions }) =>
{
    console.log(`Xp Tracker plugin configurated for ${client.user.tag}`);

    const plugin = await pluginDBExists(client);
    
    const thisPluginData = await pluginObjExists(plugin, 'xpTracker', { users: [] });

    client.on('messageCreate', async(message) =>
    {
        if(message.author.bot) return;

        const user = thisPluginData.users.filter(user => user.id === message.author.id)[0];

        if(!user)
        {
            thisPluginData.users.push({ id: message.author.id, xp: 0, lv: 1, next: grow.initial, time: new Date().getTime() - restrictions.time, strikes: 0, lastMsg: '' });
        }

        thisPluginData.users.forEach(u =>
        {
            if(u.id !== message.author.id) return;
            
            const currentTime = new Date().getTime();

            if((currentTime - u.time) < restrictions.time) return checkStrikes(u, message.content, restrictions);
            if(message.content.length < restrictions.minLength) return checkStrikes(u, message.content, restrictions);
            if(restrictions.repeated && (message.content === u.lastMsg)) return checkStrikes(u, message.content, restrictions);
            
            u.xp += xpMessage;
            
            if(u.xp > u.next)
            {
                u.xp = 0;
                u.lv += 1;

                if(grow.type === 'linear') u.next = grow.initial * u.lv;

                if(grow.type === 'cuadratic') u.next = grow.factor * Math.pow(u.lv, 2) - u.lv + grow.initial;
            }


            u.strikes = 0;
            u.time = currentTime;
            u.lastMsg = message.content;
        });

        plugin.data = plugin.data.filter(d => d.name !== 'xpTracker');
        plugin.data.push(thisPluginData);

        await plugin.save();
    });
}

module.exports = config;