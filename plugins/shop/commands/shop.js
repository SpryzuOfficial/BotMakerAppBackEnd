const { EmbedBuilder } = require('@discordjs/builders');

const { row } = require('../commands_config/shop');

module.exports = {
    name: 'shop',
    description: 'Sends available shop items',
    callback: async(client, interaction) =>
    {
        const embed = new EmbedBuilder()
            .setAuthor({ name: 'Shop Menu', iconURL: client.user.avatarURL() })
            .setColor(0x0000FF)
            .setTitle('Forbidden Evil Album')
            .setDescription('Thrash Metal')
            .setImage('https://i.ibb.co/zX6mMS1/Forbidden-Evil.jpg');

        interaction.reply({ embeds: [embed], components: [row] });
    }
}