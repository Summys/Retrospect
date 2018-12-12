import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View, Text, NetInfo, Dimensions, StyleSheet } from 'react-native';
import { withApollo, Query } from 'react-apollo';
import { offlineLink } from '../helpers/client';
import { syncStatusQuery } from '../helpers/OfflineLink';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  offlineContainer: {
    backgroundColor: '#b52424',
  },
  onlineContainer: {
    backgroundColor: 'green',
  },
  container: {
    flex: 0.05,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width,
  },
  text: { color: '#fff' },
});
const networkActivity = isConnected => ` You are ${isConnected ? 'connected' : 'disconnected'}`;

const MiniOfflineSign = ({ isConnected, syncing }) => (
  <View style={[styles.container, isConnected ? styles.onlineContainer : styles.offlineContainer]}>
    <Text style={styles.text}>{syncing ? 'Syncing...' : networkActivity(isConnected)}</Text>
  </View>
);

MiniOfflineSign.propTypes = {
  isConnected: PropTypes.bool.isRequired,
  syncing: PropTypes.bool.isRequired,
};

class OfflineNotice extends PureComponent {
  state = {
    isConnected: true,
  };

  componentDidMount() {
    NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectivityChange);
  }

  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectivityChange);
  }

  handleConnectivityChange = isConnected => {
    if (isConnected) {
      this.setState({ isConnected });
    } else {
      this.setState({ isConnected });
    }
    offlineLink.sync();
  };

  render() {
    const { isConnected } = this.state;
    return (
      <Query query={syncStatusQuery}>
        {({ data }) => <MiniOfflineSign isConnected={isConnected} syncing={data.inflight} />}
      </Query>
    );
  }
}
export default withApollo(OfflineNotice);
