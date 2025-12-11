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
const authorize = require("../../shared/middlewares/authorize");

const userRoute = Router();

// get all the user from the database

userRoute.get("/users", authorize(["admin"]), async (req, res) => {
    const allUser = await userModel.find();
    if (!allUser) {
        return res.json([]);
    } else {
        return res.json(allUser);
    }
});

//get me
userRoute.get("/users/me", authorize(["admin", "user"]), async (req, res) => {
    const id = req.account.id;
    const foundUserId = await userModel.findById(id);
    const isAdmin = req.account.roles.includes("admin");
    const isOwner = req.account.id === id;

    if (!foundUserId) {
        return res.status(404).json({ message: "User not found" });
    }

    if (!isAdmin && !isOwner) {
        return res.status(401).json({
            errorMessage: "Only admin is allow to access others account"
        })
    }

    return res.json(foundUserId);
});

//create new bookmarks 
userRoute.post("/users/create/bookmark", authorize(["admin", "user"]), createBookmarkRules, checkValidation, async (req, res) => {

    const id = req.account.id;
    const name = req.body.name;
    const menuItems = req.body.menuItems;
    const isAdmin = req.account.roles.includes("admin");
    const isOwner = req.account.id === id;

    const foundUserId = await userModel.findById(id);

    if (!foundUserId) {
        return res.status(404).json({ message: "user not found" })
    }

    if (!isAdmin && !isOwner) {
        return res.status(401).json({
            errorMessage: "Only admin is allow to access others account"
        })
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


// get user by id

userRoute.get("/users/:id", authorize(["admin", "user"]), async (req, res) => {
    const id = req.params.id;
    const foundUserId = await userModel.findById(id);
    const isAdmin = req.account.roles.includes("admin");
    const isOwner = req.account.id === id;


    if (!foundUserId) {
        return res.status(404).json({ message: "User not found" });
    }

    if (!isAdmin && !isOwner) {
        return res.status(401).json({
            errorMessage: "Only admin is allow to access others account"
        })
    }

    return res.json(foundUserId);
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
userRoute.put("/users/:id", authorize(["admin", "user"]), updateUserRules, checkValidation, async (req, res) => {
    const id = req.params.id;
    const newUserDetails = req.body;
    const foundUserId = await userModel.findById(id);
    const isAdmin = req.account.roles.includes("admin");
    const isOwner = req.account.id === id;

    if (!foundUserId) {
        return res.status(404).json({ message: "User not found" })
    }

    if (!isAdmin && !isOwner) {
        return res.status(401).json({
            errorMessage: "Only admin is allow to access others account"
        })
    }

    if (!isAdmin && newUserDetails.roles) {
        return res.status(401).json({
            errorMessage:
                "You don't have permission to update your role. Please contact the support team for the assistance!",
        });
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
userRoute.delete("/users/:id", authorize(["admin", "user"]), async (req, res) => {
    const id = req.params.id;
    const foundUserId = await userModel.findById(id);
    const isAdmin = req.account.roles.includes("admin");
    const isOwner = req.account.id === id;

    if (!foundUserId) {
        return res.status(404).json({ message: "user not found" })
    }

    if (!isAdmin && !isOwner) {
        return res.status(401).json({
            errorMessage: "Only admin is allow to delete others account"
        })
    }

    const deleteUser = await userModel.findByIdAndDelete(id);

    if (!deleteUser) {
        return res.status(500).json({ message: "Cannot delete user" });
    } else {
        return res.json({ message: "Succesfully deleted user" });
    }
});

//create new bookmarks 
userRoute.post("/users/:id/bookmarks", authorize(["admin", "user"]), createBookmarkRules, checkValidation, async (req, res) => {

    const id = req.params.id;
    const name = req.body.name;
    const menuItems = req.body.menuItems;
    const isAdmin = req.account.roles.includes("admin");
    const isOwner = req.account.id === id;

    const foundUserId = await userModel.findById(id);

    if (!foundUserId) {
        return res.status(404).json({ message: "user not found" })
    }

    if (!isAdmin && !isOwner) {
        return res.status(401).json({
            errorMessage: "Only admin is allow to access others account"
        })
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
userRoute.post("/users/:id/bookmarks/:bookmarkId", authorize(["admin", "user"]), async (req, res) => {
    const userId = req.params.id;
    const bookmarkId = req.params.bookmarkId;
    const { menuItemId } = req.body;
    const isAdmin = req.account.roles.includes("admin");
    const isOwner = req.account.id === userId;

    const foundUserId = await userModel.findById(userId);
    if (!foundUserId) {
        return res.status(404).json({ message: "user not found" });
    }

    if (!isAdmin && !isOwner) {
        return res.status(401).json({
            errorMessage: "Only admin is allow to access others account"
        })
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
userRoute.delete("/users/:id/bookmarks/:bookmarkId/:menuItemId", authorize(["admin", "user"]), async (req, res) => {
    const userId = req.params.id;
    const bookmarkId = req.params.bookmarkId;
    const menuItemId = req.params.menuItemId;
    const isAdmin = req.account.roles.includes("admin");
    const isOwner = req.account.id === userId;

    const foundUserId = await userModel.findById(userId);
    if (!foundUserId) {
        return res.status(404).json({ message: "user not found" });
    }

    if (!isAdmin && !isOwner) {
        return res.status(401).json({
            errorMessage: "Only admin is allow to access others account"
        })
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

    await OTPModel.deleteOne({ email });

    const foundUser = await userModel.findOne({ email });
    if (!foundUser) {
        return res.status(404).send({
            errorMessage: `User with ${email} doesn't exist`,
        });
    }

    const user = {
        id: foundUser._id.toString(),
        email: foundUser.email,
        name: foundUser.name,
        roles: foundUser.roles
    }

    const genToken = encodeToken(user);

    res.cookie("token", genToken, {
        httpOnly: true,
        secure: true,
        maxAge: 1000 * 60 * 50
    });

    res.json({ user, message: "Login successful" });

});

//user logout
userRoute.post("/users/logout", async (req, res) => {
    res.clearCookie("token", {
        httpOnly: true,
        secure: false,
    });

    res.json({ message: "Logout successful" });
});




module.exports = { userRoute };