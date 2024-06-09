import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { useParams, useNavigate } from 'react-router-dom';
import { GET_GROUP } from '../utils/queries';
import { JOIN_GROUP } from '../utils/mutations';

const GroupDetails = () => {
  const { groupId } = useParams();
  const navigate = useNavigate();

  const { loading, error, data, refetch } = useQuery(GET_GROUP, {
    variables: { groupId },
    onCompleted: (data) => {
      console.log('GET_GROUP completed:', data);
    },
    onError: (err) => {
      console.error('GET_GROUP error:', err);
    },
  });

  const [joinGroup] = useMutation(JOIN_GROUP, {
    onCompleted: () => {
      refetch();
      console.log('JOIN_GROUP completed');
    },
    onError: (err) => {
      console.error('JOIN_GROUP error:', err);
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const { group } = data;

  const handleJoin = () => {
    joinGroup({ variables: { groupId } });
    console.log('Join Group clicked');
  };

  return (
    <div>
      <h1>{group.name}</h1>
      <h2>Members</h2>
      <ul>
        {group.members.map(member => (
          <li key={member._id}>{member.username}</li>
        ))}
      </ul>
      {!group.isMember && (
        <button onClick={handleJoin}>Join Group</button>
      )}
      <button onClick={() => navigate('/groups')}>Back to Groups</button>
    </div>
  );
};

export default GroupDetails;
