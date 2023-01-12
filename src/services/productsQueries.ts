import { gql } from "@apollo/client";

export const PRODUCTS_HOME = gql`
    query{
        getProducts(amount: 8){
            __typename
            ... on Product {
                id
                name
                image
            }
            ... on Error {
                error
            }
        }
    }
`

export const PRODUCTS_HOME_OFFERT = gql`
    query{
        getProducts(amount: 6 sale: true){
            __typename
            ... on Product {
                id
                name
                image
            }
            ... on Error {
                error
            }
        }
    }
`

export const PRODUCTS_SEARCH = gql`
    query{
        getProducts{
            __typename
            ... on Product {
                id
                brand
                stars
                name
                image
                price
            }
            ... on Error {
                error
            }
        }
    }
`