const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('business_contact_details', {
    businessID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'business_account',
        key: 'businessID'
      }
    },
    businessContactID: {
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
      allowNull: false
    },
    email2: {
      type: DataTypes.STRING(50),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'business_contact_details',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "businessContactID" },
        ]
      },
      {
        name: "fk_business_contact_details_business_account1_idx",
        using: "BTREE",
        fields: [
          { name: "businessID" },
        ]
      },
    ]
  });
};
