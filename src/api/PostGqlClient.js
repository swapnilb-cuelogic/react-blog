import fetch from 'isomorphic-fetch';
import { ApolloClient, HttpLink, InMemoryCache } from 'apollo-client-preset';

global.fetch = fetch;

const uri = ' https://api.graph.cool/simple/v1/cjq4v4y82190p0185eyv48lwz';

export const PostGqlClient = new ApolloClient({
  link: new HttpLink({ uri }),
  cache: new InMemoryCache()
});