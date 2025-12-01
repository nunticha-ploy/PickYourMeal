// menu items model using Mongoose 

const mongoose = require("mongoose");

const MenuItemSchema = new mongoose.Schema({
    title: { type: String, required: true, minlength: 6 },
    description: { type: String, maxlength: 500, default: "" },
    ingredients: { type: [String], required: true, validate: [arr => arr.length > 0], message: "Ingredients are required" },
    instructions: {
        type: mongoose.Schema.Types.Mixed, required: true, validate: function (instructions) {
            return instructions && typeof instructions === "object" && Object.keys(instructions).length > 0;
        }, message: "Instructions must be object and required"
    },
    cooking_time: { type: Number, min: 0, default: null },
    servings: { type: Number, min: 0, default: null },
    ratings: {
        rating: { type: Number, min: 0, max: 5, default: 0 },
        count: { type: Number, min: 0, default: 0 }
    },
    tags: {
        type: mongoose.Schema.Types.Mixed, default: {}
    },
    publish_date: { type: String, default: "" },
    image_filename: { type: String, default: "" },
    createdAt: { type: mongoose.Schema.Types.Date, default: Date.now() }
});

const MenuItemModel = new mongoose.model("MenuItem", MenuItemSchema);

module.exports = MenuItemModel;

