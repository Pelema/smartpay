var DataTypes = require("sequelize").DataTypes;
var _address = require("./address");
var _admins = require("./admins");
var _bank = require("./bank");
var _business_account = require("./business_account");
var _business_account_info = require("./business_account_info");
var _business_contact_details = require("./business_contact_details");
var _client_account_info = require("./client_account_info");
var _client_contact_details = require("./client_contact_details");
var _client_details = require("./client_details");
var _contract_details = require("./contract_details");
var _debit_dates = require("./debit_dates");
var _roles = require("./roles");
var _users = require("./users");

function initModels(sequelize) {
  var address = _address(sequelize, DataTypes);
  var admins = _admins(sequelize, DataTypes);
  var bank = _bank(sequelize, DataTypes);
  var business_account = _business_account(sequelize, DataTypes);
  var business_account_info = _business_account_info(sequelize, DataTypes);
  var business_contact_details = _business_contact_details(
    sequelize,
    DataTypes
  );
  var client_account_info = _client_account_info(sequelize, DataTypes);
  var client_contact_details = _client_contact_details(sequelize, DataTypes);
  var client_details = _client_details(sequelize, DataTypes);
  var contract_details = _contract_details(sequelize, DataTypes);
  var debit_dates = _debit_dates(sequelize, DataTypes);
  var roles = _roles(sequelize, DataTypes);
  var users = _users(sequelize, DataTypes);

  business_account_info.belongsTo(bank, { as: "bank", foreignKey: "bankID" });
  bank.hasMany(business_account_info, {
    as: "business_account_infos",
    foreignKey: "bankID",
  });
  client_account_info.belongsTo(bank, { as: "bank", foreignKey: "bankID" });
  bank.hasMany(client_account_info, {
    as: "client_account_infos",
    foreignKey: "bankID",
  });
  address.belongsTo(business_account, {
    as: "business",
    foreignKey: "businessID",
  });
  business_account.hasMany(address, {
    as: "addresses",
    foreignKey: "businessID",
  });
  business_account_info.belongsTo(business_account, {
    as: "business",
    foreignKey: "businessID",
  });
  business_account.hasMany(business_account_info, {
    as: "business_account_infos",
    foreignKey: "businessID",
  });
  business_contact_details.belongsTo(business_account, {
    as: "business",
    foreignKey: "businessID",
  });
  business_account.hasMany(business_contact_details, {
    as: "business_contact_details",
    foreignKey: "businessID",
  });
  client_details.belongsTo(business_account, {
    as: "business",
    foreignKey: "businessID",
  });
  business_account.hasMany(client_details, {
    as: "client_details",
    foreignKey: "businessID",
  });
  client_account_info.belongsTo(client_details, {
    as: "client",
    foreignKey: "clientID",
  });
  client_details.hasMany(client_account_info, {
    as: "client_account_infos",
    foreignKey: "clientID",
  });
  client_contact_details.belongsTo(client_details, {
    as: "client",
    foreignKey: "clientID",
  });
  client_details.hasMany(client_contact_details, {
    as: "client_contact_details",
    foreignKey: "clientID",
  });
  contract_details.belongsTo(client_details, {
    as: "client",
    foreignKey: "clientID",
  });
  client_details.hasMany(contract_details, {
    as: "contract_details",
    foreignKey: "clientID",
  });
  debit_dates.belongsTo(contract_details, {
    as: "contract",
    foreignKey: "contractID",
  });
  contract_details.hasMany(debit_dates, {
    as: "debit_dates",
    foreignKey: "contractID",
  });
  users.belongsTo(roles, { as: "role", foreignKey: "roleID" });
  roles.hasMany(users, { as: "users", foreignKey: "roleID" });
  admins.belongsTo(users, { as: "user", foreignKey: "userID" });
  users.hasMany(admins, { as: "admins", foreignKey: "userID" });
  business_account.belongsTo(users, { as: "user", foreignKey: "userID" });
  users.hasMany(business_account, {
    as: "business_accounts",
    foreignKey: "userID",
  });

  return {
    address,
    admins,
    bank,
    business_account,
    business_account_info,
    business_contact_details,
    client_account_info,
    client_contact_details,
    client_details,
    contract_details,
    debit_dates,
    roles,
    users,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
