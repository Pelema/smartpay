const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('business_account_info', {
    businessID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'business_account',
        key: 'businessID'
      }
    },
    accountID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    bankID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'bank',
        key: 'bankID'
      }
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
    }
  }, {
    sequelize,
    tableName: 'business_account_info',
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
        name: "fk_business_account_info_business_account1_idx",
        using: "BTREE",
        fields: [
          { name: "businessID" },
        ]
      },
      {
        name: "fk_business_account_info_bank1_idx",
        using: "BTREE",
        fields: [
          { name: "bankID" },
        ]
      },
    ]
  });
};
