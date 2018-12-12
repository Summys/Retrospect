/* eslint-disable no-underscore-dangle */
import React from 'react';
import { ApolloProvider } from 'react-apollo';
import { offlineLink, client, promisePersistCache } from './client';

export default function withProvider(WrappedComponent) {
  class ApolloHOC extends React.Component {
    componentDidMount() {
      promisePersistCache.then(() => {
        offlineLink.setup(client);
      });
    }

    render() {
      return (
        <ApolloProvider client={client}>
          <WrappedComponent {...this.props} />
        </ApolloProvider>
      );
    }
  }
  return ApolloHOC;
}
