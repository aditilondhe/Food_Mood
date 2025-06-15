const express = require("express");
const Menu = require("../models/Menu");
const router = express.Router();
const { upload } =  require('../../config/cloudinary');
const menuController = require('../controllers/menuControllers')

// get all menu items 

router.get('/', menuController.getAllMenuItems )

// post a menu item
router.post('/',upload.single("image"), menuController.postMenuItem);

// delete a menu item
router.delete('/:id', menuController.deleteMenuItem);

// get single menu item
router.get('/:id', menuController.singleMenuItem);

// update single menu item
router.patch('/:id',upload.single("image"), menuController.updateMenuItem)

module.exports= router;