import React, { Component } from 'react';
import { SafeAreaView, Text } from 'react-native';
// import { Navigation } from 'react-native-navigation';
// import PropTypes from 'prop-types';

export default class Stories extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  // componentDidMount() {
  // const { componentId } = this.props;
  // Navigation.push(componentId, {
  //   component: {
  //     name: 'Login',
  //     passProps: {
  //       text: 'Pushed screen',
  //     },
  //     options: {
  //       topBar: {
  //         title: {
  //           text: 'Pushed screen title',
  //         },
  //       },
  //     },
  //   },
  // });
  // }

  render() {
    return (
      <SafeAreaView>
        <Text>Hello it works! Yeeeey :)</Text>
      </SafeAreaView>
    );
  }
}

// Stories.propTypes = {
//   componentId: PropTypes.string.isRequired,
// };
