import React, { Component } from 'react';
import { SafeAreaView, Text } from 'react-native';

export default class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <SafeAreaView>
        <Text> Account </Text>
      </SafeAreaView>
    );
  }
}
