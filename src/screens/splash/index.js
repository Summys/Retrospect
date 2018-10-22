import React, { Component } from 'react';
import { SafeAreaView, Text } from 'react-native';
// import app from '../../features/app';
import auth from '../../features/auth';

export default class SplashScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    auth();
  }

  render() {
    return (
      <SafeAreaView>
        <Text> SplashScreen </Text>
      </SafeAreaView>
    );
  }
}
