/* eslint-disable no-underscore-dangle */
import React from 'react';
import { View, Text, TouchableHighlight } from 'react-native';
import PropTypes from 'prop-types';
import { Navigation } from 'react-native-navigation';
import { withApollo } from 'react-apollo';
import StoryStyles from './StoryStyles';
import { EDIT_STORY_SCREEN } from '../../helpers/setScreens';
import REMOVE_STORY from '../../graphql/mutations/storyDelete';
import QUERY_STORIES from '../../graphql/queries/queryStories';

const { listItem, firstColumn, secondColumn, edit, remove } = StoryStyles;

const deleteStoryOptimistic = (storyId, client) => {
  const { stories } = client.readQuery({
    query: QUERY_STORIES,
    variables: { filters: {}, options: {} },
  });
  const storyIndex = stories.findIndex(story => story._id === storyId);
  stories.splice(storyIndex, 1);
  client.writeQuery({
    query: QUERY_STORIES,
    variables: { filters: {}, options: {} },
    data: { stories },
  });
};

const handleDeleteStory = async (storyId, client) => {
  const optimisticResponse = {
    __typename: 'Mutation',
    storyDelete: {
      __typename: 'StoryDeleteSuccess',
      _id: storyId,
    },
  };
  await client.mutate({
    variables: { storyId },
    mutation: REMOVE_STORY,
    update: deleteStoryOptimistic(storyId, client),
    optimisticResponse,
  });
};

const handleEditStory = (componentId, item) => {
  Navigation.push(componentId, {
    component: {
      name: EDIT_STORY_SCREEN,
      passProps: item,
    },
  });
};

const StoryItem = ({ componentId, item, client }) => (
  <View style={listItem}>
    <View style={firstColumn}>
      <Text>{item.name}</Text>
      <Text>{item.description}</Text>
    </View>
    <View style={secondColumn}>
      <TouchableHighlight style={edit} onPress={() => handleEditStory(componentId, item)}>
        <Text>Edit</Text>
      </TouchableHighlight>

      <TouchableHighlight style={remove} onPress={() => handleDeleteStory(item._id, client)}>
        <Text>Remove</Text>
      </TouchableHighlight>
    </View>
  </View>
);

StoryItem.propTypes = {
  componentId: PropTypes.string.isRequired,
  item: PropTypes.instanceOf(Object).isRequired,
  client: PropTypes.instanceOf(Object).isRequired,
};

export default withApollo(StoryItem);
