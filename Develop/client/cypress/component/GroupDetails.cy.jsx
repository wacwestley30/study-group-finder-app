import React from 'react';
import { MockedProvider } from '@apollo/client/testing';
import { mount } from 'cypress/react18';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import GroupDetails from '../../src/pages/GroupDetails';
import { GET_GROUP } from '../../src/utils/queries';
import { JOIN_GROUP, LEAVE_GROUP } from '../../src/utils/mutations';

const userId = 'user3';

const mocks = [
  // Initial GET_GROUP query
  {
    request: {
      query: GET_GROUP,
      variables: { groupId: '1' },
    },
    result: {
      data: {
        group: {
          _id: '1',
          name: 'Group 1',
          members: [
            { _id: '1', username: 'User1', email: 'user1@example.com' },
            { _id: '2', username: 'User2', email: 'user2@example.com' },
          ],
        },
      },
    },
  },
  // JOIN_GROUP mutation
  {
    request: {
      query: JOIN_GROUP,
      variables: { userId: 'user3', groupId: '1' },
    },
    result: {
      data: {
        joinGroup: {
          _id: '3',
          username: 'User3',
          email: 'user3@example.com',
          groups: [
            {
              _id: '1',
              name: 'Group 1',
              members: [
                { _id: '1', username: 'User1', email: 'user1@example.com' },
                { _id: '2', username: 'User2', email: 'user2@example.com' },
                { _id: '3', username: 'User3', email: 'user3@example.com' },
              ],
            },
          ],
        },
      },
    },
  },
  // GET_GROUP query after the JOIN_GROUP mutation
  {
    request: {
      query: GET_GROUP,
      variables: { groupId: '1' },
    },
    result: {
      data: {
        group: {
          _id: '1',
          name: 'Group 1',
          members: [
            { _id: '1', username: 'User1', email: 'user1@example.com' },
            { _id: '2', username: 'User2', email: 'user2@example.com' },
            { _id: '3', username: 'User3', email: 'user3@example.com' },
          ],
        },
      },
    },
  },
  // LEAVE_GROUP mutation
  {
    request: {
      query: LEAVE_GROUP,
      variables: { userId: 'user3', groupId: '1' },
    },
    result: {
      data: {
        leaveGroup: {
          _id: '3',
          username: 'User3',
          email: 'user3@example.com',
          groups: [],
        },
      },
    },
  },
  // GET_GROUP query after the LEAVE_GROUP mutation
  {
    request: {
      query: GET_GROUP,
      variables: { groupId: '1' },
    },
    result: {
      data: {
        group: {
          _id: '1',
          name: 'Group 1',
          members: [
            { _id: '1', username: 'User1', email: 'user1@example.com' },
            { _id: '2', username: 'User2', email: 'user2@example.com' },
          ],
        },
      },
    },
  },
];

describe('GroupDetails', () => {
  it('renders group details and members', () => {
    mount(
      <MockedProvider mocks={mocks} addTypename={false}>
        <MemoryRouter initialEntries={['/group/1']}>
          <Routes>
            <Route path="/group/:groupId" element={<GroupDetails userId={userId} />} />
          </Routes>
        </MemoryRouter>
      </MockedProvider>
    );

    cy.contains('Group 1').should('exist');
    cy.contains('Members').should('exist');
    cy.contains('User1').should('exist');
    cy.contains('User2').should('exist');
  });

  it('allows a user to join the group', () => {
    mount(
      <MockedProvider mocks={mocks} addTypename={false}>
        <MemoryRouter initialEntries={['/group/1']}>
          <Routes>
            <Route path="/group/:groupId" element={<GroupDetails userId={userId} />} />
          </Routes>
        </MemoryRouter>
      </MockedProvider>
    );

    cy.contains('Join Group').should('exist').click();

    cy.contains('User3').should('exist');
    cy.contains('Leave Group').should('exist');
  });

  it('allows a user to leave the group', () => {
    mount(
      <MockedProvider mocks={mocks} addTypename={false}>
        <MemoryRouter initialEntries={['/group/1']}>
          <Routes>
            <Route path="/group/:groupId" element={<GroupDetails userId={userId} />} />
          </Routes>
        </MemoryRouter>
      </MockedProvider>
    );

    cy.contains('Join Group').should('exist').click();
    cy.contains('Leave Group').should('exist').click();

    cy.contains('User3').should('not.exist');
    cy.contains('Join Group').should('exist');
  });
});
