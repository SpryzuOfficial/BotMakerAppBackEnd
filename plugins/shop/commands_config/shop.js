const { ActionRowBuilder, ButtonBuilder, ButtonStyle, StringSelectMenuBuilder } = require("discord.js");

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

const setIndex = (value) =>
{
    if(value < 0) return;
    if(value > items.length) return;

    index = value;
}

const getIndex = () => index;

const singleItemRow = new ActionRowBuilder()
    .addComponents([
        new ButtonBuilder()
            .setCustomId('shop_buttons_prevItem')
            .setLabel('<')
            .setStyle(ButtonStyle.Primary),
        new ButtonBuilder()
            .setCustomId('shop_buttons_nextItem')
            .setLabel('>')
            .setStyle(ButtonStyle.Primary),
        new ButtonBuilder()
            .setCustomId('shop_buttons_allItems')
            .setLabel('Show All items')
            .setStyle(ButtonStyle.Secondary)
    ]);

const formatedOptions = [];

items.forEach((item, index) =>
{
    formatedOptions.push({
        label: item.title,
        description: item.description,
        value: `shop_item_${index}`
    });
});

const multipleItemsRow = new ActionRowBuilder()
    .addComponents([
        new StringSelectMenuBuilder()
            .setCustomId('shop_menus_selectItem')
            .setPlaceholder('Select Item')
            .setOptions(formatedOptions)
    ]);

module.exports = {
    singleItemRow,
    multipleItemsRow,
    items,
    indexFunc: {
        increaseIndex,
        decreaseIndex,
        setIndex,
        getIndex
    }
}