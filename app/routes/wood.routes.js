/* eslint-disable new-cap */
const express = require('express');
const router = express.Router();
const woodController = require('../controllers/wood.controller');
const auth = require('../middleware/auth.middleware');
const multer = require('../middleware/multer.middleware');

router.get('/', auth, woodController.getWoods);
router.get('/:hardnessId', auth, woodController.getWoodByHardness);
router.post('/', auth, multer, woodController.createWood);
router.put('/:id', auth, multer, woodController.updateWood);
router.delete('/:id', auth, woodController.deleteWood);

module.exports = router;
