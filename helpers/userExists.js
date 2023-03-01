const User = require('../models/User');

const userExists = async(req, res) =>
{
    const userId = req.headers['x-user'];

    if(!userId) 
    {
        res.status(400).json({
            ok: false,
            msg: 'User not found'
        });

        return undefined;
    }

    const user = await User.findById(userId);
    if(!user)
    {
        res.status(400).json({
            ok: false,
            msg: 'User not found'
        });
    }

    return user;
}

module.exports = userExists;