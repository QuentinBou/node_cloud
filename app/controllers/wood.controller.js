const {Wood, Type, Hardness} = require('../models');
const {handleErrors, deleteImage} = require('../utils/wood.utils');
const fs = require('fs');
const logger = require('../utils/logger.utils');
const {addLinksToWoods, addLinksToWood} = require('../utils/links.utils');

const attributesToExclude = {exclude: ['typeId', 'hardnessId']};
const attributesToInclude = [
  {
    model: Type,
    as: 'type',
    attributes: ['name', 'id'],
  },
  {
    model: Hardness,
    as: 'hardness',
    attributes: ['name', 'id'],
  },
];
const attributesFilter = {
  attributes: attributesToExclude,
  include: attributesToInclude,
};

exports.getWoodById = async (req, res) => {
  try {
    const wood = await Wood.findByPk(req.params.id, attributesFilter);

    const woodWithLinks = await addLinksToWood(req, wood);

    return res.status(200).json(woodWithLinks);
  } catch (error) {
    logger.error(error.message);
    return res.status(400).json({message: 'Wood not found'});
  }
};

exports.getWoods = async (req, res) => {
  try {
    const woods = await Wood.findAll(attributesFilter);

    const woodsWithLinks = await addLinksToWoods(req, woods);

    return res.status(200).json(woodsWithLinks);
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
      ...attributesFilter,
    });

    const woodsWithLinks = await addLinksToWoods(req, wood);

    return res.status(200).json(woodsWithLinks);
  } catch (error) {
    logger.error(error.message);
    return res.status(400).json({message: 'Wood not found'});
  }
};

exports.getWoodByType = async (req, res) => {
  try {
    const wood = await Wood.findAll({
      where: {
        hardnessId: req.params.typeId,
      },
      ...attributesFilter,
    });

    const woodsWithLinks = await addLinksToWoods(req, wood);

    return res.status(200).json(woodsWithLinks);
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
      const pathname = `${req.protocol}://${req.get('host')}/uploads/${
        req.file.filename
      }`;
      newWood = {
        ...newWood,
        image: pathname,
      };
    }

    const createdWood = await Wood.create(newWood);

    await createdWood.save();

    const wood = await Wood.findByPk(createdWood.id, attributesFilter);
    const woodWithLinks = await addLinksToWood(req, wood);

    logger.info(`Wood ${woodWithLinks.id} has been created`);
    return res.status(201).json(woodWithLinks);
  } catch (error) {
    logger.error(error.message);
    return res
        .status(400)
        .json(errors !== null ?
           {...errors} :
           {message: 'Wood can not be created'});
  }
};

exports.updateWood = async (req, res) => {
  let updatedWood = {
    ...JSON.parse(req.body.datas),
  };

  try {
    const wood = await Wood.findByPk(req.params.id);
    if (req.file) {
      const pathname = `${req.protocol}://${req.get('host')}/uploads/${
        req.file.filename
      }`;
      updatedWood = {
        ...updatedWood,
        image: pathname,
      };
      if (wood.image) {
        deleteImage(wood);
      }
    }

    await wood.update(updatedWood);

    updatedWood = await Wood.findByPk(req.params.id, attributesFilter);
    const woodWithLinks = await addLinksToWood(req, updatedWood);

    logger.info(`Wood ${woodWithLinks.id} has been updated`);
    return res.status(200).json(woodWithLinks);
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
