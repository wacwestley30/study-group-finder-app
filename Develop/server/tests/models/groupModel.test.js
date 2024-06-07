const mongoose = require('mongoose');
const { Group } = require('./Group');
const { User } = require('./User');

jest.mock('mongoose', () => ({
    connect: jest.fn().mockResolvedValue(undefined),
    disconnect: jest.fn().mockResolvedValue(undefined),
}));

describe('Group Model Tests', () => {
    beforeEach(async () => {
        await mongoose.connect();
    });

    afterEach(async () => {
        jest.clearAllMocks();
        await mongoose.disconnect();
    });

    // Test creating a group with all fields correctly filled
    it('Creates a new group with all fields correctly filled', async () => {
        const user = new User({
            firstName: 'Jane',
            lastName: 'Doe',
            username: 'janedoe',
            email: 'jane.doe@example.com',
            password: 'securePassword',
            university: 'Example University',
            major: 'Mathematics',
            year: 3,
            groups: [],
        });

        await user.save();

        const group = new Group({
            name: 'Study Group',
            subject: 'Math',
            description: 'A group to study math together',
            members: [user._id],
            schedule: {
                sunday: true,
                monday: false,
                tuesday: true,
                wednesday: false,
                thursday: true,
                friday: false,
                saturday: true,
            },
        });

        await expect(group.save()).resolves.toBeTruthy();
        expect(group.name).toBe('Study Group');
        expect(group.subject).toBe('Math');
        expect(group.description).toBe('A group to study math together');
        expect(group.members.length).toBe(1);
        expect(group.schedule.sunday).toBe(true);
    });

    // Test creating a group with members field missing
    it('Fails to create a new group without members', async () => {
        const group = new Group({
            name: 'Study Group',
            subject: 'Math',
            description: 'A group to study math together',
            // members is missing
            schedule: {
                sunday: true,
                monday: false,
                tuesday: true,
                wednesday: false,
                thursday: true,
                friday: false,
                saturday: true,
            },
        });

        await expect(group.save()).rejects.toThrow(mongoose.Error.ValidationError);
    });

    // Test creating a group with schedule field missing
    it('Creates a new group without schedule', async () => {
        const user = new User({
            firstName: 'John',
            lastName: 'Smith',
            username: 'johnsmith',
            email: 'john.smith@example.com',
            password: 'securePassword',
            university: 'Example University',
            major: 'Physics',
            year: 4,
            groups: [],
        });

        await user.save();

        const group = new Group({
            name: 'Physics Study Group',
            subject: 'Physics',
            description: 'A group to study physics together',
            members: [user._id],
            // schedule is missing
        });

        await expect(group.save()).resolves.toBeTruthy();
        expect(group.name).toBe('Physics Study Group');
        expect(group.subject).toBe('Physics');
        expect(group.description).toBe('A group to study physics together');
        expect(group.members.length).toBe(1);
        expect(group.schedule).toEqual({});
    });
});
