const { User, Group } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');
const { Types } = require('mongoose');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findById(context.user._id).populate({
          path: 'groups',
          populate: {
            path: 'members'
          }
        }).select('-__v -password');
        return userData;
      }
      throw new AuthenticationError('You must be logged in');
    },
    users: async () => {
      return User.find().populate({
        path: 'groups',
        populate: {
          path: 'members'
        }
      });
    },
    user: async (parent, { userId }) => {
      if (!Types.ObjectId.isValid(userId)) {
        throw new Error('Invalid user ID');
      }

      return User.findById(userId).populate({
        path: 'groups',
        populate: {
          path: 'members'
        }
      });
    },
    groups: async () => {
      return Group.find().populate('members');
    },
    group: async (parent, { groupId }) => {
      return Group.findById(groupId).populate('members');
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
    editUser: async (_, { university, major, year }, { user }) => {
      if (!user) {
        throw AuthenticationError;
      }
      return await User.findByIdAndUpdate(user._id, {
        university,
        major,
        year
      }, { new: true });
    },
    removeUser: async (parent, { userId }) => {
      const user = await User.findById(userId);
      if (!user) {
        throw new Error('User not found');
      }

      // Remove the user from all groups' members array
      await Group.updateMany(
        { members: userId },
        { $pull: { members: userId } }
      );

      // Remove the user
      await User.findByIdAndDelete(userId);

      return user;
    },
    addGroup: async (parent, { name, subject, description }, context) => {
      if (!context.user) {
        throw new AuthenticationError('You must be logged in');
      }

      const group = await Group.create({
        name,
        subject,
        description,
        members: [context.user._id]
      });

      // Add group to the user's groups
      await User.findByIdAndUpdate(context.user._id, {
        $push: { groups: group._id }
      });

      return group.populate('members');
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

      if (!user.groups.includes(groupId)) {
        user.groups.push(groupId);
        await user.save();
      }

      if (!group.members.includes(userId)) {
        group.members.push(userId);
        await group.save();
      }

      return user.populate({
        path: 'groups',
        populate: {
          path: 'members'
        }
      });
    },
    leaveGroup: async (parent, { userId, groupId }) => {
      const user = await User.findById(userId);
      if (!user) {
        throw new Error('User not found');
      }

      const group = await Group.findById(groupId);
      if (!group) {
        throw new Error('Group not found');
      }

      // Remove the group from the user's groups array
      if (user.groups.includes(groupId)) {
        user.groups = user.groups.filter(id => id.toString() !== groupId);
        await user.save();
      }

      // Remove the user from the group's members array
      if (group.members.includes(userId)) {
        group.members = group.members.filter(id => id.toString() !== userId);
        await group.save();
      }

      return user.populate({
        path: 'groups',
        populate: {
          path: 'members'
        }
      });
    },
    removeGroup: async (parent, { groupId }) => {
      const group = await Group.findById(groupId);
      if (!group) {
        throw new Error('Group not found');
      }

      // Remove the group from all users' groups array
      await User.updateMany(
        { groups: groupId },
        { $pull: { groups: groupId } }
      );

      // Remove the group
      await Group.findByIdAndDelete(groupId);

      return group;
    }
  }
}

module.exports = resolvers;