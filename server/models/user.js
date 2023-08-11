'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
const {hashPassword} = require('../helpers/jwt')

  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Cart, {foreignKey: "UserId"})
    }
  }
  User.init({
    username: {
      type: DataTypes.STRING,
      unique: {
        msg: 'Username must be unique'
      },
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Username is required'
        },
        notNull: {
          msg: 'Username is required'
        },
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Username is required'
        },
        notNull: {
          msg: 'Username is required'
        },
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  User.beforeCreate((user) => {
    user.password = hashPassword(user.password)
  })
  return User;
};