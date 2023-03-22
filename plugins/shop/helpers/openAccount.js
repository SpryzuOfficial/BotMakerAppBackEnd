const { pluginDBExists, pluginObjExists } = require('../../../helpers');

const openAccount = async(interaction) =>
{
    const plugin = await pluginDBExists(interaction.client);
    const thisPluginData = await pluginObjExists(plugin, 'shop', { users: [] });

    const user = thisPluginData.users.filter(user => user.id === interaction.member.id)[0];

    if(!user)
    {
        thisPluginData.users.push({ id: interaction.member.id, money: 0, items: [] });
    }

    return { plugin, thisPluginData }
}

module.exports = { openAccount }