const { items } = require('../commands_config/shop');
const { sendUpdatedItem } = require('../helpers/sendUpdatedItem');

module.exports = {
    name: 'shop',
    description: 'Sends available shop items',
    callback: async(client, interaction) =>
    {
        const item = items[0];

        sendUpdatedItem(interaction, item);
    }
}