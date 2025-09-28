const express = require("express");
const utils = require("./utils");
const app = express();

//------User account--------//

//create user account
app.post("/user/signUp", (req, res, next) => {

});

//update user information
app.put("/user/informationUpdate", (req, res, next) => {

});

//sign in into user account
app.get("/user/signIn", (req, res, next) => {

});


//------Search recipes--------//

//test get first 20 recipes
app.get("/recipes", async (req, res, next) => {
    try {
        const recipesFile = await utils.readRecipesFile();
        const first20 = recipesFile.slice(0, 20);
        res.json(first20);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

//get recipes by search - user search in input field 
app.get("/recipes/search", (req, res, next) => {

});

//get recipes by filter 
app.get("/recipes/filter", (req, res, next) => {

});

//------Add into user saved page--------//

//add recipe choise into user saved pgae 
app.post("/bookMark/save", (req, res, next) => {

});

//remove recipe choise out of user saved pgae
app.delete("/bookMark/save", (req, res, next) => {

});

//------Create shopping list--------//

//create shopping list from recipe choise and add into shopping list page
app.post("/shoppingList/add", (req, res, next) => {

});

//remove shopping list from recipe choise out of the shopping list page
app.delete("/shoppingList/remove", (req, res, next) => {

});

//------Random recipes menu--------//

//get recipes by random index
app.get("/random", (req, res, next) => {

});

//get recipes by random index with filter
app.get("/random/filter", (req, res, next) => {

});

app.listen(3000, () => {
    console.log("Server is running in Port 3000");
});