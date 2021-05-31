// const { User } = require("./models");
var bcrypt = require('bcryptjs');
const jsonwebtoken = require("jsonwebtoken");

// const JWT_SECRET = require("./constants");

const resolvers = {
    Query: {
        businessClients(_, { }, { connection, user }) {
            return connection.then(conn => {
                
                return conn.query(`SELECT cd.clientFullname, cd.client_id, bai.bankName,ctd.noOfContracts,ctd.sumAmount
                FROM client_details cd
                LEFT JOIN client_account_info cai
                ON cd.client_id = cai.clientID
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
                where ba.businessID = ?`, [user.businessID])
            }).then(result => {
                var list = []
                result.forEach(el => {
                    if(!el.noOfContracts){
                        el.noOfContracts = 0
                        el.sumAmount = 0
                    }
                    list.push({ name: el.clientFullname, id: el.client_id, bankName: el.bankName, noContract: el.noOfContracts, installmentAmount: el.sumAmount })
                })

                return list
            }).catch(error => {
                throw error
            })

        },
        getContract(_, { clientID }, { connection, user}) {
            return connection.then(conn => {
                return conn.query('SELECT * FROM contract_details WHERE clientID =?', [clientID])
            }).then(result => {
                // var list = []
                // result.forEach(el => {
                //     list.push({ name: el.clientFullname, id: el.client_id })
                // })
                return result
            }).catch(error => {
                throw error
            })
        },

        // Please check this one out properly
        getEditableContract(_, { contractID }, { connection, user}) {
            return connection.then(conn => {
                return conn.query('SELECT * FROM contract_details WHERE contractID =?', [contractID])
            }).then(result => {
                // var list = []
                // result.forEach(el => {
                //     list.push({ name: el.clientFullname, id: el.client_id })
                // })
                return result
            }).catch(error => {
                throw error
            })
        },

        getTransactions(_, {start, end}, {connection, user }){
            return connection.then(conn => {
                return conn.query(`SELECT * FROM client_details AS cld
                inner join
                contract_details AS cd
                on cld.client_id = cd.clientID
                WHERE (dateOfirstInstallment BETWEEN ? AND ?) 
                and businessID = ?`, [start, end, user.businessID])
            }).then(result => {
                return result
            }).catch(error => {
                throw error
            })
        },

    },

    Mutation: {
        register(_, { username, password, email }, { connection }) {
            var hash = bcrypt.hashSync(password, 12);
            vals = { username, email, password: hash, roleID: 2 }

            return connection.then(conn => {
                return conn.query('INSERT INTO users SET ?', vals)
            }).then(result => {
                return jsonwebtoken.sign({ userID: result.insertId }, "JWT_SECRET", {
                    expiresIn: "1d",
                })
            }).catch(error => {
                throw error
            })
        },

        login(_, { username, password }, { connection }) {
            var temp_userID
            var temp_conn
            return connection.then(conn => {
                temp_conn = conn
                return conn.query('SELECT userID, username, password FROM users WHERE username=?', [username])
            }).then((res) => {
                if (!res.length) {
                    throw new Error(
                        "This user doesn't exist."
                    )
                }
                return res[0]
            })
                .then(res => {
                    temp_userID = res.userID
                    return bcrypt.compare(password, res.password)
                })
                .then(res => {
                    if (!res) {
                        throw new Error("Your password is incorrect!");
                    }
                    return temp_conn.query('SELECT businessName, businessID FROM business_account WHERE userID=?', [temp_userID])
                }).then(res => {

                    if (!res.length) {
                        return {
                            token: jsonwebtoken.sign({ userID: temp_userID }, "JWT_SECRET", { expiresIn: "1d" }),
                            businessName: null
                        }
                    }

                    return {
                        token: jsonwebtoken.sign({ userID: temp_userID, businessID : res[0].businessID }, "JWT_SECRET", { expiresIn: "1d" }),
                        businessName: res[0].businessName
                    }

                }).catch(err => {
                    throw err
                })
        },

        registerBusiness(_, regInfo, { user, connection }) {
            bizVals = {
                userID: user.userID,
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
                bankID: 3,
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
                contactVals.businessID = result.insertId
                addrVals.businessID = result.insertId
                accVals.businessID = result.insertId
                return trans.query('INSERT INTO business_contact_details SET?', [contactVals])
            }).then(() => {
                return trans.query('INSERT INTO address SET?', [addrVals])
            }).then(() => {
                return trans.query('INSERT INTO business_account_info SET?', [accVals])
            }).then(() => {
                return trans.commit()
            }).then(() => {
                return jsonwebtoken.sign({ userID: user.userID, businessID: contactVals.businessID }, "JWT_SECRET", {
                    expiresIn: "1d",
                })
            }).catch(error => {
                console.log(error, 'err')
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
                businessID: user.businessID,
                client_id: clientDet.clientNumber
            }

            //client account contact details
            accVals = {
                clientID: clientDet.clientNumber,
                accountName: clientDet.bankAccName,
                bankAccType: clientDet.bankAccType,
                accountNo: clientDet.bankAccNumber,
                biCode: clientDet.biCode,
                bankID: clientDet.bank
            }

            //client contact details
            contactVals = {
                clientID: clientDet.clientNumber,
                email: clientDet.email,
                cellphoneNo: clientDet.cell
            }

            return connection.then(conn => {
                trans = conn
                return conn.beginTransaction()
            }).then(() => {
                return trans.query('INSERT INTO client_details SET?', [detVals])
            }).then((result) => {
                console.log(result)
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

        editClient(_, clientDet, { user, connection }) {
            var trans

            //client general details
            detVals = {
                clientFullname: clientDet.name,
                businessID: user.businessID,
                client_id: clientDet.clientNumber
            }

            //client account contact details
            accVals = {
                clientID: clientDet.clientNumber,
                accountName: clientDet.bankAccName,
                bankAccType: clientDet.bankAccType,
                accountNo: clientDet.bankAccNumber,
                biCode: clientDet.biCode,
                bankID: clientDet.bank
            }

            //client contact details
            contactVals = {
                clientID: clientDet.clientNumber,
                email: clientDet.email,
                cellphoneNo: clientDet.cell
            }

            return connection.then(conn => {
                trans = conn
                return conn.beginTransaction()
            }).then(() => {
                return trans.query('UPDATE INTO client_details SET?', [detVals])
            }).then((result) => {
                console.log(result)
                return trans.query('UPDATE INTO client_account_info SET?', [accVals])
            }).then(() => {
                return trans.query('UPDATE INTO client_contact_details SET?', [contactVals])
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
            }).then(() => {
                return 'Contract created'
            }).catch(error => { throw error })
        },

        editContract(_, contractVals, { user, connection }) {

            return connection.then(conn => {
                return conn.query(`UPDATE contract_details
                SET paymentMethod = ?,
                    installmentAmount = ?,
                    installmentDates = ?,
                    noInstallment = ?,
                    dateOfirstInstallment = ?,
                    tracking = ?,
                    collectionReason = ?,
                WHERE contractID = ?`, { ...contractVals }) 
            }).then(() => {
                return 'Contract edited'
            }).catch(error => { throw error })
        },
    }
}

module.exports = resolvers;