var bcrypt = require("bcryptjs");
const jsonwebtoken = require("jsonwebtoken");
const { QueryTypes } = require("sequelize");

// const JWT_SECRET = require("./constants");

const resolvers = {
  Query: {
    businessClients(_, {}, { db, user }) {
      return db
        .query(
          `SELECT distinct cd.clientFullname, cd.client_id, ccd.cellphoneNo, ccd.email, bai.bankName, cai.accountName, cai.accountNo, cai.bankAccType, bai.bicCode, ctd.noOfContracts,ctd.sumAmount
            FROM client_details cd
            LEFT JOIN client_account_info cai
            ON cd.client_id = cai.clientID
            LEFT JOIN client_contact_details ccd
            ON cai.clientID = ccd.clientID
            left JOIN (
            SELECT clientID,COUNT(*) AS noOfContracts,
            SUM(installmentAmount) AS sumAmount
            FROM contract_details
            GROUP BY clientID) ctd
            ON ctd.clientID=cd.client_id
            left join bank as bai
            on cai.bankID = bai.bankID
            left join
            business_account AS ba
            on ba.businessID = cd.businessID
            where ba.businessID = ?`,
          {
            replacements: [user.businessID],
            type: QueryTypes.SELECT,
          }
        )
        .then((result) => {
          var list = [];
          result.forEach((el) => {
            if (!el.noOfContracts) {
              el.noOfContracts = 0;
              el.sumAmount = 0;
            }
            list.push({
              name: el.clientFullname,
              id: el.client_id,
              cell: el.cellphoneNo,
              email: el.email,
              bankName: el.bankName,
              bankAccName: el.accountName,
              bankAccNumber: el.accountNo,
              bankAccType: el.bankAccType,
              biCode: el.bicCode,
              noContract: el.noOfContracts,
              installmentAmount: el.sumAmount,
            });
          });

          return list;
        })
        .catch((error) => {
          throw error;
        });
    },
    getContract(_, { clientID }, { db, user }) {
      return db
        .query("SELECT * FROM contract_details WHERE clientID =?", {
          replacements: [clientID + ""],
          type: QueryTypes.SELECT,
        })
        .then((result) => {
          console.log(result, " ##########");
          return result;
        })
        .catch((error) => {
          throw error;
        });
    },

    getEditableContract(_, { contractID }, { db, user }) {
      return db
        .query("SELECT * FROM contract_details WHERE contractID =?", {
          replacements: [contractID],
          type: QueryTypes.SELECT,
        })
        .then((result) => {
          return result;
        })
        .catch((error) => {
          throw error;
        });
    },

    getTransactions(_, { start, end }, { db, user }) {
      return db
        .query(
          `SELECT dd.date, ctd.clientID, cd.clientFullname, ctd.paymentMethod, ctd.noInstallment, ctd.installmentAmount, ctd.dateOfirstInstallment, ctd.tracking, ctd.installmentDates, ctd.collectionReason, ctd.contractID
            FROM debit_dates as dd
            left join contract_details as ctd
            on dd.contractID = ctd.contractID
            left join client_account_info as cai
            on ctd.clientID = cai.clientID
            left join client_details as cd
            on cai.clientID = cd.client_id
            left join business_account as ba
            on ba.businessID = cd.businessID
            where (dd.date BETWEEN ? AND ?)
            and ba.businessID = ?`,
          {
            replacements: [start, end, user.businessID],
            type: QueryTypes.SELECT,
          }
        )
        .then((result) => {
          return result;
        })
        .catch((error) => {
          throw error;
        });
    },
  },

  Mutation: {
    register(_, { username, password, email }, { db }) {
      var hash = bcrypt.hashSync(password, 12);
      console.log("phase1");
      return db
        .query(
          "INSERT INTO users SET username = :username, password = :password, email = :email, roleID = :roleID",
          {
            replacements: { username, email, password: hash, roleID: 2 },
            type: QueryTypes.INSERT,
          }
        )
        .then((result) => {
          console.log("phase2");
          return jsonwebtoken.sign({ userID: result.insertId }, "JWT_SECRET", {
            expiresIn: "1d",
          });
        })
        .catch((error) => {
          throw error;
        });
    },

    async login(_, { username, password }, { db }) {
      var temp_userID;
      const t = await db.transaction();
      return db
        .query(
          "SELECT userID, username, password FROM users WHERE username=?",
          {
            replacements: [username],
            type: QueryTypes.SELECT,
            transaction: t,
          }
        )
        .then((res) => {
          if (!res.length) {
            throw new Error("This user doesn't exist.");
          }
          return res[0];
        })
        .then((res) => {
          temp_userID = res.userID;
          return bcrypt.compare(password, res.password);
        })
        .then((res) => {
          if (!res) {
            throw new Error("Your password is incorrect!");
          }
          return db.query(
            "SELECT businessName, businessID FROM business_account WHERE userID=?",
            {
              replacements: [temp_userID],
              type: QueryTypes.SELECT,
              transaction: t,
            }
          );
        })
        .then((res) => {
          if (!res.length) {
            return {
              token: jsonwebtoken.sign({ userID: temp_userID }, "JWT_SECRET", {
                expiresIn: "1d",
              }),
              businessName: null,
            };
          }

          return {
            token: jsonwebtoken.sign(
              { userID: temp_userID, businessID: res[0].businessID },
              "JWT_SECRET",
              { expiresIn: "1d" }
            ),
            businessName: res[0].businessName,
          };
        })
        .catch((err) => {
          throw err;
        });
    },

    async registerBusiness(_, regInfo, { user, db }) {
      const t = await db.transaction();

      return db
        .query(
          `INSERT INTO business_account 
                             SET userID = :userID, 
                             businessName = :businessName, 
                             businessRegistrationNumber = :businessRegistrationNumber, 
                             abbreviatedBusinessName = :abbreviatedBusinessName`,
          {
            replacements: {
              userID: user.userID,
              businessName: regInfo.name,
              businessRegistrationNumber: regInfo.regNumber,
              abbreviatedBusinessName: regInfo.bizAbbr,
            },
            type: QueryTypes.INSERT,
            transaction: t,
          }
        )
        .then((result) => {
          contactVals.businessID = result.insertId;
          addrVals.businessID = result.insertId;
          accVals.businessID = result.insertId;
          return db.query(
            `INSERT INTO business_contact_details 
                                 SET businessID = :businessID, 
                                 cellphoneNo = :cellphoneNo,
                                 email = :email`,
            {
              replacements: {
                businessID: null,
                cellphoneNo: regInfo.cell,
                email: regInfo.bizEmail,
              },
              type: QueryTypes.INSERT,
              transaction: t,
            }
          );
        })
        .then(() => {
          return db.query(
            `INSERT INTO address 
                                 SET location = :location,
                                 postalAddress = :postalAddress,
                                 businessID = :businessID`,
            {
              replacements: {
                location: regInfo.address,
                postalAddress: regInfo.postalAddr,
                businessID: null,
              },
              type: QueryTypes.INSERT,
              transaction: t,
            }
          );
        })
        .then(() => {
          return db.query(
            `INSERT INTO business_account_info 
                                 SET bankID = :bankID, 
                                 businessID = :businessID, 
                                 accountName = :accountName, 
                                 bankAccType = :bankAccType, 
                                 accountNo = :accountNo`,
            {
              replacements: {
                bankID: 3,
                businessID: null,
                accountName: regInfo.bankAccName,
                bankAccType: regInfo.bankAccType,
                accountNo: regInfo.bankAccNumber,
              },
              type: QueryTypes.INSERT,
              transaction: t,
            }
          );
        })
        .then(() => {
          return t.commit();
        })
        .then(() => {
          return jsonwebtoken.sign(
            { userID: user.userID, businessID: contactVals.businessID },
            "JWT_SECRET",
            {
              expiresIn: "1d",
            }
          );
        })
        .catch((error) => {
          t.rollback();
          throw error;
        });
    },

    async createClient(_, clientDet, { user, db }) {
      const t = await db.transaction();

      return db
        .query(
          "INSERT INTO client_details SET clientFullname = :clientFullname, businessID = :businessID, client_id = :client_id",
          {
            replacements: {
              clientFullname: clientDet.name,
              businessID: user.businessID,
              client_id: clientDet.clientNumber,
            },
            type: QueryTypes.INSERT,
            transaction: t,
          }
        )
        .then((result) => {
          return db.query(
            "INSERT INTO client_account_info SET clientID = :clientID, accountName = :accountName, bankAccType = :bankAccType, accountNo = :accountNo, biCode = :biCode, bankID = :bankID",
            {
              replacements: {
                clientID: clientDet.clientNumber,
                accountName: clientDet.bankAccName,
                bankAccType: clientDet.bankAccType,
                accountNo: clientDet.bankAccNumber,
                biCode: clientDet.biCode,
                bankID: clientDet.bank,
              },
              type: QueryTypes.INSERT,
              transaction: t,
            }
          );
        })
        .then(() => {
          return db.query(
            "INSERT INTO client_contact_details SET clientID = :clientID, email = :email, cellphoneNo = :cellphoneNo",
            {
              replacements: {
                clientID: clientDet.clientNumber,
                email: clientDet.email,
                cellphoneNo: clientDet.cell,
              },
              type: QueryTypes.INSERT,
              transaction: t,
            }
          );
        })
        .then(() => {
          return t.commit();
        })
        .then(() => {
          return "";
        })
        .catch((error) => {
          t.rollback();
          throw error;
        });
    },

    async editClientDetails(_, clientDet, { user, db }) {
      const t = await db.transaction();
      return db
        .query(
          `UPDATE client_details SET
                client_id = ?,
                clientFullname = ?
                WHERE client_id = ? `,
          {
            replacements: [
              clientDet.clientNumber,
              clientDet.name,
              clientDet.clientNumber,
            ],
            type: QueryTypes.UPDATE,
            transaction: t,
          }
        )
        .then((result) => {
          return db.query(
            `UPDATE client_account_info SET
                bankID = ?,
                accountName = ?,
                bankAccType = ?,
                accountNo = ?,
                biCode = ?
                WHERE clientID = ?`,
            {
              replacements: [
                clientDet.bank,
                clientDet.bankAccName,
                clientDet.bankAccNumber,
                clientDet.bankAccType,
                clientDet.biCode,
                clientDet.clientNumber,
              ],
              type: QueryTypes.UPDATE,
              transaction: t,
            }
          );
        })
        .then(() => {
          return db.query(
            `UPDATE client_contact_details SET
                cellphoneNo = ?,
                email = ?
                WHERE clientID = ?`,
            {
              replacements: [
                clientDet.cell,
                clientDet.email,
                clientDet.clientNumber,
              ],
              type: QueryTypes.UPDATE,
              transaction: t,
            }
          );
        })
        .then(() => {
          return t.commit();
        })
        .then(() => {
          return "";
        })
        .catch((error) => {
          t.rollback();
          throw error;
        });
    },

    async createContract(
      _,
      {
        clientID,
        paymentMethod,
        noInstallment,
        dateOfirstInstallment,
        installmentAmount,
        tracking,
        installmentDates,
        manualContractID,
        collectionReason,
      },
      { user, db, dbModel }
    ) {
      let debitDates = [];

      const t = await db.transaction();

      dbModel.contract_details
        .create(
          {
            clientID,
            paymentMethod,
            noInstallment,
            dateOfirstInstallment,
            installmentAmount,
            tracking,
            installmentDates,
            manualContractID,
            collectionReason,
          },
          { transaction: t }
        )
        .then((res) => {
          switch (installmentDates.toLowerCase()) {
            case "weekly":
              for (let i = 0; i < noInstallment; i++) {
                debitDates.push({
                  date: new Date(dateOfirstInstallment).setDate(
                    new Date(dateOfirstInstallment).getDate() + 7 * i
                  ),
                  contractID: res.contractID,
                });
              }
              break;
            case "monthly":
              for (let i = 0; i < noInstallment; i++) {
                debitDates.push({
                  date: new Date(dateOfirstInstallment).setMonth(
                    new Date(dateOfirstInstallment).getMonth() + i
                  ),
                  contractID: res.contractID,
                });
              }
              break;
            default:
              debitDates.push({
                date: new Date(dateOfirstInstallment),
                contractID: res.contractID,
              });
              break;
          }
          return dbModel.debit_dates.bulkCreate(debitDates, { transaction: t });
        })
        .then((res) => {
          t.commit();
          return "Contract created";
        })
        .catch((err) => {
          t.rollback();
          throw error;
        });
    },

    editContract(_, contractVals, { user, db }) {
      return db
        .query(
          `UPDATE contract_details
                SET paymentMethod = ?,
                    installmentAmount = ?,
                    installmentDates = ?,
                    noInstallment = ?,
                    dateOfirstInstallment = ?,
                    tracking = ?,
                    collectionReason = ?,
                    manualContractID = ?
                WHERE contractID = ?`,
          {
            replacements: [
              contractVals.paymentMethod,
              contractVals.installmentAmount,
              contractVals.installmentDates,
              contractVals.noInstallment,
              contractVals.dateOfirstInstallment,
              contractVals.tracking,
              contractVals.collectionReason,
              contractVals.manualContractID,
              contractVals.contractID,
            ],
            type: QueryTypes.UPDATE,
          }
        )
        .then((res) => {
          return "Contract edited";
        })
        .catch((error) => {
          throw error;
        });
    },

    // Check this one carefully please
    deleteContract(_, { contractID }, { user, db }) {
      return db
        .query(`DELETE FROM contract_details where contractID = ?`, {
          replacements: [contractID],
          type: QueryTypes.DELETE,
        })
        .then((res) => {
          if (res.affectedRows == 1) return "Contract deleted";
          {
            throw new Error(
              "Contract could not be deleted, Something went wrong"
            );
          }
        })
        .catch((error) => {
          throw error;
        });
    },
  },
};

module.exports = resolvers;
