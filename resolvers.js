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
            console.log('here')
            return connection.then(conn => {
                return conn.query('SELECT username, password FROM users WHERE username=?', [username])
            }).then((res) => {
                console.log('does')
                if (!res.length) {
                    throw new Error(
                        "This user doesn't exist."
                    )
                }
                console.log('is')
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
            }).catch(err => {
                throw err
            })
        },

        registerBusiness(_, regInfo, { user, connection }) {

            bizVals = {
                userID: 1,
                businessName: regInfo.name,
                businessRegistrationNumber: regInfo.regNumber,
                abbreviatedBusinessName: regInfo.bizAbbr
            }

            contactVals = {
                businessID: null,
                cellphoneNo: regInfo.cell,
                email: regInfo.bizEmail,
            }

            addrVals = {
                location: regInfo.address,
                postalAddress: regInfo.postalAddr,
                businessID: null
            }

            accVals = {
                bankID: 1,
                businessID: null,
                accountName: regInfo.bankAccName,
                bankAccType: regInfo.bankAccType,
                accountNo: regInfo.bankAccNumber
            }

            var trans
            return connection.then(conn => {
                trans = conn
                return conn.beginTransaction()
            }).then(() => {
                return trans.query('INSERT INTO business_account SET?', [bizVals])
            }).then((result) => {
                contactVals.businessID = result.insertId, 
                addrVals.businessID = result.insertId 
                accVals.businessID  = result.insertId
                return trans.query('INSERT INTO business_contact_details SET?', [contactVals])
            }).then(() => {
                return trans.query('INSERT INTO address SET?', [addrVals])
            }).then(() => {
                return trans.query('INSERT INTO business_account_info SET?', [accVals])
            }).then(() => {
                return trans.commit()
            }).then(() => {
                return 'Business registration successful'
            }).catch(error => {
                if (trans) {
                    trans.rollback()
                }
                throw error
            })
        },

        createClient(_, clientDet, { user, connection }) {
            var trans

            //client general details
            detVals = {
                clientFullname: clientDet.name,
                businessID : 1
            }

            //client account contact details
            accVals = {
                clientID : null,
                accountName: clientDet.bankAccName,
                bankAccType: clientDet.bankAccType,
                accountNo: clientDet.bankAccNumber,
                biCode: clientDet.biCode,
                bankID: clientDet.bank
            }

            //client contact details
            contactVals = {
                clientID : null,
                email: clientDet.email,
                cellphoneNo: clientDet.cell
            }

            return connection.then(conn => {
                trans = conn
                return conn.beginTransaction()
            }).then(() => {
                return trans.query('INSERT INTO client_details SET?', [detVals])
            }).then((result) => {
                contactVals.clientID = result.insertId
                accVals.clientID = result.insertId
                return trans.query('INSERT INTO client_account_info SET?', [accVals])
            }).then(() => {
                return trans.query('INSERT INTO client_contact_details SET?', [contactVals])
            }).then(() => {
                return trans.commit()
            }).then(() => {
                return ''
            }).catch(error => {
                if (trans) {
                    trans.rollback()
                }
                throw error
            })
        },

        createContract(_, contractVals, { user, connection }) {

            return connection.then(conn => {
                return conn.query('INSERT INTO contract_details SET ?', { ...contractVals })
            }).then(()=>{
                return 'Contract created'
            }).catch(error => { throw error })
        },

    }
}

module.exports = resolvers;