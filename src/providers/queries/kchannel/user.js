import { gql } from '@apollo/client/core';


/**
 *  USER
 */

export const GET_USER_BY_ID_QUERY = gql`
query userById( $id: String! ){
    userById(
        id: $id
    )
    {
        id
        username
        firstName
        lastName
        email
        phone
        bio
        photo
        role
        activated
        updatedAt
        createdAt
    }
}
`;


export const SYNC_USERS_QUERY = gql`
query syncAllUsers( $users: [JSON!]! ){
    syncAllUsers(
        params: { users: $users }
    )
    {
        status
    }
}
`;


export const GET_LATEST_USER_QUERY = gql`
query latestUser{
    latestUser{
  id, updatedAt
}
}
`;




export const CREATE_OR_UPDATE_USER_MUTATION = gql`
 mutation createOrUpdateUser($id: String!, $username: String!, $firstName: String!, $lastName: String!, $email: String!, $phone: String!, $bio: String, $createdAt: Float!, $updatedAt: Float!, $role: Float!, $activated: Boolean!, $photo: JSON) {
    createOrUpdateUser(
        userData: { 
            id: $id,
            username: $username,
            firstName: $firstName,
            lastName: $lastName,
            email: $email,
            phone: $phone,
            bio: $bio,
            photo: $photo,
            role: $role,
            activated: $activated,
            createdAt: $createdAt,
            updatedAt: $updatedAt
      }
   ) {
     id
   }
 }
`;
