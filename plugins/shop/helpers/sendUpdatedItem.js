const { EmbedBuilder } = require('discord.js');
const { row } = require('../commands_config/shop');

const sendUpdatedItem = (interaction, item) =>
{
    const embed = new EmbedBuilder()
        .setAuthor({ name: 'Shop Menu', iconURL: interaction.client.user.avatarURL() })
        .setColor(item.color)
        .setTitle(item.title)
        .setDescription(item.description)
        .setImage(item.img);

    interaction.reply({ embeds: [embed], components: [row] });
}

module.exports = { sendUpdatedItem }