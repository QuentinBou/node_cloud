/* eslint-disable new-cap */
const express = require('express');
const router = express.Router();
const woodController = require('../controllers/wood.controller');
const auth = require('../middleware/auth.middleware');
const multer = require('../middleware/multer.middleware');

router.get('/', auth, woodController.getWoods);
router.post('/', auth, multer, woodController.createWood);
router.get('/:id', auth, woodController.getWoodById);
router.put('/:id', auth, multer, woodController.updateWood);
router.delete('/:id', auth, woodController.deleteWood);
router.get('/hardness/:hardnessId', auth, woodController.getWoodByHardness);
router.get('/type/:typeId', auth, woodController.getWoodByType);

module.exports = router;
