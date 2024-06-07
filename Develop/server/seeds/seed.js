const db = require('../config/connection')
const { User, Group } = require('../models');
const cleanDB = require('./cleanDB');
const usersData = require('./userSeed');
const groupsData = require('./groupSeed')

db.once('open', async () => {
  try {

    await cleanDB('Group', 'groups');  

    await cleanDB('User', 'users');

    await User.create(usersData);

    await Group.create(groupsData);

    } catch (error) {
        
        console.error('Error inserting seed data:', error);
        process.exit(1);
        
    }

    console.log('Seed data inserted!');
    process.exit(0);
});