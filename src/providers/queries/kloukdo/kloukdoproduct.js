import { gql } from '@apollo/client/core';

export const GET_KLOUKDO_PRODUCT_QUERY = gql`
query getAllKLoukdoProducts($page: Float!, $limit: Float){
    getAllKLoukdoProducts(
        params: {
            page: $page,
            limit: $limit
        }
    ){
    product{
        id
        name
        price {
            id
            price
        }
        category{
            name
        }
        subCategory{ name }
        user {username phone}
        photos
        createdAt
    }
    total
    page
  }
}
`;

export const SEARCH_KLOUKDO_PRODUCT_QUERY = gql`
query searchKLoukdoProductByName ($name: String!) {
    searchKLoukdoProductByName (name: $name)
    {
        id, 
        name, 
        price {id, price, currency, discountPrice, hasDiscount,isMain},
        photos
        category{id, name}
        subCategory{id, name}
        user {username phone}
        createdAt
    
    }
}
`;

export const CREATE_KLOUKDO_PRODUCT_MUTATION = gql`
mutation createKLoukdoProduct ($name: String!, $category: String!, $subCategory: String!, $price: Float!, $discountPrice: Float!, $currency: String!, $hasDiscount: Boolean!, $photos: [JSON!]){
    createKLoukdoProduct(params: {
    category: $category
    subCategory: $subCategory
    name: $name
    price: $price,
    discountPrice: $discountPrice,
    currency: $currency,
    hasDiscount: $hasDiscount,
    photos: $photos
  }){
    id
    name
    price {
        id
        name
        price
        discountPrice
        hasDiscount
        isMain
        currency
        product
    }
    photos

  }
}
`;

export const DELETE_KLOUKDO_PRODUCT_MUTATION = gql`
mutation deleteKLoukdoProduct ($id: String!){
    deleteKLoukdoProduct(
        params: {
            id: $id
        }
    ),
    {
        name
    }
}
`;

export const UPDATE_KLOUKDO_PRODUCT_MUTATION = gql`
mutation updateKLoukdoProduct ($id: String!, $name: String, $category: String, $subCategory: String, $price: Float)
{
    updateKLoukdoProduct (
        params: {
            id: $id,
            category: $category
            subCategory: $subCategory
            name: $name
            price: $price
        }
    ), {
        name
    }
}
`;