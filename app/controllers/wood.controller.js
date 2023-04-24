const { Wood } = require("../models/index");

exports.getWoods = async (req, res) => {
  const woods = await Wood.findAll();

  if (!woods) {
    return res.status(400).json({ message: "Woods not found" });
  } else {
    return res.status(200).json(woods);
  }
};

exports.getWoodByHardness = async (req, res) => {
  const wood = await Wood.findAll({ where: { hardness: req.params.hardness } });

  if (!wood) {
    return res.status(400).json({ message: "Wood not found" });
  } else {
    return res.status(200).json(wood);
  }
};

exports.createWood = async (req, res) => {
  let newWood = {
    ...JSON.parse(req.body.datas),
  } 
  if (req.file) {
    const pathname = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
    newWood = {
      ...newWood,
      image: pathname,
    };
  }

  const createdWood = await Wood.create(newWood);

  if (!createdWood) {
    return res.status(400).json({ message: "Wood can not be created" });
  } else {
    await createdWood.save();
    return res.status(201).json(createdWood);
  }
}
