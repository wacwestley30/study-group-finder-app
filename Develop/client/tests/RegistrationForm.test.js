import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { MockedProvider } from '@apollo/client/testing'
import { MemoryRouter } from 'react-router-dom'
import Signup, { ADD_USER } from '../src/components/Signup' 

// mock console log to preventlogging during tests
jest.spyOn(console, 'log').mockImplementation(() => {})

// define mocks for the add user mutation
const mocks = [
{
  request: {
    query: ADD_USER,
    variables: {
      username: 'testuser',
      email: 'testuser@test.com',
      password: 'password123',
    },
  },
  result: {
    data: {
      addUser: {
        token: 'test-token',
        user: {
          _id: '1',
          username: 'testuser',
          email: 'testuser@test.com',
        },
      },
    },
  },
},
]

describe('signup component', () => {
test('renders the form with all input fields and submit button', () => {
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <MemoryRouter>
        <Signup />
      </MemoryRouter>
    </MockedProvider>
  )
  // check that the inputs are rendered
  expect(screen.getByLabelText(/username/i)).toBeInTheDocument()
  expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
  expect(screen.getByLabelText(/password/i)).toBeInTheDocument()
  expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument()
})

test('handles form submission correctly', async () => {
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <MemoryRouter>
        <Signup />
      </MemoryRouter>
    </MockedProvider>
  )

  // simulate user input
  fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'testuser' } })
  fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'testuser@test.com' } })
  fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } })

  // simulate form submission
  fireEvent.click(screen.getByRole('button', { name: /submit/i }))

  // wait and check if console log was called with correct data
  await waitFor(() => {
    expect(console.log).toHaveBeenCalledWith('User created:', {
      addUser: {
        token: 'test-token',
        user: {
          _id: '1',
          username: 'testuser',
          email: 'testuser@test.com',
        },
      },
    })
  })
})

test('displays error message on mutation error', async () => {
  const errorMocks = [
    {
      request: {
        query: ADD_USER,
        variables: {
          username: 'testuser',
          email: 'testuser@test.com',
          password: 'password123',
        },
      },
      error: new Error('An error occurred'),
    },
  ]
  render(
    <MockedProvider mocks={errorMocks} addTypename={false}>
      <MemoryRouter>
        <Signup />
      </MemoryRouter>
    </MockedProvider>
  )

  // simulate user input
  fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'testuser' } })
  fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'testuser@test.com' } })
  fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } })
  fireEvent.click(screen.getByRole('button', { name: /submit/i }))
  //wait for operation to occur, then check for an error message to be in the document
  await waitFor(() => {
    expect(screen.getByText('Error: An error occurred')).toBeInTheDocument()
  })
})
})
