import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import { getStorybookUI, configure } from '@storybook/react-native';
import { Navigation } from "react-native-navigation";

// import stories
configure(() => {
  require('./stories');
}, module);

// This assumes that storybook is running on the same host as your RN packager,
// to set manually use, e.g. host: 'localhost' option

const StorybookUIRoot = getStorybookUI({ port: 7007 })

class StorybookUIHMRRoot extends Component {
  render() {
    return <StorybookUIRoot />;
  }
}


export default StorybookUIHMRRoot
