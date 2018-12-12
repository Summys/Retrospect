import gql from 'graphql-tag';

export default gql`
  mutation storyEdit($storyId: String!, $data: StoryEditInput) {
    storyEdit(storyId: $storyId, data: $data) {
      _id
      name
      description
      isActive
      createdAt
    }
  }
`;
