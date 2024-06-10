const db = require('../config/connection');
const { User, Group } = require('../models');
const cleanDB = require('./cleanDB');
const usersData = require('./userSeed');
const groupsData = require('./groupSeed');

const getUsersObjectIds = async () => {
  const users = await User.find();
  const userMap = {};
  users.forEach(user => {
    userMap[user.username] = user._id;
  });
  return userMap;
};

db.once('open', async () => {
  try {
    await cleanDB('Group', 'groups');
    await cleanDB('User', 'users');
    
    await User.create(usersData);
    
    const userMap = await getUsersObjectIds();
    
    const updatedGroupsData = groupsData.map(group => {
      return {
        ...group,
        members: group.members.map(username => userMap[username])
      };
    });
    
    await Group.create(updatedGroupsData);
    
    console.log('Seed data inserted!');
    process.exit(0);
  } catch (error) {
    console.error('Error inserting seed data:', error);
    process.exit(1);
  }
});
