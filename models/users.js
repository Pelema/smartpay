const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('users', {
    userID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    roleID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'roles',
        key: 'roleID'
      }
    },
    username: {
      type: DataTypes.STRING(150),
      allowNull: false,
      unique: "username"
    },
    password: {
      type: DataTypes.STRING(150),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'users',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "userID" },
        ]
      },
      {
        name: "username",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "username" },
        ]
      },
      {
        name: "fk_users_roles_idx1",
        using: "BTREE",
        fields: [
          { name: "roleID" },
        ]
      },
    ]
  });
};
