const { Client, GatewayIntentBits, REST, Routes, Collection, } = require('discord.js');
const Bot = require('../models/Bot');
const { getPlugins, runInteraction } = require('../plugins');
const slashCommandBuilder = require('./slashCommandBuilder');

const clients = [];

const readCommands = (slashCommands) =>
{
    const commands = [];
    slashCommands.forEach(command =>
    {
        commands.push(slashCommandBuilder({ ...command, callback: (client, interaction) => 
        {
            interaction.reply({ embeds: [command.reply] });
        }}));
    });

    return commands;
}

const parseCommandsJSON = (commands) =>
{
    const parsedCommands = [];
    commands.forEach(command =>
    {
        parsedCommands.push(command.data.toJSON());
    });

    return parsedCommands;
}

const loginClient = async({ name: botUsername, image, activity, token, botId, guildIds, plugins, slashCommands }, imageLoad=false) =>
{
    const commands = readCommands(slashCommands);

    const pluginsList = getPlugins();
    pluginsList.forEach(plugin =>
    {
        plugins.forEach(dbPlugin =>
        {
            if(plugin.name === dbPlugin.name)
            {
                plugin.commands.forEach(cmd =>
                {
                    commands.push(cmd);
                });
            } 
        });
    });

    const parsedCommands = parseCommandsJSON(commands);

    try 
    {
        const rest = new REST({ version: '10' }).setToken(token);

        await rest.put(Routes.applicationCommands(botId), { body: parsedCommands });
        console.log(`${botId} - App commands ready`);

        const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMembers, GatewayIntentBits.MessageContent] });
                
        client.slashCommands = new Collection();
    
        commands.forEach(command =>
        {
            client.slashCommands.set(command.data.name, command);
        });
    
        client.on('ready', () =>
        {
            client.guilds.fetch().then(guilds =>
            {
                let flag = true;
                guilds.forEach(({ id }) =>
                {
                    if(!guildIds.includes(id))
                    {
                        console.log(`Forbidden - ${client.user.tag}`);
                        cleanClient(client.user.id);
    
                        flag = false;
                        return;
                    }
                });
    
                if(!flag) return;

                if(client.user.username !== botUsername) client.user.setUsername(botUsername);
                
                if(imageLoad) client.user.setAvatar(image);

                client.user.setActivity(activity.name, {type: activity.type});
    
                console.log(`Logged in as ${client.user.tag}`);
    
                plugins.forEach(({ name, options }) =>
                {
                    const config = require(`../plugins/${name}`);
                    config(client, options);
                });
            });
        });
        
        client.on('interactionCreate', async(interaction) =>
        {
            if(interaction.member.user.bot) return;

            if(interaction.isCommand())
            {
                const command = client.slashCommands.get(interaction.commandName);
                
                if(!command) return;
                
                await command.run(client, interaction);

                return;
            }

            runInteraction(interaction);
        });
    
        client.on('guildCreate', (guild) =>
        {
            if(!guildIds.includes(guild.id))
            {
                console.log(`Forbidden - ${client.user.tag}`);
                cleanClient(client.user.id);
            }
        });
        
        await client.login(token);
        
        clients.push(client);
    
        return true;
    } 
    catch (error) 
    {
        console.log(error);
        return false;
    }
}

const cleanClient = (botId) =>
{
    clients.forEach(async(client) =>
    {
        if(client.user.id === botId)
        {
            await client.destroy();
        }
    });
}

const loginClients = async() =>
{
    const bots = await Bot.find();

    bots.forEach((bot) =>
    {
        const { status, botId, image } = bot;

        if(status === 'Online')
        {
            cleanClient(botId);
            loginClient(bot);
        }
    });
}

module.exports = {
    loginClient,
    loginClients,
    cleanClient
};