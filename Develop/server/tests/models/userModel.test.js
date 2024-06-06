const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
// const User = require('../../models/User.js');

jest.mock('mongoose', () => ({
    connect: jest.fn().mockResolvedValue(undefined),
    disconnect: jest.fn().mockResolvedValue(undefined),
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

    // Test the User model
    it('Creates a new user with each field correctly filled', async () => {
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

        // Test for User's first name [not required]
        expect(user.firstName).toBe('John');

        // Test for User's last name [not required]
        expect(user.lastName).toBe('Doe');
        
        // Test for User's username [required]
        expect(user.username).toBe('johndoe');

        // Test for User's email [required]
        expect(user.email).toBe('john.doe@example.com');

        // Test for User's university [not required]
        expect(user.university).toBe('Example University');

        // Test for User's major [not required]
        expect(user.major).toBe('Computer Science');

        // Test for User's year [not required]
        expect(user.year).toBe(2);

        // Test for User's groups subdoc [required but can be an empty array]
        expect(user.groups).toEqual([]);

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