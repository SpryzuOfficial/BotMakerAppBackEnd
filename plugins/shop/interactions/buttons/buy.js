const { EmbedBuilder } = require('discord.js');

const { indexFunc, itemsFunc } = require('../../commands_config/shop');
const { openAccount } = require('../../helpers/openAccount');

const run = async(interaction) =>
{
    interaction.message.delete();

    const { plugin, thisPluginData } = await openAccount(interaction);

    const index = indexFunc.getIndex();
    const items = itemsFunc.getItems();
    
    const item = items[index];

    thisPluginData.users.forEach(u =>
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

    plugin.data = plugin.data.filter(d => d.name !== 'shop');
    plugin.data.push(thisPluginData);

    await plugin.save();
}

module.exports = run;