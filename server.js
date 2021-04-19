const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const jwt = require('express-jwt');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');
// const JWT_SECRET = require('./constants');
var mysql = require('promise-mysql');
const createCsvWriter = require("csv-writer").createObjectCsvWriter;
var cors = require('cors')

const app = express();
app.use(cors())

var connection = mysql.createConnection({
    host: 'smartdb.casy0dqe9tjt.us-east-2.rds.amazonaws.com',
    user: 'admin',
    password: 'smart9812',
    port: 3306,
    database: 'smartstore'
});

app.use('/', express.static('dist'));

app.get('/header', (req, res)=>{
    // req.headers.authorization = 'some value';
    console.log(req.headers)
    res.send(req.headers.authorization)
})

app.get('/header2', (req, res)=>{
    req.headers.authorization = 'some value';
    console.log(req.headers)
    res.send(req.headers.authorization)
})

app.get('/genCSV', function (req, res) {
    return connection.then((conn) => {
        return conn.query("SELECT * FROM recipients")
    }).then((data) => {
        const jsonData = JSON.parse(JSON.stringify(data));

        const csvWriter = createCsvWriter({
            path: "csvWriter.csv",
            header: [
                { id: 'recipientName', title: 'recipientName'},
                { id: 'recipientAccount', title: 'recipientAccount'},
                { id: 'recipientAccType', title: 'recipientAccType'},
                { id: 'biCode', title: 'biCode'},
                { id: 'amount', title: 'amount'},
                { id: 'contractReference', title: 'contractReference'},
                { id: 'tracking', title: 'tracking'},
                { id: 'abbreviatedName', title: 'abbreviatedName'},
                { id: 'reasonForCollection', title: 'reasonForCollection'}
            ]
        })

        return csvWriter.writeRecords(jsonData)

    }).then((result) => {
        return res.download('./csvWriter.csv')
    }).catch(error => {
        return res.status(500).send({ error: error})
    })
})


const auth = jwt({
    secret: 'JWT_SECRET',
    algorithms: ['RS256'],
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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log('The server started on port ' + PORT);
});