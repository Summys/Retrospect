import gql from 'graphql-tag';

export default gql`
  mutation storyEdit($storyId: String!, $data: StoryCreateInput) {
    storyEdit(storyId: $storyId, data: $data) {
      _id
      name
      description
      isActive
      createdAt
    }
  }
`;
