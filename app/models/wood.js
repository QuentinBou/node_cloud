"use strict";
const { Model } = require("sequelize");
// A model "Wood" with a string name, a string image, and a foreign key to a "Type" and a "Hardness"
module.exports = (sequelize, DataTypes) => {
  class Wood extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Wood.belongsTo(models.Type, {
        foreignKey: "typeId",
        as: "type",
        onDelete: "CASCADE",
      });
      Wood.belongsTo(models.Hardness, {
        foreignKey: "hardnessId",
        as: "hardness",
        onDelete: "CASCADE",
      });
    }
  }
  Wood.init(
    {
      name: DataTypes.STRING,
      image: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Wood",
    }
  );
  return Wood;
}
