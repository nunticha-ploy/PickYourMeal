const { Router } = require("express");
const createUserRules = require("./middlewares/create-users-rules");
const updateUserRules = require("./middlewares/update-users-rules");

const userModel = require("./users-model");
const checkValidation = require("../../shared/middlewares/check-validation");

const userModelRoute = Router();


// get all the user from the database

userModelRoute.get("/users", async (req, res) => {
    const allUser = await userModel.find();
    if(!allUser){
        return res.json([]);
    }else{
        return res.json(allUser);
    }
});

module.exports = { userModelRoute };