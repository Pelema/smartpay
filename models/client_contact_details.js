const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('client_contact_details', {
    clientID: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    clientContactID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    cellphoneNo: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    cellphoneNo2: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    email2: {
      type: DataTypes.STRING(50),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'client_contact_details',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "clientContactID" },
        ]
      },
      {
        name: "fk_client_contact_details_idx",
        using: "BTREE",
        fields: [
          { name: "clientID" },
        ]
      },
    ]
  });
};
