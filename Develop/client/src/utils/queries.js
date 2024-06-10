import { gql } from '@apollo/client';

export const GET_ME = gql`
  query getMe {
    me {
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

export const GET_GROUP = gql`
  query getGroup($groupId: ID!) {
    group(groupId: $groupId) {
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