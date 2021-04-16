// const { User } = require("./models");
var bcrypt = require('bcryptjs');
const jsonwebtoken = require("jsonwebtoken");

// const JWT_SECRET = require("./constants");

const resolvers = {
    Query: {
        async current(_, args, { user, connection }) {
            if (user) {
                // return await User.findOne({ where: { id: user.id } });
                return "user"
            }
            throw new Error("Sorry, you're not an authenticated user!");
        }
    },

    Mutation: {
        register(_, { username, password, email }, { connection }) {
            var hash = bcrypt.hashSync(password, 12);
            vals = {username, email, password: hash}
            return connection.query('INSERT INTO users SET ?', vals,function (error, results) {
                if (error) throw error;

                console.log(results)

                return jsonwebtoken.sign({ id: "user.id", login: "user.login" }, "JWT_SECRET", {
                    expiresIn: "3m",
                });
            });

        },

        async login(_, { username, password }) {

            return connection.query('SELECT username, password FROM users WHERE username ==' + username, async (error, results, fields) => {
                if (error) throw error;

                if (!results) {
                    throw new Error(
                        "This user doesn't exist."
                    )
                }

                const valid = await bcrypt.compare(password, result.password);

                if (!valid) {
                    throw new Error("Your password is incorrect!");
                }

                return jsonwebtoken.sign({ id: "user.id", login: "user.login" }, "JWT_SECRET", {
                    expiresIn: "1d",
                });
            });

        },

        async registerBusiness(_, __, { user, transaction }) {
            regInfo = __.regInfo
            bizVals = [[regInfo.name, regInfo.regNumber,
            regInfo.bizAbbr
            ]]

            contactVals = [[
                regInfo.cell,
                regInfo.bizEmail
            ]]

            addrVals = [[
                regInfo.postalAddr, regInfo.address,
            ]]

            accVals = [[
                businessID, regInfo.bankAccName, regInfo.bankAccType, regInfo.bankAccNumber
            ]]

                .query('INSERT INTO business_contact_details(cellphoneNo, email, businessID)  VALUES ?', contactVals, function (error, results) {

                })

                .query('INSERT INTO address(location, postalAddress, businessID)  VALUES ?', addrVals, function (error, results) {

                })

                .query('INSERT INTO business_account_info(bankID, businessID, accountName, bankAccType, accountNo)  VALUES ?', accVals, function (error, results) {

                });

            transactions.query('INSERT INTO business_account(userID, businessName, businessRegistrationNumber, abbreviatedBusinessName)  VALUES ?', regInfo, function (error, results) {

                if (err) {
                    transactions.rollback();
                    return console.log('Rolled back.');
                }


                return transactions.commit(function (err, result) {
                    return console.log('Committed.');
                });

            });
        },

        async createClient(_, __, { user, transaction }) {
            clientDet = __.clientDet

            //client general details
            detVals = [[clientDet.name]]

            //client account contact details
            accVals = [[clientDet.bank, clientDet.bankAccName, clientDet.bankAccNumber, clientDet.bankAccType, clientDet.biCode]]

            //client contact details
            contactVals = [[clientDet.cell, clientDet.email]]

            

            transactions.query('INSERT INTO client_details(clientFullname, businessID)  VALUES ?', function (err, result) {

            })
            .query('INSERT INTO client_account_info(clientID, accountName, bankAccType, accountNo, biCode)  VALUES ?', function (err, result) {

            })
            .query('INSERT INTO client_contact_details(clientID, email, cellphoneNo )  VALUES ?', function (err, result) {

                if (err) {
                    transactions.rollback();
                    return console.log('Rolled back.');
                }


                transactions.commit(function (err, result) {
                    console.log('Committed.');
                });

            });
        },

        async createContract(_, __, { user, connection }) {
            contractDet = __.contractDet
            contractVals = [[payMethod, noInstallment, 
                            installmentAmount, installmentDates,
                            dateOfirstInstallment, tracking,
                            collectionReason
                        ]]

            await connection.query('INSERT INTO users(clientID, noInstallment, paymentMethod, installmentAmount, installmentDates, dateOfirstInstallment, tracking, collectionReason ) VALUES?', contactVals, function (error, results, fields) {
                if (error) throw error;

                console.log(results)
            });
        },

    }
}

module.exports = resolvers;