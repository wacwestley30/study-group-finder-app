const typeDefs = `
  type User {
    _id: ID!
    username: String!
    email: String!
    password: String
  }

  type Auth {
    token: String!
    user: User
  }

  type Query {
    users: [User]
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;