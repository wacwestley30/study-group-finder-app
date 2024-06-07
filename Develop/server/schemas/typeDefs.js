const typeDefs = `
  type User {
    _id: ID!
    firstName: String
    lastName: String
    username: String!
    email: String!
    password: String
    university: String
    major: String
    year: Int
    groups: [Group]
  }

  type Group {
    _id: ID!
    name: String!
    subject: String!
    description: String
    members: [User]
    schedule: Schedule
  }
  
  type Schedule {
    sunday: Boolean
    monday: Boolean
    tuesday: Boolean
    wednesday: Boolean
    thursday: Boolean
    friday: Boolean
    saturday: Boolean
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
    addUser(username: String!, email: String!, password: String!, firstName: String, lastName: String, university: String, major: String, year: Int): Auth
    removeUser(userId: ID!): User
    addGroup(name: String!, subject: String!, description: String, schedule: ScheduleInput): Group
    joinGroup(userId: ID!, groupId: ID!): User
    leaveGroup(userId: ID!, groupId: ID!): User
    removeGroup(groupId: ID!): Group
  }

  input ScheduleInput {
    sunday: Boolean
    monday: Boolean
    tuesday: Boolean
    wednesday: Boolean
    thursday: Boolean
    friday: Boolean
    saturday: Boolean
  }
`;

module.exports = typeDefs;