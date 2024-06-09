import React from 'react';
import { MockedProvider } from '@apollo/client/testing';
import { mount } from 'cypress/react18';
import { MemoryRouter } from 'react-router-dom';
import GroupPage from '../../src/pages/GroupPage';
import { GET_ME, GET_GROUPS } from '../../src/utils/queries';

const meWithoutGroupsMock = {
  request: {
    query: GET_ME,
  },
  result: {
    data: {
      me: {
        _id: '1',
        username: 'testuser',
        email: 'testuser@example.com',
        groups: [],
      },
    },
  },
};

const meWithGroupsMock = {
  request: {
    query: GET_ME,
  },
  result: {
    data: {
      me: {
        _id: '1',
        username: 'testuser',
        email: 'testuser@example.com',
        groups: [
          {
            _id: '1',
            name: 'Group 1',
          },
        ],
      },
    },
  },
};

const groupsMock = {
  request: {
    query: GET_GROUPS,
  },
  result: {
    data: {
      groups: [
        {
          _id: '2',
          name: 'Group 2',
        },
        {
          _id: '3',
          name: 'Group 3',
        },
      ],
    },
  },
};

describe('GroupPage', () => {
  it("shows 'You aren't in any groups yet!' message when not in any groups", () => {
    mount(
      <MockedProvider mocks={[meWithoutGroupsMock, groupsMock]} addTypename={false}>
        <MemoryRouter>
          <GroupPage />
        </MemoryRouter>
      </MockedProvider>
    );
    cy.contains("You aren't in any groups yet!").should('exist');
  });

  it("shows 'Find Groups' button when not in any groups", () => {
    mount(
      <MockedProvider mocks={[meWithoutGroupsMock, groupsMock]} addTypename={false}>
        <MemoryRouter>
          <GroupPage />
        </MemoryRouter>
      </MockedProvider>
    );
    cy.contains('Find Groups').should('exist');
  });

  it('shows list of joined groups', () => {
    mount(
      <MockedProvider mocks={[meWithGroupsMock, groupsMock]} addTypename={false}>
        <MemoryRouter>
          <GroupPage />
        </MemoryRouter>
      </MockedProvider>
    );
    cy.contains('Group 1').should('exist');
  });

  it('shows all groups when Find Groups button is clicked', () => {
    mount(
      <MockedProvider mocks={[meWithoutGroupsMock, groupsMock]} addTypename={false}>
        <MemoryRouter>
          <GroupPage />
        </MemoryRouter>
      </MockedProvider>
    );
    cy.contains('Find Groups').click();
    cy.contains('Group 2').should('exist');
    cy.contains('Group 3').should('exist');
  });
//need to push then resume
  it('navigates to individual group page when a group is clicked', () => {
    mount(
      <MockedProvider mocks={[meWithGroupsMock, groupsMock]} addTypename={false}>
        <MemoryRouter>
          <GroupPage />
        </MemoryRouter>
      </MockedProvider>
    );
    cy.contains('Group 1').click();
    cy.url().should('include', '/group/1');
  });
});
