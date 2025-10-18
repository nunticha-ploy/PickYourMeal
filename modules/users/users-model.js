// user model using Mongoose 

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, unique: true, isEmail: true },
    password: { type: String, required: true, min: 8 },
    emailVerified: { type: Boolean},
    createdAt: { type: mongoose.Schema.Types.Date, default: Date.now() }
});

const userModel = new mongoose.model("user", userSchema);

module.exports = userModel;


