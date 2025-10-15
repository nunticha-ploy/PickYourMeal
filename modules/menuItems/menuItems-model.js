// menu items model using Mongoose 

const mongoose = require("mongoose");

const MenuItemSchema = new mongoose.Schema({
    title: { type: String, required: true, minlength: 6 },
    description: { type: String, maxlength: 500, default: "" },
    ingredients: { type: [String], required: true, validate: [arr => arr.length > 0] },
    instructions: { type: Map, of: String, required: true },
    cooking_time: { type: Number, min: 0, default: null },
    servings: { type: Number, min: 0, default: null },
    ratings: {
        rating: { type: Number, min: 0, max: 5, default: 0 },
        count: { type: Number, min: 0, default: 0 }
    },
    tags: { type: Map, of: [String], default: {} },
    publish_date: { type: String, default: "" },
    image_filename: { type: String, default: "" },
    createdAt: { type: mongoose.Schema.Types.Date, default: Date.now() }
});

const MenuItemModel = new mongoose.model("MenuItem", MenuItemSchema);

module.exports = MenuItemModel;

