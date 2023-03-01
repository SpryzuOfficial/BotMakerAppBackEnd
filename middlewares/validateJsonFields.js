const { request, response } = require('express');
const { validationResult } = require('express-validator');

const validateJsonFields = (req = request, res = response, next) =>
{
    const errors = validationResult(req);

    if(!errors.isEmpty())
    {
        return res.status(400).json({
            ok: false,
            errors: errors.array()
        });
    }

    next();
}

module.exports = validateJsonFields;