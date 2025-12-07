//validation rules for user when login

const { body } = require("express-validator");
const checkValidation = require("../../../shared/middlewares/check-validation");


const loginRules = [
  body("email")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("email is invalid")
    .normalizeEmail(),

  body("password").notEmpty().withMessage("password is required"),

  checkValidation,
];

module.exports = loginRules;