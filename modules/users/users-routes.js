const { Router } = require("express");
const createUserRules = require("./middlewares/create-users-rules");
const updateUserRules = require("./middlewares/update-users-rules");

const userModel = require("./users-model");
const checkValidation = require("../../shared/middlewares/check-validation");
const createBookmarkRules = require("../bookmarks/middlewares/create-bookmarks-rules");
const updateBookmarkRules = require("../bookmarks/middlewares/update-bookmarks-rules");

const userRoute = Router();


// get all the user from the database

userRoute.get("/users", async (req, res) => {
    const allUser = await userModel.find();
    if(!allUser){
        return res.json([]);
    }else{
        return res.json(allUser);
    }
});


// get user by id

userRoute.get("/users/:id", async (req, res) => {
    const id = req.params.id;
    const foundUserId = await userModel.findById(id);

    if(!foundUserId){
        return res.status(404).json({message: "User not found"});
    }else{
        return res.json(foundUserId);
    }
});

// crate new menu item 
userRoute.post("/users", createUserRules, checkValidation, async (req, res) => {

    const newUser = req.body;

    const createNewUser = await userModel.create({
        name: newUser.name,
        email: newUser.email,
        password: newUser.password,
        emailVerified: newUser.emailVerified,
        bookmarks: newUser.bookmarks,
        favorites: newUser.favorites,
        shoppingLists: newUser.shoppingLists
    });

    if(!createNewUser){
        return res.status(500).json({message: "Cannot create new user"});
    }else{
        return res.json({createNewUser, message: "Successfully created new user"});
    }
});

//update user details // 
userRoute.put("/users/:id", updateUserRules, checkValidation, async (req, res) => {
    const id = req.params.id;
    const newUserDetails = req.body;
    const foundUserId = await userModel.findById(id);

    if(!foundUserId){
        return res.status(404).json({message: "User not found"})
    }

    const updatedUserDetails = await userModel.findByIdAndUpdate(
        id,
        newUserDetails,
        { new: true }
    );

    if(!updatedUserDetails){
        return res.status(500).json({message: "Cannot update user details"});
    }else{
        return res.json({updatedUserDetails, message: "Succesfully updated user details"});
    }
});

//delete user by id
userRoute.delete("/users/:id", async (req, res) => {
    const id = req.params.id;
    const foundUserId = await userModel.findById(id);

    if(!foundUserId){
        return res.status(404).json({message: "user not found"})
    }

    const deleteUser = await userModel.findByIdAndDelete(foundUserId);

    if(!deleteUser){
        return res.status(500).json({message: "Cannot delete user"});
    }else{
        return res.json({message: "Succesfully delete user"});
    }
});

//create new bookmarks 
userRoute.post("/users/:id/bookmarks", createBookmarkRules, checkValidation, async (req, res) => {

    const id = req.params.id;
    const name = req.body.name;
    const menuItems = req.body.menuItems;

    const foundUserId = await userModel.findById(id);

    if(!foundUserId){
        return res.status(404).json({message: "user not found"})
    }

    const createNewBookmark = await userModel.findByIdAndUpdate(
        id,
        { $push: { bookmarks: { name: name, menuItems: menuItems } } },
        { new: true }
    );

    if(!createNewBookmark){
        return res.status(500).json({message: "Cannot create new bookmark"});
    }else{
        return res.json({createNewBookmark, message: "Successfully created new bookmark"});
    }
});


module.exports = { userRoute };