require('dotenv').config()
const express = require('express')
const { ApolloServer } = require('apollo-server-express')
const jwt = require('express-jwt')
const jsonwt = require('jsonwebtoken');
const typeDefs = require('./schema')
const resolvers = require('./resolvers')
// const JWT_SECRET = require('./constants')
var mysql = require('promise-mysql')
const createCsvWriter = require("csv-writer").createObjectCsvWriter
var cors = require('cors')
const path = require('path')
const fs = require('fs')

console.log(process.env.DB_NAME)

const { Sequelize, Op, Model, DataTypes } = require("sequelize");
const app = express()
app.use(cors())

app.use(express.static(path.join(__dirname, 'dist')))

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    dialect: 'mysql'
});

test_conn = async () =>{
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

test_conn()

app.get('/downloadCSV', function (req, res) {

    //verify that user has rights to access route by checking token
    try {
        var decodedToken = jsonwt.verify(req.query.token, 'JWT_SECRET')
    } catch (err) {
        return res.sendStatus(403)
    }

    var temp_conn
    var bizAccount
    //if pass then connect to database and collect client data for csv
    return connection.then((conn) => {
        temp_conn = conn
        return conn.query(`select accountNo from business_account_info where businessID = ${decodedToken.businessID}`)

    }).then((res) => {

        bizAccount = res[0].accountNo

        return temp_conn.query(`
        select clientFullname, accountNo, bankAccType, biCode, installmentAmount, contractID, tracking, abbreviatedBusinessName, collectionReason
        from client_details AS cn
        inner join
        client_account_info AS cai
        on cn.client_id = cai.clientID
        inner join
        contract_details AS cd
        on cai.clientID = cd.clientID
        inner join
        business_account AS ba
        on ba.businessID = cn.businessID
        where ba.businessID = ${decodedToken.businessID} and dateOfirstInstallment='${req.query.date}'`)
    }).then(async (data) => {
        var date = new Date(req.query.date)
        var content = bizAccount + ',,,,,,,\r\n ' + date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear() + ', \''
        var contentBody = '\r\n RECIPIENT NAME,RECIPIENT ACCOUNT,RECIPIENT ACCOUNT TYPE,BIC CODE,AMOUNT,CONTRACT REFERENCE,TRACKING,ABBREVIATED NAME,REASON FOR COLLECTION\r\n'

        var clientSum = 0
        data.forEach(row => {
            clientSum += parseInt(row.accountNo)
            contentBody += (row.clientFullname + ',' + row.accountNo + ',' + row.bankAccType + ',' + row.biCode + ',' + row.installmentAmount + ',' + row.contractID + ',' + row.tracking + ',' + row.abbreviatedBusinessName + ',' + row.collectionReason + '\r\n')
        })


        businessAccountNumber = parseInt(bizAccount)
        hashSum = clientSum + businessAccountNumber
        actualHash = hashSum.toString().substr(hashSum.toString().length - 12)

        content += actualHash + contentBody
        try {
            const data = fs.writeFileSync('test.txt', content)
            //file written successfully
            fs.renameSync('test.txt', 'test.csv')
        } catch (err) {
            console.error(err)
        }

        return res.download('./test.csv', 'test.csv')

    }).catch(error => {
        return res.status(500).send({ error: error })
    })
})


const auth = jwt({
    secret: 'JWT_SECRET',
    algorithms: ['sha1', 'RS256', 'HS256'],
    credentialsRequired: false,
})

app.use(auth)

const server = new ApolloServer({
    typeDefs,
    resolvers,
    playground: {
        endpoint: '/graphql',
    },
    context: ({ req }) => {
        const user = req.headers.user
            ? JSON.parse(req.headers.user)
            : req.user
                ? req.user
                : null
        return { user, connection }
    },
})

server.applyMiddleware({ app })

app.get('*', (req, res) => {
    console.log(__dirname)
    res.sendFile(path.join(__dirname + '/dist/index.html'))
})
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log('The server started on port ' + PORT)
})