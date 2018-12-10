/* eslint-disable no-underscore-dangle */
import React from 'react';
import { SafeAreaView, Text, FlatList } from 'react-native';
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
      <OfflineNotice style={{ flex: 0.1 }} />
      <Query
        query={QUERY_STORIES}
        variables={{ filters, options }}
        fetchPolicy="cache-and-network"
        errorPolicy="all"
      >
        {({ loading, data, error }) => {
          if (loading) return <Text> loading </Text>;
          if (error) return <Text> oops. ..</Text>;
          return (
            <FlatList
              style={{ flex: 0.9, paddingTop: 50 }}
              data={data.stories}
              keyExtractor={item => item._id}
              renderItem={({ item }) => <StoryItem componentId={componentId} item={item} />}
              ItemSeparatorComponent={() => <StoryItemSeparator />}
            />
          );
        }}
      </Query>
    </SafeAreaView>
  );
};

Stories.propTypes = {
  componentId: PropTypes.string.isRequired,
};

export default Stories;
