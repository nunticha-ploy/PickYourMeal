// user model using Mongoose 

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, unique: true, isEmail: true },
    password: { type: String, required: true, minLength: 8 },
    emailVerified: { type: Boolean, default: false},
    bookmarks: [{
        name: { type: String, required: true, trim: true, maxLength: 100 },
        menuItems: [{ type: mongoose.Schema.Types.ObjectId, ref: "MenuItem", required: true, default: [] }],
        createdAt: { type: mongoose.Schema.Types.Date, default: Date.now() }
    }],
    favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: "MenuItem"}],
    shoppingLists: [{ 
        menuItemId: { type: mongoose.Schema.Types.ObjectId, ref: "MenuItem", reqired: true  },
        title: { type: String, required: true, trim: true },
        ingredients: [{ type: String, required: true }],
        createdAt: { type: mongoose.Schema.Types.Date, default: Date.now() },
        default: []
    }],
    createdAt: { type: mongoose.Schema.Types.Date, default: Date.now() }
});

const userModel = new mongoose.model("User", userSchema);

module.exports = userModel;


