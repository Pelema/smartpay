const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class FooBar extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  FooBar.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
     first_name: DataTypes.STRING,
     last_name: DataTypes.STRING,
     email: DataTypes.STRING,
     date_created: DataTypes.DATE,
     date_updated: DataTypes.DATE
    },
    {
      // options
      sequelize,
      modelName: 'FooBar',
      tableName: 'foo_bars',
      createdAt: 'date_created',
      updatedAt: 'date_updated',
      underscore: true,
    },
  );
  return FooBar;
};