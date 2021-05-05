const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const jwt = require('express-jwt');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');
// const JWT_SECRET = require('./constants');
var mysql = require('promise-mysql');
const createCsvWriter = require("csv-writer").createObjectCsvWriter;
var cors = require('cors')
const path = require('path');
const fs = require('fs')

const app = express();
app.use(cors())

app.use(express.static(path.join(__dirname, 'dist')));

var connection = mysql.createConnection({
    host: 'smartdb.casy0dqe9tjt.us-east-2.rds.amazonaws.com',
    user: 'admin',
    password: 'smart9812',
    port: 3306,
    database: 'smartstore'
});

app.get('/downloadCSV', function (req, res) {
    return connection.then((conn) => {
        return conn.query(`
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
        where ba.businessID = '29';`)
    }).then(async (data) => {
        var content = '14214212442,,,,,,,\r\n 01/23/2021, \'12233434\r\n RECIPIENT NAME,RECIPIENT ACCOUNT,RECIPIENT ACCOUNT TYPE,BIC CODE,AMOUNT,CONTRACT REFERENCE,TRACKING,ABBREVIATED NAME,REASON FOR COLLECTION\r\n'
        var clientSum = 0
        data.forEach(row => {
            clientSum += parseInt(row.accountNo)
            content += (row.clientFullname + ',' + row.accountNo + ',' + row.bankAccType + ',' + row.biCode + ',' + row.installmentAmount + ',' + row.contractID + ',' + row.tracking + ',' + row.collectionReason + '\r\n')
        })


        businessAccountNumber = 12346990
        hashSum = clientSum + businessAccountNumber
        actualHash = hashSum.toString().substr(hashSum.toString().length - 12)

        try {
            const data = fs.writeFileSync('test.txt', content)
            //file written successfully
            fs.renameSync('test.txt', 'test.csv');
        } catch (err) {
            console.error(err)
        }

        return res.download('./test.csv')

    }).catch(error => {
        return res.status(500).send({ error: error })
    })
})


const auth = jwt({
    secret: 'JWT_SECRET',
    algorithms: ['sha1', 'RS256', 'HS256'],
    credentialsRequired: false,
});

app.use(auth);

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
                : null;
        return { user, connection };
    },
});

server.applyMiddleware({ app });

app.get('*', (req, res) => {
    console.log(__dirname)
    res.sendFile(path.join(__dirname + '/dist/index.html'))
})
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log('The server started on port ' + PORT);
});