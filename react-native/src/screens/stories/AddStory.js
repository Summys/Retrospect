/* eslint-disable no-underscore-dangle */
import React, { Component } from 'react';
import { View, TextInput, Switch, SafeAreaView, Text, Button } from 'react-native';
import PropTypes from 'prop-types';
import { withApollo } from 'react-apollo';
import { Navigation } from 'react-native-navigation';
import uuidv4 from 'uuid/v4';
import ADD_STORY from '../../graphql/mutations/storyCreate';
import QUERY_STORIES from '../../graphql/queries/queryStories';
import OfflineNotice from '../../common/NetworkConnectivity';

const defaultStyle = { borderWidth: 1, marginHorizontal: 50 };
const defaultTextStyle = { marginHorizontal: 50 };

const onAdd = (cache, optimisticResponse) => {
  const { stories } = cache.readQuery({
    query: QUERY_STORIES,
    variables: { filters: {}, options: {} },
  });
  const { storyCreate } = optimisticResponse;
  stories.push(storyCreate);
  cache.writeQuery({
    query: QUERY_STORIES,
    variables: { filters: {}, options: {} },
    data: { stories },
  });
};

class AddStory extends Component {
  state = {
    name: '',
    description: '',
    isActive: false,
  };

  handleAddStory = async () => {
    const { client, componentId } = this.props;
    const { name, description, isActive } = this.state;
    const _id = uuidv4();
    const createdAt = new Date();
    const optimisticResponse = {
      __typename: 'Mutation',
      storyCreate: {
        __typename: 'Story',
        _id,
        name,
        description,
        isActive,
        createdAt: createdAt.toJSON(),
      },
    };
    await client.mutate({
      variables: {
        data: {
          _id,
          name,
          description,
          isActive,
          createdAt: createdAt.toJSON(),
        },
      },
      mutation: ADD_STORY,
      update: cache => onAdd(cache, optimisticResponse),
      optimisticResponse,
    });
    Navigation.pop(componentId);
  };

  render() {
    const { name, description, isActive } = this.state;
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <OfflineNotice />
        <View style={{ flex: 0.8 }}>
          <Text style={defaultTextStyle}> Name</Text>
          <TextInput
            style={defaultStyle}
            onChangeText={text => this.setState({ name: text })}
            keyboard="email-address"
            placeholder="Name"
            returnKeyType="next"
            blurOnSubmit={false}
            editable
            value={name}
          />
          <Text style={defaultTextStyle}> Description</Text>
          <TextInput
            style={defaultStyle}
            onChangeText={text => this.setState({ description: text })}
            multiline
            editable
            placeholder="Description"
            keyboard="default"
            secureTextEntry
            value={description}
          />
          <Text>Is active ?</Text>
          <Switch value={isActive} onValueChange={value => this.setState({ isActive: value })} />
        </View>
        <Button onPress={this.handleAddStory} title="Add" />
      </SafeAreaView>
    );
  }
}

AddStory.propTypes = {
  client: PropTypes.instanceOf(Object).isRequired,
};

export default withApollo(AddStory);
