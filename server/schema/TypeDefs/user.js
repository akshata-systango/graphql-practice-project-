// const graphql = require("graphql");
const { gql } = require('apollo-server-express');
const { PubSub } = require('graphql-subscriptions');
// const { GraphQLObjectType, GraphQLInt, GraphQLString} = graphql;

// const UserType = new GraphQLObjectType({
//     name: 'User',
//     fields: () => ({
//         id: { type: GraphQLString },
//         firstname: { type: GraphQLString },
//         lastname: { type: GraphQLString },
//         age: { type: GraphQLInt },
//         email: { type: GraphQLString },
//     })
// });

const pubsub = new PubSub();

const typeDefs = gql`

  type User {
    id: String!
    firstname: String!
    lastname:String!
    age:Int!
    email:String!
  }

  type Message {
    id: String!
    userId:String!
    username: String!
    message: String!
  }

  type subscription{
    newMessage:Message!
}

#  Queries
  type Query {
    users: [User!]!
    messages: [Message!]!
  }

#   Mutations
type Mutation{
    createUser(id: String!, firstname: String!, lastname:String!, age:Int!, email:String) : User!
    deleteUser(id:String!) : User!
    editUser(id: String!, firstname: String!, lastname:String!, age:Int!, email:String) : User!
    sendMessage(id: String!, username: String!, message:String!, userId:String!) : Message!
}
`;

module.exports = { typeDefs, pubsub }
// # const MessageType = new GraphQLObjectType({
// #     name: 'Message',
// #     fields: () => ({
// #         id: { type: GraphQLString },
// #         message: { type: GraphQLString },
// #         username: {type: GraphQLString }
// #     })
// # });

// # module.exports = {UserType, MessageType};
