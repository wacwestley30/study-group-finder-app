import { gql } from '@apollo/client';

export const GET_USERS = gql`
  query getUsers {
    users {
      _id
      username
      email
      groups {
        _id
        name
        members {
          _id
          username
        }
      }
    }
  }
`;

export const GET_USER = gql`
  query getUser($username: String!) {
    user(username: $username) {
      _id
      username
      email
      groups {
        _id
        name
      }
    }
  }
`;

export const GET_GROUPS = gql`
  query getGroups {
    groups {
      _id
      name
      members {
        _id
        username
        email
      }
    }
  }
`;