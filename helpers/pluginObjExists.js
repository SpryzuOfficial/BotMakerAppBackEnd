const pluginObjExists = async(plugin, name, data) =>
{
    let thisPluginData = plugin.data.filter(d => d.name === name)[0];

    if(!thisPluginData)
    {
        const initialData = {
            name,
            ...data
        };

        thisPluginData = initialData;
        plugin.data.push(initialData);
    }

    await plugin.save();

    return thisPluginData;
}

module.exports = pluginObjExists;