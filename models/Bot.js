const { Schema, model, Types } = require('mongoose');

const BotSchema = new Schema({
    status: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    activity: {},
    botId: {
        type: String,
        required: true
    },
    guildIds: [],
    token: {
        type: String,
        required: true
    },
    slashCommands: [],
    plugins: [],
    user: {
        type: Types.ObjectId,
        ref: 'User',
        required: true
    }
});

module.exports = model('Bot', BotSchema);