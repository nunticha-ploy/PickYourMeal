//validation rules for update user item details

const { body } = require("express-validator");
const checkValidation = require("../../../shared/middlewares/check-validation");

const updateUserRules = [
    body("name")
        .optional()
        .isString()
        .withMessage("Name must be a string")
        .trim(),

    body("email")
        .optional()
        .isEmail()
        .withMessage("Email must be a valid email address")
        .normalizeEmail(),

    body("password")
        .optional()
        .isString()
        .withMessage("Password must be a string")
        .isLength({ min: 8 })
        .withMessage("Password must be at least 8 characters long")
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
        .withMessage("Password must contain at least one lowercase letter, one uppercase letter and number"),

    //i dont know what suppose to be in emailVerified

    checkValidation,
];

module.exports = updateUserRules;