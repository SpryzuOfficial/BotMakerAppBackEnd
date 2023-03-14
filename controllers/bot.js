const { request, response } = require('express');
const { v4: uuid } = require('uuid');

const Bot = require('../models/Bot');

const { botExists,
        userExists,
        userBotMatch,
        updateDiscordClient } = require('../helpers');

const { cleanClient } = require('../discord/clients');

const registerBot = async(req = request, res = response) =>
{
    try
    {
        const user = await userExists(req, res);
        if(!user) return;

        const { name, image, activity, botId, guildIds, token } = req.body;

        let bot = await Bot.findOne({ ...botId });

        if(bot)
        {
            return res.status(400).json({
                ok: false,
                msg: 'Bot Id already used'
            });
        }

        bot = new Bot({ name, image, activity, botId, guildIds, token });

        bot.user = user.id;

        if(!(await updateDiscordClient(bot)))
        {
            bot.status = 'Offline';
            await bot.save();

            return res.status(201).json({
                ok: true,
                warning: 'Bot Offline',
                bot
            });
        }

        bot.status = 'Online';
        await bot.save();

        res.status(201).json({
            ok: true,
            bot
        });
    } 
    catch (error) 
    {
        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Internal Server Error'
        });
    }
}

const getUserBots = async(req = request, res = response) =>
{
    try
    {
        const user = await userExists(req, res);
        if(!user) return;

        const bots = await Bot.find();

        const userBots = [];

        bots.forEach(bot =>
        {
            if(!userBotMatch(res, user, bot, false)) return;

            userBots.push(bot);
        });

        res.status(200).json({
            ok: true,
            bots: userBots
        });
    } 
    catch (error) 
    {
        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Internal Server Error'
        });
    }
}

const editBot = async(req = request, res = response) =>
{
    try 
    {
        const user = await userExists(req, res);
        if(!user) return;

        const bot = await botExists(req, res);
        if(!bot) return;

        if(!userBotMatch(res, user, bot)) return;
        
        const newBot = await Bot.findByIdAndUpdate(bot.id, { ...req.body }, { new: true });

        if(!(await updateDiscordClient(newBot)))
        {
            newBot.status = 'Offline';
            await newBot.save();

            return res.status(201).json({
                ok: true,
                warning: 'Bot Offline',
                newBot
            });
        }

        res.status(200).json({
            ok: true,
            bot: newBot
        });
    } 
    catch (error) 
    {
        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Internal Server Error'
        });
    }
}

const deleteBot = async(req = request, res = response) =>
{
    try
    {
        const user = await userExists(req, res);
        if(!user) return;

        const bot = await botExists(req, res);
        if(!bot) return;

        if(!userBotMatch(res, user, bot)) return;

        cleanClient(bot.botId);

        await Bot.findByIdAndRemove(bot.id);

        res.status(200).json({
            ok: true
        });
    } 
    catch (error) 
    {
        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Internal Server Error'
        });
    }
}

const toggleBotStatus = async(req = request, res = response) =>
{
    try
    {
        const user = await userExists(req, res);
        if(!user) return;

        const bot = await botExists(req, res);
        if(!bot) return;

        if(!userBotMatch(res, user, bot)) return;

        bot.status = bot.status === 'Online' ? 'Offline': 'Online';

        if(bot.status === 'Offline')
        {
            cleanClient(bot.botId);
        }
        else
        {
            await updateDiscordClient(bot);
        }

        await bot.save();

        res.status(200).json({
            ok: true,
            bot
        });
    } 
    catch (error) 
    {
        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Internal Server Error'
        });
    }
}

const createSlashCommand = async(req = request, res = response) =>
{
    try
    {
        const user = await userExists(req, res);
        if(!user) return;

        const bot = await botExists(req, res);
        if(!bot) return;

        if(!userBotMatch(res, user, bot)) return;

        const { name: rawName, description, reply } = req.body;

        const name = rawName.toLowerCase();

        reply.color = parseInt(reply.color);
        if(reply.timestamp)
        {
            reply.timestamp = new Date().toISOString();
        }

        let command = bot.slashCommands.filter(command => command.name === name);
        if(command.length > 0)
        {
            return res.status(400).json({
                ok: true,
                msg: 'Command name already used'
            });
        }

        const uid = uuid();

        command = { name, description, reply, uid };
        bot.slashCommands.push(command);

        await updateDiscordClient(bot);

        await bot.save();

        res.status(200).json({
            ok: true,
            bot
        });
    } 
    catch (error) 
    {
        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Internal Server Error'
        });
    }
}

const deleteSlashCommand = async(req = request, res = response) =>
{
    try
    {
        const user = await userExists(req, res);
        if(!user) return;

        const bot = await botExists(req, res);
        if(!bot) return;

        if(!userBotMatch(res, user, bot)) return;

        const { uid } = req.body;

        const commands = bot.slashCommands.filter(command => command.uid !== uid);

        bot.slashCommands = commands;

        await updateDiscordClient(bot);

        await bot.save();

        res.status(200).json({
            ok: true,
            bot
        });
    } 
    catch (error) 
    {
        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Internal Server Error'
        });
    }
}

module.exports = {
    registerBot,
    getUserBots,
    editBot,
    deleteBot,
    toggleBotStatus,
    createSlashCommand,
    deleteSlashCommand,
}