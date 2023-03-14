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

module.exports = { getPlugins };