import React, { Component } from 'react';
import { SafeAreaView, Text } from 'react-native';

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <SafeAreaView>
        <Text>Search. Wake up ! :)</Text>
      </SafeAreaView>
    );
  }
}
