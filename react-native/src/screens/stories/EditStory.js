/* eslint-disable no-underscore-dangle */
import React, { Component } from 'react';
import { View, TextInput, Switch, SafeAreaView, Text, Button } from 'react-native';
import PropTypes from 'prop-types';
import { withApollo } from 'react-apollo';
import { Navigation } from 'react-native-navigation';
import EDIT_STORY from '../../graphql/mutations/storyEdit';
import QUERY_STORIES from '../../graphql/queries/queryStories';

const defaultStyle = { borderWidth: 1, marginHorizontal: 50 };
const defaultTextStyle = { marginHorizontal: 50 };

class EditStory extends Component {
  static getDerivedStateFromProps = (props, state) => ({
    name: state.name || props.name,
    description: state.description || props.description,
    isActive: state.isActive !== undefined ? state.isActive : props.isActive,
  });

  state = {
    name: undefined,
    description: undefined,
    isActive: undefined,
  };

  onUpdate = () => {
    const { client, _id } = this.props;
    const { name, description, isActive } = this.state;
    let { stories } = client.readQuery({
      query: QUERY_STORIES,
      variables: { filters: {}, options: {} },
    });
    const storyIndex = stories.findIndex(story => story._id === _id);
    const updatedStory = {
      ...stories[storyIndex],
      name,
      description,
      isActive,
    };
    stories = [...stories.slice(0, storyIndex), updatedStory, ...stories.slice(storyIndex + 1)];
    client.writeQuery({
      query: QUERY_STORIES,
      variables: { filters: {}, options: {} },
      data: { stories },
    });
  };

  handleUpdateStory = async () => {
    const { client, _id, componentId } = this.props;
    const { name, description, isActive } = this.state;
    // const optimisticResponse = {
    //   __typename: "Mutation",
    //   storyEdit: {
    //     __typename: "Story",
    //     _id,
    //     name,
    //     description,
    //     isActive,
    //     createdAt: new Date()
    //   }
    // };
    try {
      await client.mutate({
        variables: {
          storyId: _id,
          data: {
            name,
            description,
            isActive,
          },
        },
        mutation: EDIT_STORY,
        // optimisticResponse,
        // errorPolicy: "ignore",
        update: this.onUpdate(),
      });
    } catch {
      this.onUpdate();
    }
    Navigation.pop(componentId);
  };

  render() {
    const { name, description, isActive } = this.state;
    return (
      <SafeAreaView>
        <View>
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
        <Button onPress={this.handleUpdateStory} title="Update" />
      </SafeAreaView>
    );
  }
}

EditStory.propTypes = {
  client: PropTypes.instanceOf(Object).isRequired,
  _id: PropTypes.string.isRequired,
};

export default withApollo(EditStory);
