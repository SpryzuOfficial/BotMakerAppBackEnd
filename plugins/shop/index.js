const { Client } = require('discord.js');

const config = (client = new Client(), options) =>
{
    console.log(`Shop plugin configurated for ${client.user.tag}`);
}

module.exports = config;