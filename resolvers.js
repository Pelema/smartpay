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
            vals = { username, email, password: hash, roleID: 2 }

            return connection.then(conn => {
                return conn.query('INSERT INTO users SET ?', vals)
            }).then(result => {
                return jsonwebtoken.sign({ id: result.insertId, username }, "JWT_SECRET", {
                    expiresIn: "1d",
                })
            }).catch(error => {
                throw error
            })
        },

        login(_, { username, password }, { connection }) {
            return connection.then(conn => {
                return conn.query('SELECT username, password FROM users WHERE username=?', [username])
                    .then((res) => {
                        if (!res.length) {
                            throw new Error(
                                "This user doesn't exist."
                            )
                        }
                        return res[0]
                    })
                    .then(res => bcrypt.compare(password, res.password))
                    .then(res => {
                        if (!res) {
                            throw new Error("Your password is incorrect!");
                        }

                        return jsonwebtoken.sign({ id: "user.id", login: "user.login" }, "JWT_SECRET", {
                            expiresIn: "1d",
                        })
                    })
                    .catch(err => {
                        throw err
                    })
            })
        },

        registerBusiness(_, __, { user, connection }) {
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

            trans
            connection.then(conn => {
                trans = conn
                return conn.beginTransaction()
            })
                .then(() => {
                    trans.query('INSERT INTO posts SET title=?', title)
                })
                .then(() => {
                    trans.query('INSERT INTO posts SET title=?', title)
                })
                .then(() => {
                    trans.query('INSERT INTO posts SET title=?', title)
                })
                .then(() => {
                    trans.commit()
                })
                .catch(error => {
                    if (trans) {
                        trans.rollback()
                    }
                    throw error
                })

                .query('INSERT INTO business_contact_details(cellphoneNo, email, businessID)  VALUES ?', contactVals, function (error, results) {

                })

                .query('INSERT INTO address(location, postalAddress, businessID)  VALUES ?', addrVals, function (error, results) {

                })

                .query('INSERT INTO business_account_info(bankID, businessID, accountName, bankAccType, accountNo)  VALUES ?', accVals, function (error, results) {

                });

            connection.query('INSERT INTO business_account(userID, businessName, businessRegistrationNumber, abbreviatedBusinessName)  VALUES ?', regInfo, function (error, results) {

                if (err) {
                    connection.rollback();
                    return console.log('Rolled back.');
                }


                return connection.commit(function (err, result) {
                    return console.log('Committed.');
                });

            });
        },

        createClient(_, __, { user, connection }) {
            trans
            connection.then(conn => {
                trans = conn
                return conn.beginTransaction()
            })
                .then(() => {
                    trans.query('INSERT INTO posts SET title=?', title)
                })
                .then(() => {
                    trans.query('INSERT INTO posts SET title=?', title)
                })
                .then(() => {
                    trans.query('INSERT INTO posts SET title=?', title)
                })
                .then(() => {
                    trans.commit()
                })
                .catch(error => {
                    if (trans) {
                        trans.rollback()
                    }
                    throw error
                })

            clientDet = __.clientDet

            //client general details
            detVals = [[clientDet.name]]

            //client account contact details
            accVals = [[clientDet.bank, clientDet.bankAccName, clientDet.bankAccNumber, clientDet.bankAccType, clientDet.biCode]]

            //client contact details
            contactVals = [[clientDet.cell, clientDet.email]]



            connection.query('INSERT INTO client_details(clientFullname, businessID)  VALUES ?', function (err, result) {

            })
                .query('INSERT INTO client_account_info(clientID, accountName, bankAccType, accountNo, biCode)  VALUES ?', function (err, result) {

                })
                .query('INSERT INTO client_contact_details(clientID, email, cellphoneNo )  VALUES ?', function (err, result) {

                    if (err) {
                        connection.rollback();
                        return console.log('Rolled back.');
                    }


                    connection.commit(function (err, result) {
                        console.log('Committed.');
                    });

                });
        },

        createContract(_, __, { user, connection }) {
            const contractVals = __.contractDet

            return connection.then(conn => {
                return conn.query('INSERT INTO users SET ?', { ...contractVals })
            }).catch(error => { throw error })
        },

    }
}

module.exports = resolvers;