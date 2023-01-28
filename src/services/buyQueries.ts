import { gql } from "@apollo/client";

export const ADD_BUY = gql`
    mutation($token: String!, $idUsuario: Int!, $precioTotal: Float!, $fechaPedido: String!, $fechaEntrega: String!, $articulos: [ArticuloInput]!){
        sendBuy(token: $token, idUsuario: $idUsuario, precioTotal: $precioTotal, fechaPedido: $fechaPedido, fechaEntrega: $fechaEntrega, articulos: $articulos){
            __typename
                ... on Compra {
                    fechaEntrega
                    fechaEntrega
                    id
                    idUsuario
                    articulos {
                        nombre
                        precio
                        cantidad
                    }
                    precioTotal
                    descuento
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
