const { SlashCommandBuilder } = require('discord.js');

const slashCommandBuilder = ({ name, description, reply }) =>
{
    return {
        name,
        data: new SlashCommandBuilder().setName(name).setDescription(description),
        async run(client, interaction)
        {
            interaction.reply({ embeds: [reply] });
        }
    }
}

module.exports = slashCommandBuilder;