import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import { ReactNativeFile } from 'apollo-upload-client';
import { withApollo } from 'react-apollo';
import uuidv4 from 'uuid/v4';
import UPLOAD_MUTATION from '../../graphql/mutations/uploadFile';

// More info on all the options is below in the API Reference... just some common use cases shown here
const options = {
  title: 'Select Avatar',
  customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  uploadAvatar: {
    width: 300,
    height: 300,
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
});

class Settings extends Component {
  state = {
    avatarSource: null,
  };

  handleUpload = async response => {
    const { client } = this.props;
    const optimisticResponse = {
      __typename: 'Mutation',
      singleUpload: {
        __typename: 'File',
        id: uuidv4(),
        filename: response.fileName,
        type: response.type,
        path: response.uri,
      },
    };
    const file = new ReactNativeFile({
      uri: response.uri,
      filename: response.fileName,
      type: response.type,
    });
    await client.mutate({
      mutation: UPLOAD_MUTATION,
      variables: { file },
      optimisticResponse,
    });
  };

  takePicture = async () => {
    ImagePicker.showImagePicker(options, response => {
      console.log('RESPONSE', response);
      if (response.didCancel) {
        // console.log('User cancelled image picker');
      } else if (response.error) {
        // console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        // console.log('User tapped custom button: ', response.customButton);
      } else {
        this.handleUpload(response);
      }
    });
  };

  render() {
    const { avatarSource } = this.state;
    return (
      <View style={styles.container}>
        <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
          <TouchableOpacity onPress={this.takePicture} style={styles.capture}>
            <Text style={{ fontSize: 14 }}> SNAP </Text>
          </TouchableOpacity>
        </View>
        <Image source={avatarSource} style={styles.uploadAvatar} />
      </View>
    );
  }
}

export default withApollo(Settings);
