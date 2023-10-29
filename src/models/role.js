'use strict';
const {
  Model
} = require('sequelize');

const { Enums } = require('../utils/common');
const { ADMIN,CUSTOMER,FLIGHT_COMPANY} = Enums.USERS_ROLES;
module.exports = (sequelize, DataTypes) => {
  class role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsToMany(models.User, {through: 'User_Roles' ,as : 'user' });
    }
  }
  role.init({
    name: {
      type: DataTypes.ENUM({
        values: [ADMIN,CUSTOMER.FLIGHT_COMPANY],
      }),
      allowNull: false,
      defaultValue:CUSTOMER
    }
      
  }, 
  {
    sequelize,
    modelName: 'role',
  });
  return role;
};