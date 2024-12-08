'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Vendas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Vendas.init({
    produto: DataTypes.STRING,
    preco: DataTypes.FLOAT,
    qtd: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Vendas',
  });
  return Vendas;
};