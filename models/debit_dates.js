const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('debit_dates', {
    ID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    contractID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'contract_details',
        key: 'contractID'
      }
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    debitNumber: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'debit_dates',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "ID" },
        ]
      },
      {
        name: "fk_contractID_contract_details_debit_dates_idx",
        using: "BTREE",
        fields: [
          { name: "contractID" },
        ]
      },
    ]
  });
};
