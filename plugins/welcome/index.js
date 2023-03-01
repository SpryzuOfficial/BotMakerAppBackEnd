const { Client } = require('discord.js');

const config = (client = new Client(), { channel, message }) =>
{
    console.log(`Welcome plugin configurated for ${client.user.tag}`);

    client.on('guildMemberAdd', async(member) =>
    {
        const replacedMessage = message.content.replace('@', `<@${member.id}>`);
        const embed = JSON.parse(JSON.stringify(message.embed));
        const dmEmbed = message.dm.embed;

        embed.color = parseInt(embed.color);
        embed.description = embed.description?.replace('@', `<@${member.id}>`);
        embed.fields?.forEach(field =>
        {
            field.value = field.value.replace('@', `<@${member.id}>`);
        });
            
        dmEmbed.color = parseInt(dmEmbed.color);

        member.user.send({ embeds: [dmEmbed], content: message.dm.content});

        const channels = await member.guild.channels.fetch();
        channels.forEach((channelObj) =>
        {
            if(channelObj.id !== channel && channelObj.name !== channel) return;

            channelObj.send({ embeds: [embed], content: replacedMessage });
        });
    });
}

module.exports = config;