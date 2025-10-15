//validation rules for creating a menu item

const { body } = require("express-validator");
const checkValidation = require("../../../shared/middlewares/check-validation");

const createMenuItemRules = [
    body("title")
        .isString()
        .withMessage("Title must be a string")
        .isLength({ min: 6 })
        .withMessage("Title must be at least 6 characters long")
        .notEmpty()
        .withMessage("Title must be required"),

    body("description")
        .optional()
        .isString()
        .withMessage("Description must be a string")
        .isLength({ max: 500 })
        .withMessage("Description must not exceed 500 characters"),

    body("ingredients")
        .isArray({ min: 1 })
        .withMessage("Ingredients must be a non-empty array")
        .notEmpty()
        .withMessage("Ingredients must be required"),

    //body("instructions") -- I dont know how to set the rules for this 

    body("cooking_time")
        .optional()
        .isFloat({ min: 0 })
        .withMessage("Cooking time must be a positive number"),

    body("servings")
        .optional()
        .isFloat({ min: 0 })
        .withMessage("Cooking time must be a positive number"),

    body("ratings")
        .optional()
        .isObject()
        .withMessage("Ratings must be an object"),

    body("rationgs.rating")
        .optional()
        .isFloat({ min: 0, max: 5 })
        .withMessage("Rating must be a number between 0 and 5"),

    body("ratings.count")
        .optional()
        .isInt({ min: 0 })
        .withMessage("Rating count must be a positive number"),

    //body("tags") -- I dont know how to set the rules for this 

    body("publish_date")
        .optional()
        .isString()
        .withMessage("Publish date must be a string"),

    body("image_filename")
        .optional()
        .isString()
        .withMessage("Image file name must be a string"),
    
    checkValidation,
];

module.exports = createMenuItemRules;

