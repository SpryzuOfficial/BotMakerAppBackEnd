const { sendUpdatedItem } = require('../helpers/sendUpdatedItem');

module.exports = {
    name: 'shop',
    description: 'Sends available shop items',
    callback: async(client, interaction) =>
    {
        sendUpdatedItem(interaction);
    }
}