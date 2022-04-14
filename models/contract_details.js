const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  return sequelize.define("contract_details", {
    clientID: {
      type: DataTypes.STRING(50),
      allowNull: false,
      references: {
        model: "client_details",
        key: "client_id",
      },
    },
    contractID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    manualContractID: {
      type: DataTypes.STRING(45),
      allowNull: true,
      unique: "manualContractID_UNIQUE",
    },
    paymentMethod: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
    installmentAmount: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
    installmentDates: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
    noInstallment: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
    dateOfirstInstallment: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    tracking: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
    collectionReason: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
  });
};
