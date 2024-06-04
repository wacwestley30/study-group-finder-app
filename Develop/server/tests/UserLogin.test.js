const request = require('supertest');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const express = require('express');
const { typeDefs, resolvers } = require('../schemas');
const db = require('../config/connection');
const { User } = require('../models');

let server, app;

beforeAll(async () => {
    server = new ApolloServer({ typeDefs, resolvers });
    await server.start();

    app = express();
    app.use(express.json());
    app.use('/graphql', expressMiddleware(server));

    await db.once('open', () => {
        console.log('Database connection established successfully for tests!');
    });
});

afterAll(async () => {
    await server.stop();
    db.close();
});
  
describe('Login Mutation', () => {
    let testUser;
  
    beforeAll(async () => {
        // Create a test user
        testUser = await User.create({
            username: 'testuser',
            email: 'test@test.com',
            password: 'password123',
        });
    });
  
    afterAll(async () => {
        // Clean up test user
        await User.deleteOne({ email: 'test@test.com' });
    });
  
    it('should log in a user and return a valid token', async () => {
        const response = await request(app)
            .post('/graphql')
            .send({
            query: `
                mutation login($email: String!, $password: String!) {
                login(email: $email, password: $password) {
                    token
                    user {
                    _id
                    username
                    email
                    }
                }
                }
            `,
            variables: {
                email: 'test@test.com',
                password: 'password123',
            },
            });
    
        expect(response.body.errors).toBeUndefined();
        expect(response.body.data.login.token).toBeDefined();
        expect(response.body.data.login.user.username).toBe('testuser');
        expect(response.body.data.login.user.email).toBe('test@test.com');
    });
});