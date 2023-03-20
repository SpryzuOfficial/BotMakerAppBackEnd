const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

const items = [
    {
        title: 'Forbidden Evil',
        description: 'Thrash Metal',
        color: 0x0000FF,
        img: 'https://i.ibb.co/zX6mMS1/Forbidden-Evil.jpg'
    },
    {
        title: 'Refuge Denied',
        description: 'Thrash Metal',
        color: 0xA020F0,
        img: 'https://i.ibb.co/qrWVSys/Sanc-refdenied.jpg'
    }
]

let index = 0;

const increaseIndex = () =>
{
    if((index + 1) === items.length) return;

    index += 1;
}

const decreaseIndex = () =>
{
    if(index === 0) return;

    index -= 1;
}

const row = new ActionRowBuilder()
    .addComponents([
        new ButtonBuilder()
            .setCustomId('shop_btn_prevItem')
            .setLabel('<')
            .setStyle(ButtonStyle.Primary),
        new ButtonBuilder()
            .setCustomId('shop_btn_nextItem')
            .setLabel('>')
            .setStyle(ButtonStyle.Primary),
        new ButtonBuilder()
            .setCustomId('shop_btn_allItems')
            .setLabel('Show All items')
            .setStyle(ButtonStyle.Secondary)
    ]);

module.exports = {
    row,
    items,
    index,
    indexFunc: {
        increaseIndex,
        decreaseIndex
    }
}