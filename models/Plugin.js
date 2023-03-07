const { Schema, model, Types } = require('mongoose');

const PluginSchema = Schema({
    bot: {
        type: Types.ObjectId,
        ref: 'Bot',
        required: true
    },
    data: []
});

module.exports = model('Plugin', PluginSchema);