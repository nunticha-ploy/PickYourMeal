const { Router } = require("express");
const registerUserRules = require("./middlewares/register-users-rules");
const updateUserRules = require("./middlewares/update-users-rules");
const loginRules = require("./middlewares/login-users-rules");
const verifyLoginRules = require("./middlewares/verify-login-rules");

const userModel = require("./users-model");
const OTPModel = require("./otp-model");
const checkValidation = require("../../shared/middlewares/check-validation");
const createBookmarkRules = require("../bookmarks/middlewares/create-bookmarks-rules");
const updateBookmarkRules = require("../bookmarks/middlewares/update-bookmarks-rules");
const sendEmail = require("../../shared/email-utils");
const { matchPassword } = require("../../shared/password-utils");
const { encodeToken } = require("../../shared/jwt-utils");
const { randomNumberOfNDigits } = require("../../shared/compute-utils");

const userRoute = Router();

// get all the user from the database

userRoute.get("/users", async (req, res) => {
    const allUser = await userModel.find();
    if (!allUser) {
        return res.json([]);
    } else {
        return res.json(allUser);
    }
});


// get user by id

userRoute.get("/users/:id", async (req, res) => {
    const id = req.params.id;
    const foundUserId = await userModel.findById(id);

    if (!foundUserId) {
        return res.status(404).json({ message: "User not found" });
    } else {
        return res.json(foundUserId);
    }
});

// crate new user account
userRoute.post("/users/register", registerUserRules, checkValidation, async (req, res) => {

    const newUser = req.body;

    const existingUser = await userModel.findOne({ email: newUser.email });

    if (existingUser) {
        return res.status(500).json({
            errorMessage: `User with ${newUser.email} already exist`
        });
    }

    const registerNewUser = await userModel.create({
        name: newUser.name,
        email: newUser.email,
        password: newUser.password,

    });

    const user = { ...registerNewUser.toJSON(), password: undefined };
    res.json({ user, message: "Succesfully created new user account" });

});

//update user details // 
userRoute.put("/users/:id", updateUserRules, checkValidation, async (req, res) => {
    const id = req.params.id;
    const newUserDetails = req.body;
    const foundUserId = await userModel.findById(id);

    if (!foundUserId) {
        return res.status(404).json({ message: "User not found" })
    }

    const updatedUserDetails = await userModel.findByIdAndUpdate(
        id,
        newUserDetails,
        { new: true }
    );

    if (!updatedUserDetails) {
        return res.status(500).json({ message: "Cannot update user details" });
    } else {
        return res.json({ updatedUserDetails, message: "Succesfully updated user details" });
    }
});

//delete user by id
userRoute.delete("/users/:id", async (req, res) => {
    const id = req.params.id;
    const foundUserId = await userModel.findById(id);

    if (!foundUserId) {
        return res.status(404).json({ message: "user not found" })
    }

    const deleteUser = await userModel.findByIdAndDelete(foundUserId);

    if (!deleteUser) {
        return res.status(500).json({ message: "Cannot delete user" });
    } else {
        return res.json({ message: "Succesfully delete user" });
    }
});

//create new bookmarks 
userRoute.post("/users/:id/bookmarks", createBookmarkRules, checkValidation, async (req, res) => {

    const id = req.params.id;
    const name = req.body.name;
    const menuItems = req.body.menuItems;

    const foundUserId = await userModel.findById(id);

    if (!foundUserId) {
        return res.status(404).json({ message: "user not found" })
    }

    const createNewBookmark = await userModel.findByIdAndUpdate(
        id,
        { $push: { bookmarks: { name: name, menuItems: menuItems } } },
        { new: true }
    );

    if (!createNewBookmark) {
        return res.status(500).json({ message: "Cannot create new bookmark" });
    } else {
        return res.json({ createNewBookmark, message: "Successfully created new bookmark" });
    }
});

//add menu item into bookmarks
userRoute.post("/users/:id/bookmarks/:bookmarkId", async (req, res) => {
    const userId = req.params.id;
    const bookmarkId = req.params.bookmarkId;
    const { menuItemId } = req.body;

    const foundUserId = await userModel.findById(userId);
    if (!foundUserId) {
        return res.status(404).json({ message: "user not found" });
    }

    const foundBookmarkId = await foundUserId.bookmarks.id(bookmarkId);
    if (!foundBookmarkId) {
        return res.status(404).json({ message: "Bookmark not found" });
    }

    if (foundBookmarkId.menuItems.includes(menuItemId)) {
        return res.status(400).json({ message: "Cannot add menu item into the bookmark. This menu item already exists in this bookmark" });
    }

    foundBookmarkId.menuItems.push(menuItemId);

    await foundUserId.save();

    res.json({ foundBookmarkId, message: "Add menu item into the bookmark successfully" })

});

//remove menu item from bookmark
userRoute.delete("/users/:id/bookmarks/:bookmarkId/:menuItemId", async (req, res) => {
    const userId = req.params.id;
    const bookmarkId = req.params.bookmarkId;
    const menuItemId = req.params.menuItemId;

    const foundUserId = await userModel.findById(userId);
    if (!foundUserId) {
        return res.status(404).json({ message: "user not found" });
    }

    const foundBookmarkId = await foundUserId.bookmarks.id(bookmarkId);
    if (!foundBookmarkId) {
        return res.status(404).json({ message: "Bookmark not found" });
    }

    console.log("foundBookmarkId.menuItems:", foundBookmarkId.menuItems);

    const updatedUserDetails = await userModel.findOneAndUpdate(
        { _id: userId, "bookmarks._id": bookmarkId },
        { $pull: { "bookmarks.$.menuItems": menuItemId } },
        { new: true }
    );

    if (!updatedUserDetails) {
        return res.status(500).json({ message: "Cannot delete menuItem from the bookmark" });
    }

    const updateBookmark = updatedUserDetails.bookmarks.id(bookmarkId);

    return res.json({ updateBookmark, message: "Delete menu item from bookmark successfully" })

});

//user login
userRoute.post("/users/login", loginRules, checkValidation, async (req, res) => {
    const { email, password } = req.body;
    const foundUser = await userModel.findOne({ email });
    if (!foundUser) {
        return res.status(404).send({
            errorMessage: `User with ${email} doesn't exist`,
        });
    }
    const passwordMatched = matchPassword(password, foundUser.password);
    if (!passwordMatched) {
        return res.status(401).send({
            errorMessage: "Email and password didn't matched",
        });
    }
    const user = { ...foundUser.toJSON(), password: undefined };

    const randomNumber = randomNumberOfNDigits(6);

    const otp = await OTPModel.findOneAndUpdate(
        { email: email },
        { otp: randomNumber },
        { upsert: true, new: true },
    );

    const sendOTPEmail = await sendEmail(email, "OTP Code", `Your OTP is: ${randomNumber}`);

    if (!sendOTPEmail) {
        return res.status(500).send({
            errorMessage: "Can not send an OTP",
        });
    }
    res.json({ message: "OTP sent successfully" });

});


//user verify login
userRoute.post("/users/verify-login", verifyLoginRules, checkValidation, async (req, res) => {
    const { email, otp } = req.body;

    const foundOTP = await OTPModel.findOne({ email, otp: Number(otp) });

    if (!foundOTP) {
        return res.status(404).send({
            errorMessage: "verification failed",
        });
    }

    const foundUser = await userModel.findOne({ email });
    if (!foundUser) {
        return res.status(404).send({
            errorMessage: `User with ${email} doesn't exist`,
        });
    }

    const user = { email: foundUser.email }
    const genToken = encodeToken(user)

    res.json({ genToken, user, message: "Login successful" });

}
);



module.exports = { userRoute };