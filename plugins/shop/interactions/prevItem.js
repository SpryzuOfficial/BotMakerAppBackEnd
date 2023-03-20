const { indexFunc } = require('../commands_config/shop');
const { sendUpdatedItem } = require('../helpers/sendUpdatedItem');

const run = (interaction) =>
{
    interaction.message.delete();
    
    indexFunc.decreaseIndex();
    sendUpdatedItem(interaction);
}

module.exports = run;