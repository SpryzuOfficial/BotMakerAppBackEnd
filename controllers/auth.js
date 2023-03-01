const { request, response } = require('express');

const User = require('../models/User');

const createUser = async(req = request, res = response) =>
{
    const { username, email, password } = req.body;

    try 
    {
        let user = await User.findOne({ email });
        
        if(user)
        {
            return res.status(400).json({
                ok: false,
                msg: 'Email already used'
            });
        }

        user = new User({ username, email, password });
    
        await user.save();
    
        res.status(201).json({
            ok: true,
            user
        });
    } 
    catch (error) 
    {
        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Internal Server Error'
        });
    }
}

const userLogin = async (req = request, res = response) =>
{
    const { email, password } = req.body;

    try
    {
        const user = await User.findOne({ email });

        if(!user)
        {
            return res.status(400).json({
                ok: false,
                msg: 'User not found'
            });
        }

        const isValid = user.verifyPasswordSync(password);

        if(!isValid)
        {
            return res.status(400).json({
                ok: false,
                msg: 'Incorrect password'
            });
        }

        return res.status(200).json({
            ok: true,
            user
        });
    }
    catch(error)
    {
        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Internal Server Error'
        });
    }
}

module.exports = {
    createUser,
    userLogin
}