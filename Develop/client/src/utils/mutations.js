import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

export const EDIT_USER = gql`
  mutation editUser($firstName: String, $lastName: String, $university: String, $major: String, $year: Int) {
    editUser(firstName: $firstName, lastName: $lastName, university: $university, major: $major, year: $year) {
      _id
      username
      email
      firstName
      lastName
      university
      major
      year
    }
  }
`;

export const REMOVE_USER = gql`
  mutation removeUser($userId: ID!) {
    removeUser(userId: $userId) {
      _id
      username
      email
    }
  }
`;

export const ADD_GROUP = gql`
  mutation addGroup($name: String!, $subject: String, $description: String) {
    addGroup(name: $name, subject: $subject, description: $description) {
      _id
      name
      subject
      description
    }
  }
`;

export const JOIN_GROUP = gql`
  mutation joinGroup($userId: ID!, $groupId: ID!) {
    joinGroup(userId: $userId, groupId: $groupId) {
      _id
      username
      email
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
  }
`;

export const LEAVE_GROUP = gql`
  mutation leaveGroup($userId: ID!, $groupId: ID!) {
    leaveGroup(userId: $userId, groupId: $groupId) {
      _id
      username
      email
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
  }
`;

export const REMOVE_GROUP = gql`
  mutation removeGroup($groupId: ID!) {
    removeGroup(groupId: $groupId) {
      _id
      name
    }
  }
`;