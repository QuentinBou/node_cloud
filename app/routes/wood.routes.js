const express = require('express')
const router = express.Router()
const woodController = require("../controllers/wood.controller");
const auth = require("../middleware/auth.middleware");
const multer = require("../middleware/multer.middleware");

router.get('/',auth, woodController.getWoods);
router.get('/:hardness',auth, woodController.getWoodByHardness);
router.post('/',auth, multer, woodController.createWood);

module.exports = router;