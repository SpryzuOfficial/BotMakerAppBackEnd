const { indexFunc } = require('../../commands_config/shop');
const { sendUpdatedItem } = require('../../helpers/sendUpdatedItem');

const run = (interaction, values) =>
{
    interaction.message.delete();

    const index = parseInt(values[0].split('_')[2]);

    indexFunc.setIndex(index);

    sendUpdatedItem(interaction);
}

module.exports = run;