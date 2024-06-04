const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../../models/User.js');

jest.mock('mongoose', () => ({
    connect: jest.fn().mockResolvedValue(undefined),
}));

jest.mock('bcrypt', () => ({
    hash: jest.fn(),
}));

describe('User Model Tests', () => {
    beforeEach(async () => {
        await mongoose.connect();
    });

    afterEach(async () => {
        await mongoose.disconnect();
    });

    // beforeEach/afterEach to delete test data?

    // Test the User model
    it('Creates a new user with each field filled with correct data', async () => {
        const user = new User({
            firstName: 'John',
            lastName: 'Doe',
            username: 'johndoe',
            email: 'john.doe@example.com',
            password: 'securePassword',
            university: 'Example University',
            major: 'Computer Science',
            year: 2,
            groups: [],
        });

        // Test that a new User is created
        await expect(user.save()).resolves.toBeTruthy();

        // Test for User's username [required]
        // Test for User's email [required]
        // Test for User's groups subdoc [required but can be an empty array]
        // Test for User's first name [not required]
        // Test for User's last name [not required]
        // Test for User's university [not required]
        // Test for User's major [not required]
        // Test for User's year [not required]
    });

    // Test for User's password **(with bcrypt hashing)**
    it('Hashes password using bcrypt', async () => {
        const password = 'securePassword';
        const hashedPass = await bcrypt.hash(password, 10);
        const user = new User({ password });

        await user.save();
        expect(bcrypt.hash).toHaveBeenCalledWith(password, 10);
        expect(user.password).toBe(hashedPass);
    });
});