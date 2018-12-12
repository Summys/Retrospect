/* eslint-disable no-underscore-dangle */
import React from 'react';
import { SafeAreaView, Text, FlatList, View } from 'react-native';
import { Query } from 'react-apollo';
import PropTypes from 'prop-types';
import QUERY_STORIES from '../../graphql/queries/queryStories';
import StoryItem from './StoryItem';
import StoryItemSeparator from './StoryItemSeparator';
import OfflineNotice from '../../common/NetworkConnectivity';

const Stories = ({ componentId }) => {
  const filters = {};
  const options = {};
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <OfflineNotice />
      <View style={{ flex: 0.95 }}>
        <Query query={QUERY_STORIES} variables={{ filters, options }}>
          {({ loading, data, error }) => {
            if (data.stories) {
              return (
                <FlatList
                  data={data.stories}
                  keyExtractor={item => item._id}
                  renderItem={({ item }) => <StoryItem componentId={componentId} item={item} />}
                  ItemSeparatorComponent={() => <StoryItemSeparator />}
                />
              );
            }
            if (loading) return <Text>loading</Text>;
            if (error) return <Text>{error.message}</Text>;
            return <Text>There is no data to show</Text>;
          }}
        </Query>
      </View>
    </SafeAreaView>
  );
};

Stories.propTypes = {
  componentId: PropTypes.string.isRequired,
};

export default Stories;
