import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';

const link = new HttpLink({
  uri: 'https://rickandmortyapi.com/graphql'
});

export const client = new ApolloClient({
  link: link,
  cache: new InMemoryCache()
});
