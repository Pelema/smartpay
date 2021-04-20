const { gql } = require("apollo-server-express");

const typeDefs = gql`
    type User {
        id: Int!
        login: String!
    }

    type Client {
        id: String!,
        name: String!
    }

    enum AccountTypes {
        CHECQUE
        SAVINGS
    }

    enum PaymentTypes {
        ENDO
        CARD
    }

    type Query {
        current: User
        contract(bizId: Int!): String
        businessClients: [Client]
    }

    type Mutation {
        register(username: String!, email: String!, password: String!): String
        login(username: String!, password: String!): String
        registerBusiness(
            name: String!,
            regNumber: String!, 
            bizAbbr: String!,
            cell: String!,
            address: String!,
            bizEmail: String!,
            postalAddr: String!,
            bankAccName: String!,
            bankAccNumber: Int!,
            bankAccType: AccountTypes!,
            branchCode: String!
        ):String

        createClient(
            name: String!,
            cell: String!,
            email: String!,
            bank: String!,
            bankAccName: String!,
            bankAccNumber: Int!,
            bankAccType: AccountTypes!,
            biCode: String!
        ): String

        createContract(
            paymentMethod: PaymentTypes!,
            noInstallment: String!,
            dateOfirstInstallment: String!,
            installmentAmount: Float!,
            tracking: String!,
            installmentDates: String!,
            collectionReason: String!
        ): String
    }
`;

module.exports = typeDefs;
