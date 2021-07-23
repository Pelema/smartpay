const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('client_contact_details', {
    clientID: {
      type: DataTypes.STRING(50),
      allowNull: false,
      references: {
        model: 'client_details',
        key: 'client_id'
      },
      unique: "fk_client_id_contact_details"
    },
    client_details_client_id: {
      type: DataTypes.STRING(50),
      allowNull: false,
      references: {
        model: 'client_details',
        key: 'client_id'
      }
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
        name: "clientID_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "clientID" },
        ]
      },
      {
        name: "fk_client_contact_details_idx",
        using: "BTREE",
        fields: [
          { name: "clientID" },
        ]
      },
      {
        name: "fk_client_contact_details_client_details1_idx",
        using: "BTREE",
        fields: [
          { name: "client_details_client_id" },
        ]
      },
    ]
  });
};
