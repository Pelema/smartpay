const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const jwt = require('express-jwt');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');
// const JWT_SECRET = require('./constants');
var mysql = require('promise-mysql');
const createCsvWriter = require("csv-writer").createObjectCsvWriter;

const app = express();

var connection = mysql.createConnection({
    host: 'smartdb.casy0dqe9tjt.us-east-2.rds.amazonaws.com',
    user: 'admin',
    password: 'smart9812',
    port: 3306,
    database: 'smartstore'
});


// var connection = mysql.createConnection({
//   host     : process.env.RDS_HOSTNAME,
//   user     : process.env.RDS_USERNAME,
//   password : process.env.RDS_PASSWORD,
//   port     : process.env.RDS_PORT
// });

// connection.connect(function(err) {
//     if (err) {
//       console.error('error connecting: ' + err.stack);
//       return;
//     }

//     console.log('connected as id ' + connection.threadId);
//   });

// connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
//   if (error) throw error;
//   console.log('The solution is: ', results[0].solution);
// });

// connection.end();

app.use('/', express.static('views'));

app.get('/genCSV', function (req, res) {
    return connection.then((conn) => {
        return conn.query("SELECT * FROM recipients")
    }).then((data) => {
        const jsonData = JSON.parse(JSON.stringify(data));
        console.log("jsonData", jsonData);

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