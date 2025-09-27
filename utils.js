const fs = require("fs");

async function readRecipesFile() {
    try {
        const file = fs.readFileSync("./recipes.json", "utf-8");
        return JSON.parse(file);
    } catch (error) {
        throw new Error("Couldn't read file recipes.json");
    } 
};

module.exports = {
    readRecipesFile
};