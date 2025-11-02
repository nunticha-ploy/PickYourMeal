const { Router } = require("express");
const createMenuItemRules = require("./middlewares/create-menuItems-rules");
const updateMenuItemRules = require("./middlewares/update-menuItems-rules");

const MenuItemModel = require("./menuItems-model");
const checkValidation = require("../../shared/middlewares/check-validation");

const menuItemsRoute = Router();

// get all menu items from the database
// **take long time to get all the data**

menuItemsRoute.get("/menuItems", async (req, res) => {
    const allMenuItems = await MenuItemModel.find();
    if(!allMenuItems){
        return res.json([]);
    }else{
        return res.json(allMenuItems);
    }
});

// get menu item by id

menuItemsRoute.get("/menuItems/:id", async (req, res) => {
    const id = req.params.id;
    const foundMenuItemId = await MenuItemModel.findById(id);

    if(!foundMenuItemId){
        return res.status(404).json({message: "Menu item not found"});
    }else{
        return res.json(foundMenuItemId);
    }
});

// crate new menu item 
menuItemsRoute.post("/menuItems", createMenuItemRules, checkValidation, async (req, res) => {

    const newMenuItem = req.body;

    const addNewMenuItem = await MenuItemModel.create({
        title: newMenuItem.title,
        description: newMenuItem.description,
        ingredients: newMenuItem.ingredients,
        instructions: newMenuItem.instructions,
        cooking_time: newMenuItem.cooking_time,
        servings: newMenuItem.servings,
        ratings: newMenuItem.ratings,
        tags: newMenuItem.tags,
        publish_date: newMenuItem.publish_date,
        image_filename: newMenuItem.image_filename
    });

    if(!addNewMenuItem){
        return res.status(500).json({message: "Cannot create new menu item"});
    }else{
        return res.json({addNewMenuItem, message: "Successfully created new menu item"});
    }
});

//update menu item details // 
menuItemsRoute.put("/menuItems/:id", updateMenuItemRules, checkValidation, async (req, res) => {
    const id = req.params.id;
    const newMenuItemDetails = req.body;
    const foundMenuItemId = await MenuItemModel.findById(id);

    if(!foundMenuItemId){
        return res.status(404).json({message: "Menu item not found"})
    }

    const updatedMenuItemDetail = await MenuItemModel.findByIdAndUpdate(
        id,
        newMenuItemDetails,
        { new: true }
    );

    if(!updatedMenuItemDetail){
        return res.status(500).json({message: "Cannot update menu item details"});
    }else{
        return res.json({updatedMenuItemDetail, message: "Succesfully updated menu item details"});
    }
});

//delete menu item by id
menuItemsRoute.delete("/menuItems/:id", async (req, res) => {
    const id = req.params.id;
    const foundMenuItemId = await MenuItemModel.findById(id);

    if(!foundMenuItemId){
        return res.status(404).json({message: "Menu item not found"})
    }

    const deleteMenuItem = await MenuItemModel.findByIdAndDelete(foundMenuItemId);

    if(!deleteMenuItem){
        return res.status(500).json({message: "Cannot delete menu item"});
    }else{
        return res.json({message: "Succesfully delete menu item"});
    }
});

//get data by search



module.exports = { menuItemsRoute };