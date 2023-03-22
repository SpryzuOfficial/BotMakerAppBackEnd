const { EmbedBuilder } = require('discord.js');
const { singleItemRow, itemsFunc, indexFunc } = require('../commands_config/shop');

const sendUpdatedItem = (interaction) =>
{
    const index = indexFunc.getIndex();
    const items = itemsFunc.getItems();
    
    const item = items[index];
    
    const embed = new EmbedBuilder()
        .setAuthor({ name: 'Shop Menu', iconURL: interaction.client.user.avatarURL() })
        .setColor(item.color)
        .setTitle(item.title)
        .setDescription(item.description)
        .setImage(item.img)
        .setFooter({ text: `Item ${index + 1}/${items.length}` });

    interaction.reply({ embeds: [embed], components: [singleItemRow] });
}

module.exports = { sendUpdatedItem }