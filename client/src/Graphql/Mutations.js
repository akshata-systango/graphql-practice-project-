import { gql } from "@apollo/client";

export const CREATE_USER_MUTATION = gql`
mutation createUser(
    $firstname: String!
    $lastname: String!
    $age: Int!
    $email: String!
    $id: String!){
        createUser(
        id:$id
        firstname:$firstname
        lastname: $lastname
        age: $age
        email: $email){
            id
            firstname
            lastname
            age
            email
    }
}
`;

export const EDIT_USER_MUTATION = gql`
mutation editUser(
    $firstname: String!
    $lastname: String!
    $age: Int!
    $email: String!
    $id: String!){
    editUser(
        id:$id
        firstname:$firstname
        lastname: $lastname
        age: $age
        email: $email){
            id
            firstname
            lastname
            age
            email
    }
}
`;

export const DELETE_USER = gql`
mutation deleteUser(
    $id: String!){
        deleteUser(
        id:$id){
            id
    }
}
`;

export const SEND_MESSAGE = gql`
mutation sendMessage(
    $id: String! $username:String! $message:String! $userId:String!){
        sendMessage(
        id:$id username:$username message:$message userId:$userId){
            id
            message
            username
            userId
    }
}
`;