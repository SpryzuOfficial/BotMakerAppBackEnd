const { Client } = require('discord.js');
const Bot = require('../../models/Bot');
const Plugin = require('../../models/Plugin');

const config = async(client = new Client()) =>
{
    console.log(`Xp Tracker plugin configurated for ${client.user.tag}`);

    const bot = await Bot.findOne({ botId: client.user.id });
    let plugin = await Plugin.findOne({ bot });

    if(!plugin)
    {
        plugin = new Plugin({ bot });
    }
    
    const currentData = plugin.data.filter(d => d.name === 'xpTracker')[0];

    if(!currentData)
    {
        plugin.data.push({
            name: 'xpTracker',
            users: []
        });
    }

    await plugin.save();

    client.on('messageCreate', async(message) =>
    {
        if(message.author.bot) return;

        const user = currentData.users.filter(user => user.id === message.author.id)[0];

        if(!user)
        {
            currentData.users.push({ id: message.author.id, xp: 0 });
        }

        currentData.users.forEach(user =>
        {
            if(user.id === message.author.id)
            {
                user.xp += 1;
            }
        });

        plugin.data = plugin.data.filter(d => d.name !== 'xpTracker');
        plugin.data.push(currentData);

        await plugin.save();
    });
}

module.exports = config;