const db = require('../config/connection');
const { User, Group } = require('../models');
const cleanDB = require('./cleanDB');
const usersData = require('./userSeed');
const groupsData = require('./groupSeed');

const seedUsersAndGroups = async () => {

  // Clean DB
  await cleanDB('Group', 'groups');
  await cleanDB('User', 'users');

  // Insert users
  const createdUsers = await User.create(usersData);

  // Get user IDs
  const userMap = {};
  createdUsers.forEach(user => {
    userMap[user.username] = user._id;
  });

  // Update group data with user IDs and user group associations
  const updatedGroupsData = groupsData.map(group => {
    const memberIds = group.members.map(username => userMap[username]);
    return {
      ...group,
      members: memberIds
    };
  });

  // Insert groups
  const createdGroups = await Group.create(updatedGroupsData);

  // Update user group associations
  for (const group of createdGroups) {
    for (const memberId of group.members) {
      await User.findByIdAndUpdate(memberId, { $addToSet: { groups: group._id } });
    }
  }
};

db.once('open', async () => {
  try {
    await seedUsersAndGroups();
    console.log('Seed data inserted!');
    process.exit(0);
  } catch (error) {
    console.error('Error inserting seed data:', error);
    process.exit(1);
  }
});