import React, { Component } from 'react';
import { SafeAreaView, Text } from 'react-native';

export default class ResetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <SafeAreaView>
        <Text> ResetPassword </Text>
      </SafeAreaView>
    );
  }
}
