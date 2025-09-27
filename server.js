const express = require("express");
const utils = require("./utils");

const app = express();

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

app.listen(3000, () => {
    console.log("Server is running in Port 3000");
});