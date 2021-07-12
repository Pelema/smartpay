const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('address', {
    businessID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'business_account',
        key: 'businessID'
      }
    },
    addressID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    postalAddress: {
      type: DataTypes.STRING(150),
      allowNull: false
    },
    location: {
      type: DataTypes.STRING(150),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'address',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "addressID" },
        ]
      },
      {
        name: "fk_address_business_account1_idx",
        using: "BTREE",
        fields: [
          { name: "businessID" },
        ]
      },
      {
        name: "fk_address_business_account1_idx1",
        using: "BTREE",
        fields: [
          { name: "businessID" },
        ]
      },
    ]
  });
};
