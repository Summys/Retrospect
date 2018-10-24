import React from 'react';
import { ApolloProvider } from 'react-apollo';

export default function withProvider(WrappedComponent, client) {
  return class ApolloHOC extends React.Component {
    constructor(props) {
      super(props);
      this.state = {};
    }

    render() {
      return (
        <ApolloProvider client={client}>
          <WrappedComponent {...this.props} />
        </ApolloProvider>
      );
    }
  };
}
