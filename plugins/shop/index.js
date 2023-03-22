const { Client } = require('discord.js');
const { v4: uuid } = require('uuid');

const { itemsFunc } = require('./commands_config/shop');

const config = async(client = new Client(), { shopItems }) =>
{
    console.log(`Shop plugin configurated for ${client.user.tag}`);

    const id = uuid(); //TODO: Id should be provided by HTTP Request

    shopItems = shopItems.map(item => ({ ...item, color: parseInt(item.color), id }));

    itemsFunc.setItems(shopItems);
}

module.exports = config;