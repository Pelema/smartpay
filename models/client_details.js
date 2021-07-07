const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('client_details', {
    clientIDNo: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: "clientIDNo_UNIQUE"
    },
    client_id: {
      type: DataTypes.STRING(50),
      allowNull: false,
      primaryKey: true
    },
    clientFullname: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    businessID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'business_account',
        key: 'businessID'
      }
    }
  }, {
    sequelize,
    tableName: 'client_details',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "client_id" },
        ]
      },
      {
        name: "clientIDNo_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "clientIDNo" },
        ]
      },
      {
        name: "fk_client_details_business_account1_idx",
        using: "BTREE",
        fields: [
          { name: "businessID" },
        ]
      },
    ]
  });
};
