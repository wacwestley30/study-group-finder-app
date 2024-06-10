import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_USER } from '../utils/queries';

// this will load user information without Auth I think there is a persistence issue with staying logged in wwhen accessing new route

// const ProfilePage = () => {
//   const { username } = useParams();
//   const { loading, error, data } = useQuery(GET_USER, {
//     variables: { username },
//   });

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error: {error.message}</p>;

//   const { user } = data;

const ProfilePage = ({ userId }) => {
  const { username } = useParams();

  const { loading, error, data } = useQuery(GET_USER, {
    variables: { username },
  });

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    console.error('GET_USER query error:', error);
    return <p>Error: {error.message}</p>;
  }

  const { user } = data;

  // Redirect to login page if user is not logged in
  if (!userId) {
    return <Navigate to="/" replace />;
  }

  // Redirect to unauthorized page if user tries to access another profile
  if (userId !== user._id) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="container">
      <div className="columns is-centered">
        <div className="column is-half">
          <div className="box">
            <h1 className="title">{user.username}'s Profile</h1>
            <p><strong>Email:</strong> {user.email}</p>
            <h2>{/*line break or 'GROUPS'*/}</h2>
            <ul>
              {user.groups.map(group => (
                <li key={group._id}>{group.name}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
