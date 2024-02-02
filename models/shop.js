'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Shop extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Shop.init({
    name: DataTypes.STRING,
    shop_url: DataTypes.STRING,
    shopify_token: DataTypes.STRING,
    current_charge_id: DataTypes.BIGINT,
    trial_expiration_date: DataTypes.DATE,
    settings: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Shop',
  });
  return Shop;
};