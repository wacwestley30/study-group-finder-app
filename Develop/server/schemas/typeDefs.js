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
  }

  type Auth {
    token: String!
    user: User
  }

  type Query {
    users: [User]
    groups: [Group]
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    addGroup(name: String!): Group
    joinGroup(userId: ID!, groupId: ID!): User
  }
`;

module.exports = typeDefs;