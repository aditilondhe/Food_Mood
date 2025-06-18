const express = require("express");
const Menu = require("../models/Menu");
const router = express.Router();
const { upload } =  require('../../config/cloudinary');
const menuController = require('../controllers/menuControllers')


router.get('/', menuController.getAllMenuItems )
router.post('/',upload.single("image"), menuController.postMenuItem);
router.delete('/:id', menuController.deleteMenuItem);
router.get('/:id', menuController.singleMenuItem);
router.patch('/:id',upload.single("image"), menuController.updateMenuItem)

module.exports= router;