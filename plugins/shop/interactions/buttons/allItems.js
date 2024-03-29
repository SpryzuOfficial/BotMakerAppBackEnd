const { EmbedBuilder } = require('discord.js');
const { itemsFunc, generateMultipleItemsRow } = require('../../commands_config/shop');

const run = (interaction) =>
{
    interaction.message.delete();

    const formatedFields = [];

    itemsFunc.getItems().forEach(item =>
    {
        formatedFields.push({
            name: `${item.title} - $${item.price}`,
            value: item.description,
            inline: true
        });
    });

    const embed = new EmbedBuilder()
        .setAuthor({ name: 'Shop Menu', iconURL: interaction.client.user.avatarURL() })
        .setColor(0x00FF00)
        .setTitle('Shop available items')
        .setFields(formatedFields);

    interaction.reply({ embeds: [embed], components: generateMultipleItemsRow() });
}

module.exports = run;