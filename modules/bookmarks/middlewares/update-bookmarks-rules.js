//validation rules for updating a bookmark

const { body } = require("express-validator");
const checkValidation = require("../../../shared/middlewares/check-validation");

const updateBookmarkRules = [
    body("name")
        .optional()
        .isString()
        .withMessage("Bookmark name must be a string")
        .isLength({ max: 100 })
        .withMessage("Bookmark name must not exceed 100 characters")
        .trim(),

    checkValidation,
];

module.exports = updateBookmarkRules;