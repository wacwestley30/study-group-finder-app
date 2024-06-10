import { gql } from '@apollo/client';

export const GET_ME = gql`
  query getMe {
    me {
      _id
      firstName
      lastName
      username
      email
      university
      major
      year
      groups {
        _id
        name
        subject
        description
        members {
          _id
          username
        }
      }
    }
  }
`;

export const GET_USER = gql`
  query getUser($userId: ID!) {
    user(userId: $userId) {
      _id
      firstName
      lastName
      username
      email
      university
      major
      year
      groups {
        _id
        name
        subject
        description
        members {
          _id
          username
        }
      }
    }
  }
`;

export const GET_USERS = gql`
  query getUsers {
    users {
      _id
      firstName
      lastName
      username
      email
      university
      major
      year
      groups {
        _id
        name
        subject
        description
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
      subject
      description
      members {
        _id
        firstName
        lastName
        username
        email
        university
        major
        year
      }
    }
  }
`;

export const GET_GROUPS = gql`
  query getGroups {
    groups {
      _id
      name
      subject
      description
      members {
        _id
        firstName
        lastName
        username
        email
        university
        major
        year
      }
    }
  }
`;