import gql from 'graphql-tag';

export default gql`
  mutation storyCreate($data: StoryCreateInput) {
    storyCreate(data: $data) {
      _id
      name
      description
      isActive
      createdAt
    }
  }
`;
