const fs = require('fs');

const slashCommandBuilder = require('../discord/slashCommandBuilder');

const getPlugins = () =>
{
    const directories = fs.readdirSync('./plugins', { withFileTypes: true }).filter(dir => dir.isDirectory()).map(dir => dir.name);

    const plugins = [];
    
    directories.forEach(dir =>
    {
        const pluginCommands = [];
        const commandsExists = fs.existsSync(`./plugins/${dir}/commands`);
    
        if(commandsExists)
        {
            const commands = fs.readdirSync(`./plugins/${dir}/commands`);
        
            commands.forEach(command =>
            {
                const cmdData = require(`../plugins/${dir}/commands/${command}`);
                pluginCommands.push(slashCommandBuilder(cmdData));
            });
        }
    
        plugins.push({ name: dir, commands: pluginCommands });
    });

    return plugins;
}

const runInteraction = (interaction) =>
{
    const plugin = interaction.customId.split('_')[0];
    const type = interaction.customId.split('_')[1];
    const interactionName = interaction.customId.split('_')[2];

    if(!fs.existsSync(`./plugins/${plugin}/interactions/${type}`)) return;

    const int = require(`../plugins/${plugin}/interactions/${type}/${interactionName}`);
    int(interaction, interaction.values);
}

module.exports = { getPlugins, runInteraction };