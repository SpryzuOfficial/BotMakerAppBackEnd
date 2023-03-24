const { Client } = require('discord.js');

const { itemsFunc } = require('./commands_config/shop');

const config = async(client = new Client(), { shopItems }) =>
{
    console.log(`Shop plugin configurated for ${client.user.tag}`);

    shopItems = shopItems.map(item => ({ ...item, color: parseInt(item.color) }));

    itemsFunc.setItems(shopItems);
}

module.exports = config;