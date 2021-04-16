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
        async register(_, { login, password }) {
            // const user = await User.create({
            //     login,
            //     // password: await bcrypt.hash(password, 10),
            //     password, 
            // });

            return jsonwebtoken.sign({ id: "user.id", login: "user.login" }, "JWT_SECRET", {
                expiresIn: "3m",
            });
        },

        async login(_, { login, password }) {
            // const user = await User.findOne({ where: { login } });
            const user = null

            if (!user) {
                throw new Error(
                    "This user doesn't exist. Please, make sure to type the right login."
                );
            }

            // const valid = await bcrypt.compare(password, user.password);

            // if (!valid) {
            //     throw new Error("You password is incorrect!");
            // }

            // return jsonwebtoken.sign({ id: user.id, login: user.login }, JWT_SECRET, {
            //     expiresIn: "1d",
            // });
            return jsonwebtoken.sign({ id: "user.id", login: "user.login" }, "JWT_SECRET", {
                expiresIn: "1d",
            });
        },

        async registerBusiness(_, {}){

        },

        createClient(_, __, { connection }) {
            connection.query('SELECT * FROM dbo.Users', function (error, results, fields) {
                if (error) throw error;
                
                console.log(results)
              });
            clientDet = __.clientDet

            return clientDet.name
        },

        createContract(_, __) {
            contractDet = __.contractDet

            return ''
        },

        registerBiz(_, __) {
            bitDat = __.bitDat

            return ''
        }
    },
};

module.exports = resolvers;