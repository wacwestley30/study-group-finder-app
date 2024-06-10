const typeDefs = `
  type User {
    _id: ID!
    firstName: String
    lastName: String
    username: String!
    email: String!
    password: String!
    university: String
    major: String
    year: Int
    groups: [Group]
  }

  type Group {
    _id: ID!
    name: String!
    subject: String
    description: String
    members: [User]
  }

  type Auth {
    token: String!
    user: User
  }

  type Query {
    me: User
    users: [User]
    user(userId: ID!): User
    groups: [Group]
    group(groupId: ID!): Group
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!, firstName: String, lastName: String, university: String, major: String, year: Int): Auth
    removeUser(userId: ID!): User
    addGroup(name: String!, subject: String, description: String): Group
    joinGroup(userId: ID!, groupId: ID!): User
    leaveGroup(userId: ID!, groupId: ID!): User
    removeGroup(groupId: ID!): Group
  }
`;

module.exports = typeDefs;