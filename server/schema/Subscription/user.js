const { gql } = require('graphql-tag');
const { PubSub } = require('graphql-subscriptions');
const { ApolloServer } = require('apollo-server-express');
const { makeExecutableSchema } = require('apollo-server');

const pubsub = new PubSub();

const typeDefs = gql`

type Query{
    messages:[message]
}

type message{
    id:String
    message:String
    username:String
}
type subscription{
    newMessage:message
}`

const resolvers = {
    subscription: {
        newMessage: {
            subscribe: () => pubsub.asyncIterator('newMessage')
        }
    }
}

exports.pubsub = pubsub
exports.schema = new ApolloServer({ typeDefs, resolvers })
