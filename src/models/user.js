'use strict';

const {
  Model
} = require('sequelize');

const bcrypt = require('bcrypt');
const { serverConfig } = require('../config');
const e = require('express');
 
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsToMany(models.role, {through: 'User_Roles' ,as : 'role' });
    }
  }
  User.init({
    email: {
      type:DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate:{
        isEmail:true
      }
    
    },
    pasword: {
      type:DataTypes.STRING,
      allowNull: false,
      validate:{
        len:[3, 50]
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  });

  User.beforeCreate(function encrypt(user)
  {
  
    const encryptedPassword = bcrypt.hashSync(user.pasword, +serverConfig.SALT_ROUNDS);
    user.pasword = encryptedPassword;

  })
  return User;
};