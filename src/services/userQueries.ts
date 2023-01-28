import { gql } from "@apollo/client";

export const CREATE_USER = gql`
    mutation($name: String!, $username: String!, $email: String!, $password: String!, $bankAccount: String!, $lastname: String){
        createUser(name: $name, username: $username, email: $email, password: $password, bank_account: $bankAccount, lastname: $lastname ){
            __typename
            ... on User {
                id
                name
                lastname
                username
                token
                bank_account
                wallet {
                    cantidad
                    descuento
                    limite
                }
            }
            ... on Error {
                error
            }
        }
    }
`

export const ADD_MONEY = gql`
    mutation($money: Int!, $username: String!){
        addMoney(money: $money, username: $username){
            __typename
                ... on Cantidad {
                    cantidad
                }
                ... on Error {
                    error
                }
        }
    }
`

export const DEL_USER = gql`
    mutation($token: String!){
        delUser(token: $token){
            __typename
            ... on Message {
                msg
            }
            ... on Error {
                error
            }
        }
    }
`

export const LOGIN_USER = gql`
    mutation($username: String!, $password: String!){
        loginUser(username: $username, password: $password){
            __typename
            ... on User {
                id
                name
                lastname
                username
                token
                bank_account
                wallet {
                    cantidad
                    descuento
                    limite
                }
            }
            ... on Error {
                error
            }
        }
    }
`
