const { SlashCommandBuilder } = require('discord.js');

const slashCommandBuilder = ({ name, description, callback }) =>
{
    return {
        name,
        data: new SlashCommandBuilder().setName(name).setDescription(description),
        async run(client, interaction)
        {
            callback(client, interaction);
        }
    }
}

module.exports = slashCommandBuilder;