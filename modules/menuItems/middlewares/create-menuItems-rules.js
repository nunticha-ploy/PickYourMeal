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

    body("instructions") 
        .notEmpty()
        .withMessage("Instructions must be required")
        .custom((instructions) => {
            if(typeof instructions !== "object" || Array.isArray(instructions) || instructions === null){
                throw new Error("Instructions must be an object");
            }
            
            const keys = Object.keys(instructions);
            if(keys.length === 0){
                throw new Error("Instructions must not be empty");
            }

            for(const key in instructions){
                if(typeof instructions[key] !== "string" || instructions[key].trim() === ""){
                    throw new Error(`Instruction step ${key} must be string and required`);
                }
            }

            return true;
        }),

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

    body("ratings.rating")
        .optional()
        .isFloat({ min: 0, max: 5 })
        .withMessage("Rating must be a number between 0 and 5"),

    body("ratings.count")
        .optional()
        .isInt({ min: 0 })
        .withMessage("Rating count must be a positive number"),

    body("tags")
        .optional()
        .custom((tags) => {
            if(tags === undefined){
                return true;
            }

            if(typeof tags !== "object" || Array.isArray(tags) || tags === null){
                throw new Error("Tags must be an objects");
            }

            for(const key in tags){
                if(!Array.isArray(tags[key])){
                    throw new Error(`Tag ${key} must be an array`);
                }

                tags[key].forEach((item, index) => {
                    if(typeof item !== "string" || item.trim() === ""){
                        throw new Error(`Tag ${key} at index ${index} must be string and required`);
                    }
                });
            }

            return true;
        }),

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

