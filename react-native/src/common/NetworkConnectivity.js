import React, { PureComponent } from 'react';
import { View, Text, NetInfo, Dimensions, StyleSheet } from 'react-native';
import { withApollo } from 'react-apollo';
import { offlineLink } from '../helpers/client';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  offlineContainer: {
    backgroundColor: '#b52424',
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width,
    position: 'absolute',
    top: 30,
  },
  offlineText: { color: '#fff' },
});

function MiniOfflineSign() {
  return (
    <View style={styles.offlineContainer}>
      <Text style={styles.offlineText}>No Internet Connection</Text>
    </View>
  );
}

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
      offlineLink.open();
    } else {
      this.setState({ isConnected });
      offlineLink.close();
    }
  };

  render() {
    const { isConnected } = this.state;
    if (!isConnected) {
      return <MiniOfflineSign />;
    }
    return null;
  }
}

export default withApollo(OfflineNotice);
