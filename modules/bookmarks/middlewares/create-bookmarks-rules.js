//validation rules for creating a bookmark

const { body } = require("express-validator");
const checkValidation = require("../../../shared/middlewares/check-validation");

const createBookmarkRules = [
    body("name")
        .notEmpty()
        .withMessage("Bookmark name must be required")
        .isString()
        .withMessage("Bookmark name must be a string")
        .isLength({ max: 100 })
        .withMessage("Bookmark name must not exceed 100 characters")
        .trim(),

    checkValidation,
];

module.exports = createBookmarkRules;