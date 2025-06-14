const { default: mongoose } = require("mongoose");
const Menu = require("../models/Menu");

const getAllMenuItems = async(req, res) => {
    try {
        const menus = await Menu.find({}).sort({createdAt: -1});
        res.status(200).json(menus)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// post a new menu item
const postMenuItem = async (req, res) => {
  try {
    const { name, category, price, recipe } = req.body;

    const newItem = await Menu.create({
      name,
      category,
      price,
      recipe,
      image: req.file.path, // this is Cloudinary secure_url
    });

    res.status(201).json({
      message: "Menu item added successfully",
      item: newItem,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// delete a menu item
const deleteMenuItem = async(req, res) => {
    const menuId = req.params.id;
    //console.log(menuId)
    console.log("menuId =", menuId, "typeof =", typeof menuId);

    try {
      const deletedItem = await Menu.findOneAndDelete({ _id: menuId.toString() });


        // console.log(deletedItem);

        if(!deletedItem){
            return res.status(404).json({ message:"Menu not found"})
        }
        res.status(200).json({message: "Menu Item deleted successfully!"})
        
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// get single menu item
const singleMenuItem = async (req, res) => {
    const menuId = req.params.id;
    try {
        const menu = await Menu.findById(menuId);
        res.status(200).json(menu)
        
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// update single menu item
const updateMenuItem = async (req, res) => {
    const menuId = req.params.id;
    const { name, recipe, image, category, price} = req.body;
    try {
        const updatedMenu = await Menu.findByIdAndUpdate(menuId, 
            { name, recipe, image, category, price}, 
            {new: true, runValidator: true}
            );

        if(!updatedMenu) {
            return res.status(404).json({ message:"Menu not found"})
        }

        res.status(200).json(updatedMenu)
        
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



module.exports = {
    getAllMenuItems,
    postMenuItem, 
    deleteMenuItem,
    singleMenuItem,
    updateMenuItem
}