const { EmbedBuilder } = require('discord.js');

const { indexFunc, itemsFunc } = require('../../commands_config/shop');
const { openAccount } = require('../../helpers/openAccount');
const { savePluginData } = require('../../../../helpers');

const run = async(interaction) =>
{
    interaction.message.delete();

    const { plugin, shopData } = await openAccount(interaction);

    const index = indexFunc.getIndex();
    const items = itemsFunc.getItems();
    
    const item = items[index];

    shopData.users.forEach(u =>
    {
        if(u.id !== interaction.member.id) return;
        if(u.money < item.price) return;

        u.items.push(item.id);
        u.money -= item.price;

        const embed = new EmbedBuilder()
            .setAuthor({ name: 'Item added to inventory', iconURL: interaction.client.user.avatarURL() })
            .setColor(item.color)
            .setTitle(item.title)
            .setDescription(item.description)
            .setImage(item.img)
            .setFooter({ text: `Item ${index + 1}/${items.length}` });
        
        interaction.reply({ embeds: [embed] });
    });

    savePluginData(plugin, shopData, 'shop');
}

module.exports = run;