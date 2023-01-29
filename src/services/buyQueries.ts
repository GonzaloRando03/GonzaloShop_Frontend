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

export const GET_BUY = gql`
    mutation($idUsuario: Int!, $token: String!){
        getBuy(idUsuario: $idUsuario, token: $token){
        __typename
            ... on Compra {
                id
                idUsuario
                fechaEntrega
                fechaPedido
                precioTotal
                articulos {
                    nombre
                    precio
                    cantidad
                }
            }
            ... on Error {
                error
            }
        }
    }
`
