import { gql } from "@apollo/client";

export const LOAD_USERS = gql`
query {
   users{
    id
    firstname
    lastname
    age
    email
  }
}
`
export const GET_MESSAGES = gql`
query{
  messages{
    id
    username
    message
    userId
  }
}
`
// const GET_MESSAGES = gql`
//   query messages($id: ID!) {
//     messages(id: $id) {
//       id
//       username
//       message
//     }
//   }
// `;


export const MESSAGE_SUBSCRIPTION = gql`
subscription{
  newMessage{
    id
    username
    message
    # isMessageSended @client
  }
}`