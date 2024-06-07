const typeDefs = `
  type User {
    _id: ID!
    username: String!
    email: String!
    password: String
    groups: [Group]
  }

  type Group {
    _id: ID!
    name: String!
    members: [User]
  }

  type Auth {
    token: String!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
    groups: [Group]
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    removeUser(userId: ID!): User
    addGroup(name: String!): Group
    joinGroup(userId: ID!, groupId: ID!): User
    leaveGroup(userId: ID!, groupId: ID!): User
    removeGroup(groupId: ID!): Group
  }
`;

module.exports = typeDefs;