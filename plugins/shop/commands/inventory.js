const { EmbedBuilder } = require('discord.js');
const { itemsFunc, generateMultipleItemsRow } = require('../commands_config/shop');
const { openAccount } = require('../helpers/openAccount');

module.exports = {
    name: 'inventory',
    description: 'Sends the inventory of the user',
    callback: async(client, interaction) =>
    {
        const { plugin, shopData } = await openAccount(interaction);

        const formatedFields = [];

        shopData.users.forEach(u =>
        {
            if(u.id !== interaction.member.id) return;

            const items = itemsFunc.getItems();

            items.forEach(item =>
            {
                if(!u.items.includes(item.id)) return;

                formatedFields.push({
                    name: item.title,
                    value: `${item.description}\n[Image](${item.img})`,
                    inline: true
                });
            });
        });

        const embed = new EmbedBuilder()
            .setAuthor({ name: interaction.user.tag, iconURL: interaction.user.avatarURL() })
            .setColor(0xFFF8E7)
            .setTitle('Inventory')
            .setFields(formatedFields);

        interaction.reply({ embeds: [embed], ephemeral: true });
    }
}