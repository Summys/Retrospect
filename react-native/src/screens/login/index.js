/* eslint-disable no-underscore-dangle */
import React, { Component } from 'react';
import { Navigation } from 'react-native-navigation';
import { SafeAreaView, View, TextInput, Button, AsyncStorage } from 'react-native';
import { withApollo } from 'react-apollo';
import PropTypes from 'prop-types';
import { loginWithPassword, setTokenStore } from 'meteor-apollo-accounts';
import ComponentRegister from '../../features/auth/children/ComponentRegister';
import app from '../../features/app';

const defaultStyle = { borderWidth: 1, marginHorizontal: 50 };

class Login extends Component {
  state = {};

  emailRef = React.createRef();

  passwordRef = React.createRef();

  async componentDidMount() {
    setTokenStore({
      async set({ userId, token, tokenExpires }) {
        await AsyncStorage.setItem('Meteor.userId', userId);
        await AsyncStorage.setItem('Meteor.loginToken', token);
        await AsyncStorage.setItem('Meteor.loginTokenExpires', tokenExpires.toString());
      },
      async get() {
        return {
          userId: await AsyncStorage.getItem('Meteor.userId'),
          token: await AsyncStorage.getItem('Meteor.loginToken'),
          tokenExpires: await AsyncStorage.getItem('Meteor.loginTokenExpires'),
        };
      },
    });
  }

  navigateToRegister = () => {
    const { componentId } = this.props;
    Navigation.push(componentId, ComponentRegister);
  };

  login = async () => {
    const { client } = this.props;
    let email = this.emailRef.current._lastNativeText;
    const password = this.passwordRef.current._lastNativeText;
    if (email) {
      email = email.toLowerCase();
    }
    loginWithPassword({ email, password }, client)
      .then(() => {
        app();
      })
      .catch(e => console.log(e));
  };

  render() {
    return (
      <SafeAreaView>
        <View>
          <TextInput
            style={defaultStyle}
            ref={this.emailRef}
            keyboard="email-address"
            placeholder="Email"
            returnKeyType="next"
            blurOnSubmit={false}
            onSubmitEditing={() => this.passwordRef.current.focus()}
          />
          <TextInput
            style={defaultStyle}
            ref={this.passwordRef}
            placeholder="Password"
            keyboard="default"
            secureTextEntry
            onSubmitEditing={this.login}
          />
        </View>
        <Button onPress={this.navigateToRegister} title="Go to Register" />
        <Button onPress={this.login} title="Login" />
      </SafeAreaView>
    );
  }
}

Login.propTypes = {
  componentId: PropTypes.string.isRequired,
};

export default withApollo(Login, { withRef: true });
