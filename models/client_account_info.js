const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('client_account_info', {
    clientID: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    bankID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'bank',
        key: 'bankID'
      }
    },
    accountID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    accountName: {
      type: DataTypes.STRING(150),
      allowNull: false
    },
    bankAccType: {
      type: DataTypes.STRING(150),
      allowNull: false
    },
    accountNo: {
      type: DataTypes.STRING(150),
      allowNull: false
    },
    biCode: {
      type: DataTypes.STRING(150),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'client_account_info',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "accountID" },
        ]
      },
      {
        name: "fk_client_account_info_bank1_idx",
        using: "BTREE",
        fields: [
          { name: "bankID" },
        ]
      },
      {
        name: "fk_client_account_info_client_details_idx",
        using: "BTREE",
        fields: [
          { name: "clientID" },
        ]
      },
    ]
  });
};
