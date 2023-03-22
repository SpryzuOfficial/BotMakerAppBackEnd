const { ActionRowBuilder, ButtonBuilder, ButtonStyle, StringSelectMenuBuilder } = require("discord.js");

let items = [];

const setItems = (array) => items = array;

const getItems = () => items;

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

const generateSingleItemRow = () =>
{
    let isPrev = false;
    let isNext = false;

    if(index === 0) isPrev = true;
    if((index + 1) === items.length) isNext = true;

    return new ActionRowBuilder()
        .addComponents([
            new ButtonBuilder()
                .setCustomId('shop_buttons_prevItem')
                .setLabel('<')
                .setDisabled(isPrev)
                .setStyle(ButtonStyle.Secondary),
            new ButtonBuilder()
                .setCustomId('shop_buttons_nextItem')
                .setLabel('>')
                .setDisabled(isNext)
                .setStyle(ButtonStyle.Secondary),
            new ButtonBuilder()
                .setCustomId('shop_buttons_buy')
                .setLabel('Buy')
                .setStyle(ButtonStyle.Primary),
            new ButtonBuilder()
                .setCustomId('shop_buttons_allItems')
                .setLabel('Show All items')
                .setStyle(ButtonStyle.Secondary)
        ]);
}

const generateMultipleItemsRow = () =>
{
    const formatedOptions = [];
    
    items.forEach((item, index) =>
    {
        formatedOptions.push({
            label: item.title,
            description: item.description,
            value: `shop_item_${index}`
        });
    });
    
    return [
        new ActionRowBuilder()
            .addComponents([
                new ButtonBuilder()
                    .setCustomId('shop_buttons_prevPage')
                    .setLabel('<')
                    .setStyle(ButtonStyle.Secondary),
                new ButtonBuilder()
                    .setCustomId('shop_buttons_nextPage')
                    .setLabel('>')
                    .setStyle(ButtonStyle.Secondary)
            ]),
        new ActionRowBuilder()
            .addComponents([
                new StringSelectMenuBuilder()
                    .setCustomId('shop_menus_selectItem')
                    .setPlaceholder('Select Item')
                    .setOptions(formatedOptions)
            ])
    ]
}

module.exports = {
    generateSingleItemRow,
    generateMultipleItemsRow,
    itemsFunc: {
        setItems,
        getItems
    },
    indexFunc: {
        increaseIndex,
        decreaseIndex,
        setIndex,
        getIndex
    }
}