import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { useParams, useNavigate } from 'react-router-dom';
import { GET_GROUP } from '../utils/queries';
import { JOIN_GROUP, LEAVE_GROUP } from '../utils/mutations';

const GroupDetails = () => {
  const { groupId } = useParams();
  const navigate = useNavigate();

  const { loading, error, data, refetch } = useQuery(GET_GROUP, {
    variables: { groupId },
  });

  const [leaveGroup] = useMutation(LEAVE_GROUP, {
    onCompleted: () => refetch(),
  });

  const [joinGroup] = useMutation(JOIN_GROUP, {
    onCompleted: () => refetch(),
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const { group } = data;

  return (
    <div>
      <h1>{group.name}</h1>
      <h2>Members</h2>
      <ul>
        {group.members.map(member => (
          <li key={member._id}>{member.username}</li>
        ))}
      </ul>
      {group.isMember ? (
        <button onClick={() => leaveGroup({ variables: { groupId } })}>Leave Group</button>
      ) : (
        <button onClick={() => joinGroup({ variables: { groupId } })}>Join Group</button>
      )}
      <button onClick={() => navigate('/groups')}>Back to Groups</button>
    </div>
  );
};

export default GroupDetails;
