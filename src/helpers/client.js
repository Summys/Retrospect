import { AsyncStorage } from 'react-native';
import ApolloClient from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';
import Config from '../config/config.env';
/* eslint no-underscore-dangle: 0 */
export default () => {
  const httpLink = new HttpLink({
    uri: Config.ENDPOINT,
  });

  const authMiddleware = setContext(() =>
    AsyncStorage.getItem('Meteor.loginToken').then(loginToken => ({
      headers: {
        'meteor-login-token': loginToken,
      },
    }))
  );

  const client = new ApolloClient({
    link: authMiddleware.concat(httpLink),
    cache: new InMemoryCache({
      dataIdFromObject: object => object._id || null,
    }),
  });
  return client;
};
