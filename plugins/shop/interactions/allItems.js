const { EmbedBuilder } = require('discord.js');
const { items, row } = require('../commands_config/shop');

const run = (interaction) =>
{
    interaction.message.delete();

    const formatedFields = [];
    items.forEach(item =>
    {
        formatedFields.push({
            name: item.title,
            value: item.description,
            inline: true
        });
    });

    const embed = new EmbedBuilder()
        .setAuthor({ name: 'Shop Menu', iconURL: interaction.client.user.avatarURL() })
        .setColor(0x00FF00)
        .setTitle('Shop available items')
        .setFields(formatedFields);

    interaction.reply({ embeds: [embed], components: [row] });
}

module.exports = run;