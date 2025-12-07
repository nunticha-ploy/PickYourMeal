// user model using Mongoose 

const mongoose = require("mongoose");
const { encodePassword } = require("../../shared/password-utils");

const userSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, unique: true, isEmail: true },
    password: { type: String, required: true, minLength: 8 },
    emailVerified: { type: Boolean, default: false },
    bookmarks: [{
        _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
        name: { type: String, required: true, trim: true, maxLength: 100 },
        menuItems: [{ type: mongoose.Schema.Types.ObjectId, ref: "MenuItem" }],
        createdAt: { type: mongoose.Schema.Types.Date, default: Date.now() }
    }],
    favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: "MenuItem" }],
    shoppingLists: [{
        _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
        menuItemId: { type: mongoose.Schema.Types.ObjectId, ref: "MenuItem", required: true },
        title: { type: String, required: true, trim: true },
        ingredients: [{ type: String, required: true }],
        createdAt: { type: mongoose.Schema.Types.Date, default: Date.now() }
    }],
    roles: { type: String, enum: ["admin", "user"], default: "user", required: true },
    createdAt: { type: mongoose.Schema.Types.Date, default: Date.now() },
},
    { versionKey: false }
);

userSchema.pre("save", async function (next) {
    if(!this.isModified("password")) next();
    this.password = encodePassword(this.password);
    next();
});

const userModel = new mongoose.model("User", userSchema);

module.exports = userModel;


