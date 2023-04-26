/* eslint-disable valid-jsdoc */
/* eslint-disable require-jsdoc */
'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Type extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Type.hasMany(models.Wood, {
        foreignKey: 'typeId',
        as: 'woods',
      });
    }
  }
  Type.init(
      {
        name: DataTypes.STRING,
      },
      {
        sequelize,
        modelName: 'Type',
      },
  );
  return Type;
};
