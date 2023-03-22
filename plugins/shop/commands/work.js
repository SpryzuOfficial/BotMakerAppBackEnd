const { openAccount } = require('../helpers/openAccount');

module.exports = {
    name: 'work',
    description: 'Start working',
    callback: async(client, interaction) =>
    {
        const { plugin, thisPluginData } = await openAccount(interaction);

        thisPluginData.users.forEach(u =>
        {
            if(u.id !== interaction.member.id) return;

            u.money += 1000;
            interaction.reply(`$1000 were added to your account. Balance: $${u.money}`);
        });

        plugin.data = plugin.data.filter(d => d.name !== 'shop');
        plugin.data.push(thisPluginData);

        await plugin.save();
    }
}