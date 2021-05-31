const { gql } = require("apollo-server-express");

const typeDefs = gql`
    type User {
        id: Int!
        login: String!
    }

    type Client {
        id: String!
        name: String!
        bankName: String!
        noContract: String!
        installmentAmount: String!
    }

    type Contract {
        paymentMethod: String!
        noInstallment: String!
        dateOfirstInstallment: String!
        installmentAmount: String!
        tracking: String!
        installmentDates: String!
        collectionReason: String!
        contractID: String
    }

    type Transaction {
        clientID: String!
        clientFullname: String!
        paymentMethod: String!
        noInstallment: String!
        dateOfirstInstallment: String!
        installmentAmount: String!
        tracking: String!
        installmentDates: String!
        collectionReason: String!
        contractID: String!
    } 

    type SigninResponse {
        token: String!
        businessName: String
    }

    enum AccountTypes {
        CHECQUE
        SAVINGS
        TRANSMISSION
    }

    enum PaymentTypes {
        ENDO
        CARD
    }

    type Query {
        current: User
        contract(clientID: String!): Contract
        businessClients: [Client]
        getContract(clientID: String!): [Contract]
        getEditableContract(contractID: String!): [Contract]
        getTransactions(start: String!, end: String!): [Transaction]
    }

    type Mutation {
        register(username: String!, email: String!, password: String!): String
        
        login(username: String!, password: String!): SigninResponse

        registerBusiness(
            name: String!,
            regNumber: String!, 
            bizAbbr: String!,
            cell: String!,
            address: String!,
            bizEmail: String!,
            postalAddr: String!,
            bankAccName: String!,
            bankAccNumber: String!,
            bankAccType: AccountTypes!,
            branchCode: String!
        ):String

        createClient(
            clientNumber: String!,
            name: String!,
            cell: String!,
            email: String!,
            bank: String!,
            bankAccName: String!,
            bankAccNumber: String!,
            bankAccType: AccountTypes!,
            biCode: String!
        ): String

        editClient(
            clientNumber: String!,
            name: String!,
            cell: String!,
            email: String!,
            bank: String!,
            bankAccName: String!,
            bankAccNumber: String!,
            bankAccType: AccountTypes!,
            biCode: String!
        ): String

        createContract(
            clientID: String!,
            paymentMethod: PaymentTypes!,
            noInstallment: String!,
            dateOfirstInstallment: String!,
            installmentAmount: Float!,
            tracking: String!,
            installmentDates: String!,
            collectionReason: String!
        ): String

        editContract(
            clientID: String,
            contractID: String,
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
