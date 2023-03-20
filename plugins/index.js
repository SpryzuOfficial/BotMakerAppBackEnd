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

const runButton = (interaction) =>
{
    const plugin = interaction.customId.split('_')[0];
    const interactionName = interaction.customId.split('_')[2];

    const interactionsExists = fs.existsSync(`./plugins/${plugin}/interactions`);

    if(interactionsExists)
    {
        const int = require(`../plugins/${plugin}/interactions/${interactionName}`);
        int(interaction);
    }
}

module.exports = { getPlugins, runButton };