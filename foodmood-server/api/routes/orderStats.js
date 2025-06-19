const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Menu = require('../models/Menu');
const Payment = require('../models/Payments'); 

// middleware
const verifyToken = require('../middlewares/verifyToken');
const verifyAdmin = require('../middlewares/verifyAdmin');

router.get('/',verifyToken, verifyAdmin, async (req, res) => {
  try {
    const result = await Payment.aggregate([
      {
    $addFields: {
      menuItems: {
        $map: {
          input: "$menuItems",
          as: "id",
          in: { $toObjectId: "$$id" }
        }
      }
    }
  },
        {
          $unwind: '$menuItems'
        },
        {
          $lookup: {
            from: 'menus', 
            localField: 'menuItems',
            foreignField: '_id',
            as: 'menuItemDetails'
          }
        },
        {
          $unwind: '$menuItemDetails'
        },
        {
          $group: {
            _id: '$menuItemDetails.category',
            quantity: { $sum: '$quantity' },
            revenue: { $sum: '$price' }
          }
        },
        {
          $project: {
            _id: 0,
            category: '$_id',
            quantity: '$quantity',
            revenue: '$revenue'
          }
        }
      ]);

    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;