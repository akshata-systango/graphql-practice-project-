const { ApolloServer } = require('apollo-server-express');
const {
  ApolloServerPluginDrainHttpServer,
  ApolloServerPluginLandingPageLocalDefault,
  ApolloServerPluginLandingPageGraphQLPlayground
} = require('apollo-server-core');
const express = require('express');
const http = require('http');
const { typeDefs } = require('./schema/TypeDefs/users');
const { resolvers } = require('./schema/Resolver/user');
const cors = require('cors')
const app = express();
// const httpServer = http.createServer(app);
async function startApolloServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    csrfPrevention: true,
    cache: 'bounded',
    plugins: [
      // ApolloServerPluginDrainHttpServer({ httpServer }),
      // ApolloServerPluginLandingPageLocalDefault({ embed: true }),
      ApolloServerPluginLandingPageGraphQLPlayground(),
    ],
  });

  await server.start();
  server.applyMiddleware({ app });

  // new Promise(resolve => httpServer.listen({ port: 6969 }, resolve));
  // console.log(`🚀 Server ready at http://localhost:6969${server.graphqlPath}`);
}
app.use(cors())
startApolloServer()
app.listen({ port: 3001 }, () => { console.log(`server is running`); })