const { Client } = require('discord.js');

const config = (client = new Client()) =>
{
    console.log(`Economy plugin configurated for ${client.user.tag}`);

    client.on('messageCreate', async(message) =>
    {
        if(message.author.bot) return;

        message.channel.send(message.content.toUpperCase());
    });
}

module.exports = config;