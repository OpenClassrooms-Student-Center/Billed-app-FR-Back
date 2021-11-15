'use strict';
const {
  Model
} = require('sequelize');
const short = require('short-uuid');
module.exports = (sequelize, DataTypes) => {
  class Bill extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Bill.init({
    vat: DataTypes.NUMBER,
    status: DataTypes.STRING,
    type: DataTypes.STRING,
    commentary: DataTypes.STRING,
    name: DataTypes.STRING,
    fileName: DataTypes.STRING,
    filePath: DataTypes.STRING,
    date: DataTypes.STRING,
    amount: DataTypes.NUMBER,
    commentAdmin: DataTypes.STRING,
    pct: DataTypes.NUMBER,
    email: DataTypes.STRING,
    key: { type: DataTypes.STRING, defaultValue: short.generate },
  }, {
    sequelize,
    modelName: 'Bill',
  });
  return Bill;
};