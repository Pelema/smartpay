const { gql } = require("apollo-server-express");

const typeDefs = gql`
    type User {
        id: Int!
        login: String!
    }

    enum AccountTypes {
        CHECQUE
        SAVINGS
    }

    input BusinessRegInfo {
        name: String!,
        regNumber: String!, 
        bizAbbr: String!,
        cell: String!,
        address: String!,
        bizEmail: String!,
        postalAddr: String!,
        bankAccName: String!,
        bankAccNumber: Int!,
        bankAccType: AccountTypes
    }

    input ClientRegInfo {
        name: String!,
        cell: String!,
        email: String!,
        bank: String!,
        bankAccName: String!,
        bankAccNumber: Int!,
        bankAccType: AccountTypes!,
        biCode: String!
    }

    input Contract {
        payMethod: String!,
        noInstallment: String!,
        dateOfirstInstallment: String!,
        installmentAmount: Float!,
        tracking: String!,
        installmentDates: String!,
        collectionReason: String!
    }

    type Query {
        current: User
        contract(bizId: Int!): String
        clients(bizId: String!): String
    }

    type Mutation {
        register(username: String!, email: String!, password: String!): String
        login(username: String!, password: String!): String
        registerBusiness(regInfo: BusinessRegInfo!):Int
        createClient(clientDet: ClientRegInfo): String
        createContract(contractDet: Contract): String
        registerBiz(bizDet: BusinessRegInfo): String
    }
`;

module.exports = typeDefs;
