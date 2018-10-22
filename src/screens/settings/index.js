import React, { Component } from 'react';
import { SafeAreaView, Text } from 'react-native';

export default class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <SafeAreaView>
        <Text> Settings </Text>
      </SafeAreaView>
    );
  }
}
