import React, { Component } from 'react';
import { Navigation } from 'react-native-navigation';
import { SafeAreaView, Text, Button } from 'react-native';
import { withApollo } from 'react-apollo';
import PropTypes from 'prop-types';
import ComponentRegister from '../../features/auth/children/ComponentRegister';
import app from '../../features/app';

class Login extends Component {
  state = {};

  navigateToRegister = () => {
    const { componentId } = this.props;
    Navigation.push(componentId, ComponentRegister);
  };

  render() {
    return (
      <SafeAreaView>
        <Text> Login </Text>
        <Button onPress={this.navigateToRegister} title="Go to Register" />
        <Button onPress={app} title="Login" />
      </SafeAreaView>
    );
  }
}

Login.propTypes = {
  componentId: PropTypes.string.isRequired,
};

export default withApollo(Login, { withRef: true });
