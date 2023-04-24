"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Wood extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Wood.belongsTo(models.Type, { foreignKey: "typeId" });
      Wood.belongsTo(models.Hardness, { foreignKey: "hardnessId" });
    }
  }
  Wood.init(
    {
      name: DataTypes.STRING,
      typeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Type",
          key: "id",
        },
      },
      hardnessId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Hardness",
          key: "id",
        },
      },
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
};
