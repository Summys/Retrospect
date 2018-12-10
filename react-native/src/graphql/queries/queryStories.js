/* eslint-disable import/no-extraneous-dependencies */
import gql from 'graphql-tag';

export default gql`
  query stories($filters: JSON, $options: JSON) {
    stories(filters: $filters, options: $options) {
      _id
      name
      description
      isActive
      createdAt
    }
  }
`;
