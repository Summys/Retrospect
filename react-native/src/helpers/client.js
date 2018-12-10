/* eslint-disable no-underscore-dangle */
import { AsyncStorage } from 'react-native';
import ApolloClient from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { persistCache } from 'apollo-cache-persist';
import { RetryLink } from 'apollo-link-retry';
import QueueLink from 'apollo-link-queue';
import { ApolloLink } from 'apollo-link';
import Config from '../config/config.env';

export const offlineLink = new QueueLink();

// async function getCache() {
//   const currentCache = await AsyncStorage.getItem("apollo-cache-persist");
const cache = new InMemoryCache({
  dataIdFromObject: object => object._id || null,
});
//   return cache
// }

// export default async () => {
const httpLink = new HttpLink({
  uri: Config.ENDPOINT,
});
const retryLink = new RetryLink();
// const onErrorLink = onError(({ response, graphQLErrors, networkError }) => {
//   console.log(networkError);
//   console.log(graphQLErrors);
//   response = { errors: null };
// });
const authMiddleware = setContext(() =>
  AsyncStorage.getItem('Meteor.loginToken').then(loginToken => ({
    headers: {
      'meteor-login-token': loginToken,
    },
  }))
);
persistCache({
  cache,
  storage: AsyncStorage,
  maxSize: false,
});

const link = ApolloLink.from([offlineLink, retryLink, httpLink]);
// const cache = getCache()
export const client = new ApolloClient({
  link: authMiddleware.concat(link),
  cache,
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
      errorPolicy: 'all',
    },
    query: {
      fetchPolicy: 'cache-and-network',
      errorPolicy: 'all',
    },
    mutate: {
      errorPolicy: 'all',
    },
  },
});
// const syncOfflineMutation = new SyncOfflineMutation({
//   apolloClient: client,
//   storage: AsyncStorage
// });
// await syncOfflineMutation.init();
// await syncOfflineMutation.sync();
// return client;
// };
