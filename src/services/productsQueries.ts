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
query($search: String, $amount: Int, $sale: Boolean, $price: [Float], $category: String, $order: String){
    getProducts( search: $search amount: $amount sale: $sale price: $price category: $category order: $order){
        __typename
        ... on Product {
            id
            name
            image
            price
            stars
        }
        ... on Error {
            error
        }
    }
}
`

export const GET_ONE_PRODUCT = gql`
query($id: String!){
    getProductOne( ident: $id ){
        __typename
        ... on Product {
            id
            name
            description
            features{
                colors
                height
                width
                length
                conectors
                batery
                pantalla
                resolucion
                OS
                RAM
                size
                material
                filtro
                alimentacion
                capacidad
            }
            valorations{
                username
                text
                stars
            }
            images
            brand
            price
            stars
        }
        ... on Error {
            error
        }
    }
}
`