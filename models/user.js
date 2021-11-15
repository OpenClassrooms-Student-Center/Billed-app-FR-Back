'use strict';
const {
  Model
} = require('sequelize');
const short = require('short-uuid');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    type: DataTypes.STRING,
    password: DataTypes.STRING,
    status: DataTypes.STRING,
    key: { type: DataTypes.STRING, defaultValue: short.generate },
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};