import React from 'react';
import { ApolloProvider } from '@apollo/client';
import { mount } from '@cypress/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { client } from '../../src/App';

const mountWithApollo = (component, initialEntries = ['/']) => {
  return mount(
    <ApolloProvider client={client}>
      <MemoryRouter initialEntries={initialEntries}>
        <Routes>
          {component}
        </Routes>
      </MemoryRouter>
    </ApolloProvider>
  );
};

export default mountWithApollo;