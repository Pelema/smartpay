const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('contract_details', {
    clientID: {
      type: DataTypes.STRING(50),
      allowNull: false,
      references: {
        model: 'client_details',
        key: 'client_id'
      }
    },
    contractID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    manuelContractID: {
      type: DataTypes.STRING(45),
      allowNull: true,
      unique: "manuelContractID_UNIQUE"
    },
    paymentMethod: {
      type: DataTypes.STRING(150),
      allowNull: false
    },
    installmentAmount: {
      type: DataTypes.STRING(150),
      allowNull: false
    },
    installmentDates: {
      type: DataTypes.STRING(150),
      allowNull: false
    },
    noInstallment: {
      type: DataTypes.STRING(150),
      allowNull: false
    },
    dateOfirstInstallment: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    tracking: {
      type: DataTypes.STRING(150),
      allowNull: false
    },
    collectionReason: {
      type: DataTypes.STRING(150),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'contract_details',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "contractID" },
        ]
      },
      {
        name: "manuelContractID_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "manuelContractID" },
        ]
      },
      {
        name: "clientID_idx",
        using: "BTREE",
        fields: [
          { name: "clientID" },
        ]
      },
    ]
  });
};
