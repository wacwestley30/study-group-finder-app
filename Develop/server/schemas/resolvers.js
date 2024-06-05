const { User, Group } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate('groups');
    },
    groups: async () => {
      return Group.find();
    }
  },
  Mutation: {
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw AuthenticationError;
      }

      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw AuthenticationError;
      }

      const token = signToken(user);
      return { token, user };
    },
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);
      return { token, user };
    },
    addGroup: async (parent, { name }) => {
      const group = await Group.create({ name });
      return group;
    },
    joinGroup: async (parent, { userId, groupId }) => {
      const user = await User.findById(userId);
      if (!user) {
        throw new Error('User not found');
      }

      const group = await Group.findById(groupId);
      if (!group) {
        throw new Error('Group not found');
      }

      user.groups.push(group);
      await user.save();

      return user.populate('groups');
    }
  }
}

module.exports = resolvers;