const { openAccount } = require('../helpers/openAccount');
const { savePluginData } = require('../../../helpers');

module.exports = {
    name: 'work',
    description: 'Start working',
    callback: async(client, interaction) =>
    {
        const { plugin, shopData } = await openAccount(interaction);

        shopData.users.forEach(u =>
        {
            if(u.id !== interaction.member.id) return;

            u.money += 1000;
            interaction.reply({ content: `$1000 were added to your account. Balance: $${u.money}`, ephemeral: true });
        });

        savePluginData(plugin, shopData, 'shop');
    }
}