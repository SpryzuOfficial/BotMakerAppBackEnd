const { EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder } = require('discord.js');
const { items, row } = require('../commands_config/shop');

const run = (interaction) =>
{
    interaction.message.delete();

    const formatedFields = [];
    const formatedOptions = [];

    items.forEach((item, index) =>
    {
        formatedFields.push({
            name: item.title,
            value: item.description,
            inline: true
        });

        formatedOptions.push({
            label: item.title,
            description: item.description,
            value: `shop_item_${index}`
        });
    });

    const embed = new EmbedBuilder()
        .setAuthor({ name: 'Shop Menu', iconURL: interaction.client.user.avatarURL() })
        .setColor(0x00FF00)
        .setTitle('Shop available items')
        .setFields(formatedFields);

    const menuRow = new ActionRowBuilder()
        .addComponents([
            new StringSelectMenuBuilder()
                .setCustomId('shop_menu_selectItem')
                .setPlaceholder('Select Item')
                .setOptions(formatedOptions)
        ]);

    row.components = row.components.filter(comp => comp.data.custom_id.split('_')[2] !== 'allItems');

    interaction.reply({ embeds: [embed], components: [row, menuRow] });
}

module.exports = run;