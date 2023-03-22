const { pluginDBExists, pluginObjExists } = require('../../../helpers');

const openAccount = async(interaction) =>
{
    const plugin = await pluginDBExists(interaction.client);
    const shopData = await pluginObjExists(plugin, 'shop', { users: [] });

    const user = shopData.users.filter(user => user.id === interaction.member.id)[0];

    if(!user)
    {
        shopData.users.push({ id: interaction.member.id, money: 0, items: [] });
    }

    return { plugin, shopData }
}

module.exports = { openAccount }