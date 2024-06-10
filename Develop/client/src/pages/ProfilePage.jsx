import React from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_USER, GET_ME } from '../utils/queries';
import Auth from '../utils/auth';

const ProfilePage = () => {
  const { username: userParam } = useParams();

  // Determine if we should query for the logged-in user or another user
  const isLoggedInUser = Auth.loggedIn() && Auth.getProfile().data.username === userParam;

  const { loading, error, data } = useQuery(userParam ? GET_USER : GET_ME, {
    variables: { username: userParam },
    skip: !userParam && !Auth.loggedIn(), // Skip query if no username and not logged in
  });

  // Handle loading state
  if (loading) return <div>Loading...</div>;

  // Handle error state
  if (error) return <div>Error: {error.message}</div>;

  // Get the user data from the query result
  const user = data?.me || data?.user || {};

  // Redirect to login if not logged in and no user data
  if (!Auth.loggedIn() || !user?.username) {
    return (
      <h4>
        You need to be logged in to see this. Use the navigation links above to sign up or log in!
      </h4>
    );
  }

  // Redirect logged-in user to their own profile page if accessing another user's profile
  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    return <Navigate to="/me" />;
  }

  return (
    <div className="container">
      <h1 className="title">{user.username}'s Profile</h1>
      <h2 className="subtitle">Email: {user.email}</h2>
      <h2 className="subtitle">Groups:</h2>
      <ul>
        {user.groups.map((group) => (
          <li key={group._id}>
            <Link to={`/group/${group._id}`}>{group.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProfilePage;
