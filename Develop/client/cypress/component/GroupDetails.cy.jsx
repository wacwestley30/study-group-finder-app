import React from 'react';
import { MockedProvider } from '@apollo/client/testing';
import { mount } from 'cypress/react18';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import GroupDetails from '../../src/pages/GroupDetails';
import { GET_GROUP } from '../../src/utils/queries';
import { JOIN_GROUP } from '../../src/utils/mutations';

const mocks = [
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
          isMember: false,
        },
      },
    },
  },
  {
    request: {
      query: JOIN_GROUP,
      variables: { groupId: '1' },
    },
    result: {
      data: {
        joinGroup: {
          _id: '1',
          name: 'Group 1',
          members: [
            { _id: '1', username: 'User1', email: 'user1@example.com' },
            { _id: '2', username: 'User2', email: 'user2@example.com' },
            { _id: '3', username: 'User3', email: 'user3@example.com' },
          ],
          isMember: true,
        },
      },
    },
  },
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
          isMember: true,
        },
      },
    },
    delay: 500, 
  },
];

describe('GroupDetails', () => {
  it('renders group details and members', () => {
    mount(
      <MockedProvider mocks={mocks} addTypename={false}>
        <MemoryRouter initialEntries={['/group/1']}>
          <Routes>
            <Route path="/group/:groupId" element={<GroupDetails />} />
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
            <Route path="/group/:groupId" element={<GroupDetails />} />
          </Routes>
        </MemoryRouter>
      </MockedProvider>
    );

    cy.contains('Join Group').should('exist').click();
    cy.wait(1000); 
    cy.contains('User3').should('exist'); 
  });
});
