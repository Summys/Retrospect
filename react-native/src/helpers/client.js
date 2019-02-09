/* eslint-disable no-underscore-dangle */
import { AsyncStorage } from 'react-native';
import ApolloClient from 'apollo-client';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { persistCache } from 'apollo-cache-persist';
import { ApolloLink } from 'apollo-link';
import { createUploadLink } from 'apollo-upload-client';
import Config from '../config/config.env';
import OfflineLink from './OfflineLink';

export const offlineLink = new OfflineLink({
  storage: AsyncStorage,
});

const cache = new InMemoryCache({
  dataIdFromObject: object => object._id || null,
});

export const promisePersistCache = persistCache({
  cache,
  storage: AsyncStorage,
  maxSize: false,
  debug: true,
});

// const httpLink = new HttpLink({
//   uri: Config.ENDPOINT,
// });

const authMiddleware = setContext(() =>
  AsyncStorage.getItem('Meteor.loginToken').then(loginToken => ({
    headers: {
      'meteor-login-token': loginToken,
    },
  }))
);

const link = ApolloLink.from([offlineLink, createUploadLink({ uri: Config.ENDPOINT })]);

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
