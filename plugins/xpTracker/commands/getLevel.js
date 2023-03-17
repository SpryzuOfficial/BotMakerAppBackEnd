const { AttachmentBuilder } = require('discord.js');
const Canvas = require('canvas');

const { pluginDBExists, pluginObjExists } = require('../../../helpers');

module.exports = {
    name: 'level',
    description: 'Displays your xp level',
    callback: async(client, interaction) =>
    {
        const plugin = await pluginDBExists(client);
        const thisPluginData = await pluginObjExists(plugin, 'xpTracker');

        const { xp, lv, next } = thisPluginData.users.filter(user => user.id === interaction.member.user.id)[0];

        const canvas = Canvas.createCanvas(600, 200);
        const ctx = canvas.getContext('2d');

        const bkg = await Canvas.loadImage('https://i.ibb.co/r0VhtFP/XP-Bar.png');
        const avatar = await Canvas.loadImage(interaction.member.user.displayAvatarURL({ extension: 'png', size: 64 }));

        ctx.fillStyle = '#FF5B61';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = '#0000FF';
        ctx.fillRect(7, 163, 485 * (xp / next), 25);

        ctx.drawImage(avatar, 24, 24);
        ctx.drawImage(bkg, 0, 0, canvas.width, canvas.height);

        ctx.font = '20px sans-serif';
        ctx.fillStyle = '#FFFFFF'
        ctx.fillText(interaction.member.displayName, 200, 70);

        ctx.font = '14px sans-serif';
        ctx.fillText(`Lv: ${lv} - Xp: ${xp} - Next Lv: ${next}`, 180, 100);

        const attachment = new AttachmentBuilder(canvas.toBuffer(), { name: 'rank-img.png' });

        interaction.reply({ files: [attachment] });
    }
}