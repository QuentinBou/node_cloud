const {Wood, Type, Hardness} = require('../models');
const {handleErrors, deleteImage} = require('../utils/wood.utils');
const fs = require('fs');
const logger = require('../utils/logger.utils');

exports.getWoods = async (req, res) => {
  try {
    const woods = await Wood.findAll();
    return res.status(200).json(woods);
  } catch (error) {
    logger.error(error.message);
    return res.status(400).json({message: 'Woods not found'});
  }
};

exports.getWoodByHardness = async (req, res) => {
  try {
    const wood = await Wood.findAll({
      where: {
        hardnessId: req.params.hardnessId,
      },
    });
    return res.status(200).json(wood);
  } catch (error) {
    logger.error(error.message);
    return res.status(400).json({message: 'Wood not found'});
  }
};

exports.createWood = async (req, res) => {
  let errors = null;

  try {
    let newWood = {
      ...JSON.parse(req.body.datas),
    };

    errors = handleErrors(newWood);
    if (errors !== null) {
      throw new Error();
    }

    if (req.file) {
      const pathname = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
      newWood = {
        ...newWood,
        image: pathname,
      };
    }

    const type = await Type.findByPk(newWood.typeId);
    const hardness = await Hardness.findByPk(newWood.hardnessId);
    const createdWood = await Wood.create(newWood);

    await createdWood.setType(type);
    await createdWood.setHardness(hardness);

    logger.info(`Wood ${createdWood.id} has been created`);
    return res.status(201).json(createdWood);
  } catch (error) {
    logger.error(error.message);
    return res.status(400).json({...errors} ||
       {message: 'Wood can not be created'});
  }
};

exports.updateWood = async (req, res) => {
  let updatedWood = {
    ...JSON.parse(req.body.datas),
  };

  try {
    const type = await Type.findByPk(updatedWood.typeId);
    const hardness = await Hardness.findByPk(updatedWood.hardnessId);
    const wood = await Wood.findByPk(req.params.id);

    if (req.file) {
      const pathname = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
      updatedWood = {
        ...updatedWood,
        image: pathname,
      };
      if (wood.image) {
        deleteImage(wood);
      }
    } else if (!req.file && wood.image) {
      deleteImage(wood);
    }

    await wood.update(updatedWood);
    await wood.setType(type);
    await wood.setHardness(hardness);

    logger.info(`Wood ${wood.id} has been updated`);
    return res.status(200).json(wood);
  } catch (error) {
    logger.error(error.message);
    return res.status(400).json({message: 'Wood can not be updated'});
  }
};

exports.deleteWood = async (req, res) => {
  try {
    const wood = await Wood.findByPk(req.params.id);

    if (wood.image) {
      const filename = wood.image.split('/uploads/')[1];
      fs.unlink(`uploads/${filename}`, (err) => {
        if (err) {
          console.log(err);
        }
      });
    }

    await wood.destroy();

    logger.info(`Wood ${wood.id} has been deleted`);
    return res.status(200).json({message: 'Wood deleted'});
  } catch (error) {
    logger.error(error.message);
    return res.status(400).json({message: 'Wood can not be deleted'});
  }
};
