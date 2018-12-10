/* eslint-disable no-underscore-dangle */
import React from 'react';
import { Text, AsyncStorage } from 'react-native';
import { ApolloProvider } from 'react-apollo';
import ApolloClient from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { persistCache } from 'apollo-cache-persist';
import { RetryLink } from 'apollo-link-retry';
import QueueLink from 'apollo-link-queue';
import { ApolloLink } from 'apollo-link';
import Config from '../config/config.env';

export default function withProvider(WrappedComponent) {
  class ApolloHOC extends React.Component {
    state = {
      client: null,
      loaded: false,
    };

    async componentDidMount() {
      const cache = new InMemoryCache({
        dataIdFromObject: object => object._id || null,
      });

      const offlineLink = new QueueLink();

      const httpLink = new HttpLink({
        uri: Config.ENDPOINT,
      });
      const retryLink = new RetryLink();

      const authMiddleware = setContext(() =>
        AsyncStorage.getItem('Meteor.loginToken').then(loginToken => ({
          headers: {
            'meteor-login-token': loginToken,
          },
        }))
      );

      const link = ApolloLink.from([offlineLink, retryLink, httpLink]);
      const client = new ApolloClient({
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

      persistCache({
        cache,
        storage: AsyncStorage,
        maxSize: false,
      });

      this.setState({
        client,
        loaded: true,
      });
    }

    render() {
      const { client, loaded } = this.state;

      if (!loaded) {
        return <Text>Loading...</Text>;
      }
      return (
        <ApolloProvider client={client}>
          <WrappedComponent {...this.props} />
        </ApolloProvider>
      );
    }
  }
  return ApolloHOC;
}
