const { indexFunc, items } = require('../commands_config/shop');
const { sendUpdatedItem } = require('../helpers/sendUpdatedItem');

const run = (interaction) =>
{
    interaction.message.delete();
    
    indexFunc.decreaseIndex();
    const item = items[indexFunc.getIndex()];

    sendUpdatedItem(interaction, item);
}

module.exports = run;