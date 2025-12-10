//check validation

const { validationResult } = require("express-validator");

function checkValidation(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {

        const messages = errors.array().map(err => err.msg);
        return res.status(400).send(messages.join("\n"));
    }
    next();
}

module.exports = checkValidation;