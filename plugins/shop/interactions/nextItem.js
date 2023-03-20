const { EmbedBuilder } = require('@discordjs/builders');
const { Client } = require('discord.js');
const { row } = require('../commands_config/shop');

const run = (client = new Client(), data) =>
{
    const msgId = data.split('|')[0];
    const chId = data.split('|')[1];
    const gldId = data.split('|')[2];

    client.guilds.fetch(gldId).then(guild => 
    {
        guild.channels.fetch(chId).then(channel => channel.messages.fetch(msgId).then(message =>
        {
            const embed = new EmbedBuilder()
                .setAuthor({ name: 'Shop Menu', iconURL: client.user.avatarURL() })
                .setColor(0xA020F0)
                .setTitle('Refuge Denied')
                .setDescription('Thrash Metal')
                .setImage('https://i.ibb.co/qrWVSys/Sanc-refdenied.jpg');

            message.edit({ embeds: [embed], components: [row] });
        }));
    });
}

module.exports = run;