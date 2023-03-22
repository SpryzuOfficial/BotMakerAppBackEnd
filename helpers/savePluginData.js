const savePluginData = async(plugin, thisPluginData, name) =>
{
    plugin.data = plugin.data.filter(d => d.name !== name);
    plugin.data.push(thisPluginData);

    await plugin.save();
}

module.exports = savePluginData;