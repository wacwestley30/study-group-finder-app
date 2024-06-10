import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { useParams, useNavigate } from 'react-router-dom';
import { GET_GROUP } from '../utils/queries';
import { JOIN_GROUP, LEAVE_GROUP } from '../utils/mutations';

const GroupDetails = ({ userId }) => {
  const { groupId } = useParams();
  const navigate = useNavigate();
  const [isMemberState, setIsMemberState] = useState(false);

  const { loading, error, data, refetch } = useQuery(GET_GROUP, {
    variables: { groupId },
    onCompleted: (data) => {
      const isMember = data.group.members.some(member => member._id === userId);
      setIsMemberState(isMember);
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

  const [leaveGroup] = useMutation(LEAVE_GROUP, {
    onCompleted: (data) => {
      console.log('LEAVE_GROUP mutation completed:', data);
      refetch();
      setIsMemberState(false);
    },
    onError: (error) => {
      console.error('LEAVE_GROUP mutation error:', error);
    },
  });

  const handleJoin = () => {
    console.log('Join button clicked');
    joinGroup({ variables: { userId, groupId } })
      .then(response => console.log('Join Group response:', response))
      .catch(error => console.error('Join Group error:', error));
    console.log('Join Group mutation called with:', { userId, groupId });
  };

  const handleLeave = () => {
    console.log('Leave button clicked');
    leaveGroup({ variables: { userId, groupId } })
      .then(response => console.log('Leave Group response:', response))
      .catch(error => console.error('Leave Group error:', error));
    console.log('Leave Group mutation called with:', { userId, groupId });
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
      {!isMemberState ? (
        <button onClick={handleJoin}>Join Group</button>
      ) : (
        <button onClick={handleLeave}>Leave Group</button>
      )}
      <button onClick={() => navigate('/groups')}>Back to Groups</button>
    </div>
  );
};

export default GroupDetails;
