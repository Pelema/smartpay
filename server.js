require('dotenv').config()
const express = require('express')
const { ApolloServer } = require('apollo-server-express')
const jwt = require('express-jwt')
const jsonwt = require('jsonwebtoken');
const typeDefs = require('./schema')
const resolvers = require('./resolvers')
// const JWT_SECRET = require('./constants')
var cors = require('cors')
const path = require('path')
const fs = require('fs')
const db = require('./config/database')
const { QueryTypes } = require('sequelize');


db.authenticate()
.then(()=>{
    console.log('Connection has been established successfully.');
}).catch(()=>{
    console.error('Unable to connect to the database:', error);
})

const app = express()
app.use(cors())
app.use(express.static(path.join(__dirname, 'dist')))
const dbModel = require('./models/init-models')(db)

async function que () {
    //  console.log(User)
    const users = await User.users.findAll();
    console.log(users.every(user => user instanceof User.users)); // true
    console.log("All users:", JSON.stringify(users, null, 2));
}



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
    dbModel.business_account_info.findAll({
        attributes: [
            'accountNo'
        ],
        where: {
            businessID: decodedToken.businessID
        }
    })
   .then((res) => {

        bizAccount = res[0].accountNo

        return db.query(`
        select clientFullname, accountNo, manualContractID, bankAccType, biCode, installmentAmount, contractID, tracking, abbreviatedBusinessName, collectionReason
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
        where ba.businessID = ${decodedToken.businessID} and dateOfirstInstallment='${req.query.date}'`, { type: QueryTypes.SELECT })
    }).then(async (data) => {
        var date = new Date(req.query.date)
        var content = bizAccount + ',,,,,,,\r\n ' + date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear() + ', \''
        var contentBody = '\r\n RECIPIENT NAME,RECIPIENT ACCOUNT,RECIPIENT ACCOUNT TYPE,BIC CODE,AMOUNT,CONTRACT REFERENCE, MANUAL CONTRACT ID,TRACKING,ABBREVIATED NAME,REASON FOR COLLECTION\r\n'

        var clientSum = 0
        var bankAccType = ''
        data.forEach(row => {
            clientSum += parseInt(row.accountNo)
            if(row.bankAccType == 'CHECQUE'){
                bankAccType = 1
            }else if(row.bankAccType == 'SAVINGS'){
                bankAccType = 2
            }else if(row.bankAccType == 'TRANSMISSION'){
                bankAccType = 3
            }
            contentBody += (row.clientFullname + ',' + row.accountNo + ',' + bankAccType + ',' + row.biCode + ',' + row.installmentAmount + ',' + row.contractID + ',' + row.manualContractID + ',' + row.tracking + ',' + row.abbreviatedBusinessName + ',' + row.collectionReason + '\r\n')
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
        return { user, db }
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