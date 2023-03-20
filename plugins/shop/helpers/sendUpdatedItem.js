const { EmbedBuilder } = require('discord.js');
const { row, items, indexFunc } = require('../commands_config/shop');

const sendUpdatedItem = (interaction) =>
{
    const index = indexFunc.getIndex();
    const item = items[index];
    
    const embed = new EmbedBuilder()
        .setAuthor({ name: 'Shop Menu', iconURL: interaction.client.user.avatarURL() })
        .setColor(item.color)
        .setTitle(item.title)
        .setDescription(item.description)
        .setImage(item.img)
        .setFooter({ text: `Item ${index + 1}/${items.length}` });

    interaction.reply({ embeds: [embed], components: [row] });
}

module.exports = { sendUpdatedItem }