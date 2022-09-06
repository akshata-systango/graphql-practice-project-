import './App.css';
import RenderRoutes from './routes/Routes';
import { ApolloClient, InMemoryCache, ApolloProvider, from, split, HttpLink } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { Button, Stack } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';
import { getMainDefinition } from '@apollo/client/utilities';

const errorLink = onError((graphqlErrors, networkError) => {
  if (graphqlErrors) {
    graphqlErrors?.map(({ message, location, path }) => {
      alert(`Graphql Error ${message}`)
    })
  }

});

const wsLink = new GraphQLWsLink(createClient({
  url: 'ws://localhost:4001/graphql',
  // connectionParams: {
  //   authToken: user.authToken,
  // },
}));
// const link = from([
//   errorLink,
//   new HttpLink({ uri: 'http://localhost:3001/graphql' })
// ])

const link  = new HttpLink({ uri : 'http://localhost:3001/graphql'})

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    console.log(definition, "defffff");
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  link,
);
const client = new ApolloClient({
  // uri: splitLink,
  uri: 'http://localhost:3001/graphql',
  cache: new InMemoryCache(),
  queryDeduplication: false,
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
    },
  },
});
function App() {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <div className="App">
          <header className="App-header">
            <Stack direction="row" spacing={2}>
              <Button variant="contained" href="/users">View Users</Button>
              <Button variant="contained" href='/users/add-user/:id'>Add User</Button>
            </Stack>
          </header>
          <RenderRoutes />
        </div></BrowserRouter>

    </ApolloProvider>

  );
}

export default App;
