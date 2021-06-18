const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('recipients', {
    recipientName: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    recipientAccount: {
      type: DataTypes.STRING(50),
      allowNull: false,
      primaryKey: true
    },
    recipientAccType: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    biCode: {
      type: DataTypes.STRING(150),
      allowNull: false
    },
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    contractReference: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    tracking: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    abbreviatedName: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    reasonForCollection: {
      type: DataTypes.STRING(50),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'recipients',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "recipientAccount" },
        ]
      },
    ]
  });
};
