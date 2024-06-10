import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { useParams, useNavigate } from 'react-router-dom';
import { GET_GROUP } from '../utils/queries';
import { JOIN_GROUP } from '../utils/mutations';

const GroupDetails = ({ userId }) => {
  const { groupId } = useParams();
  const navigate = useNavigate();
  const [isMemberState, setIsMemberState] = useState(false);

  const { loading, error, data, refetch } = useQuery(GET_GROUP, {
    variables: { groupId },
    onCompleted: (data) => {
      console.log('GET_GROUP query completed:', data);
    },
  });

  const [joinGroup] = useMutation(JOIN_GROUP, {
    onCompleted: (data) => {
      console.log('JOIN_GROUP mutation completed:', data);
      refetch();
      setIsMemberState(true);
    },
    onError: (error) => {
      console.error('JOIN_GROUP mutation error:', error);
    },
  });

  const handleJoin = () => {
    console.log('Join button clicked');
    joinGroup({ variables: { userId, groupId } })
      .then(response => console.log('Join Group response:', response))
      .catch(error => console.error('Join Group error:', error));
    console.log('Join Group mutation called with:', { userId, groupId });
  };

  if (loading) {
    console.log('Loading GET_GROUP query...');
    return <p>Loading...</p>;
  }
  if (error) {
    console.error('GET_GROUP query error:', error);
    return <p>Error: {error.message}</p>;
  }

  const { group } = data;

  return (
    <div>
      <h1>{group.name}</h1>
      <h2>Members</h2>
      <ul>
        {group.members.map((member) => (
          <li key={member._id}>{member.username}</li>
        ))}
      </ul>
      {!isMemberState && <button onClick={handleJoin}>Join Group</button>}
      <button onClick={() => navigate('/groups')}>Back to Groups</button>
    </div>
  );
};

export default GroupDetails;
