import React from 'react';
import { MockedProvider } from '@apollo/client/testing';
import { MemoryRouter } from 'react-router-dom';
import { mount } from 'cypress/react18';
import GroupPage from '../../src/pages/GroupPage';
import { GET_ME, GET_GROUPS } from '../../src/utils/queries';

describe('GroupPage', () => {
  it('renders correctly when user is in groups', () => {
    const mocks = [
      {
        request: { query: GET_ME },
        result: {
          data: {
            me: {
              _id: '1',
              username: 'User1',
              email: 'user1@example.com',
              groups: [{ _id: '1', name: 'Group 1' }],
            },
          },
        },
      },
      {
        request: { query: GET_GROUPS },
        result: {
          data: {
            groups: [
              { _id: '1', name: 'Group 1' },
              { _id: '2', name: 'Group 2' },
            ],
          },
        },
      },
    ];

    mount(
      <MockedProvider mocks={mocks} addTypename={false}>
        <MemoryRouter>
          <GroupPage />
        </MemoryRouter>
      </MockedProvider>
    );

    cy.contains('Your Groups').should('exist');
    cy.contains('Group 1').should('exist');
    cy.contains('Find Groups').should('not.exist');
  });

  it('renders correctly when user is not in any groups', () => {
    const mocks = [
      {
        request: { query: GET_ME },
        result: {
          data: {
            me: {
              _id: '1',
              username: 'User1',
              email: 'user1@example.com',
              groups: [],
            },
          },
        },
      },
      {
        request: { query: GET_GROUPS },
        result: {
          data: {
            groups: [
              { _id: '1', name: 'Group 1' },
              { _id: '2', name: 'Group 2' },
            ],
          },
        },
      },
    ];

    mount(
      <MockedProvider mocks={mocks} addTypename={false}>
        <MemoryRouter>
          <GroupPage />
        </MemoryRouter>
      </MockedProvider>
    );

    cy.contains("You aren't in any groups yet!").should('exist');
    cy.contains('Find Groups').should('exist').click();
    cy.contains('All Groups').should('exist');
    cy.contains('Group 1').should('exist');
    cy.contains('Group 2').should('exist');
  });
});
