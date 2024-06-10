import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { GET_GROUP } from '../utils/queries';
import { JOIN_GROUP, LEAVE_GROUP } from '../utils/mutations';
import UserCard from '../components/UserCard';
import Auth from '../utils/auth';

const GroupPage = () => {
  const { groupId } = useParams();
  const { loading, error, data } = useQuery(GET_GROUP, {
    variables: { groupId },
  });

  const [joinGroup] = useMutation(JOIN_GROUP);
  const [leaveGroup] = useMutation(LEAVE_GROUP, {
    refetchQueries: [{ query: GET_GROUP, variables: { groupId } }],
  });
  const [showModal, setShowModal] = useState(false);
  const [isMember, setIsMember] = useState(false);

  useEffect(() => {
    if (!loading && !error && data && Auth.loggedIn()) {
      const loggedInUserId = Auth.getProfile().authenticatedPerson._id;
      setIsMember(data.group.members.some(member => member._id === loggedInUserId));
    }
  }, [loading, error, data]);

  const handleJoinGroup = async () => {
    try {
      await joinGroup({
        variables: {
          userId: Auth.getProfile().authenticatedPerson._id,
          groupId: groupId,
        },
      });
      setIsMember(true);
    } catch (error) {
      console.error('Error joining group:', error);
    }
  };

  const handleLeaveGroup = async () => {
    try {
      await leaveGroup({
        variables: {
          userId: Auth.getProfile().authenticatedPerson._id,
          groupId: groupId,
        },
      });
      setIsMember(false);
    } catch (error) {
      console.error('Error leaving group:', error);
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const { group } = data;

  return (
    <div className="container">
      <h1 className="title my-3">{group.name}</h1>
      <p>Subject: {group.subject}</p>
      <p>{group.description}</p>
      <div className="level mb-0">
        <h2 className="title my-3">Members:</h2>
        {Auth.loggedIn() && !isMember && (
          <button className="button is-primary" onClick={handleJoinGroup}>
            Join Group
          </button>
        )}
        {Auth.loggedIn() && isMember && (
          <button className="button is-danger" onClick={handleLeaveGroup}>
            Leave Group
          </button>
        )}
      </div>
      <div className="columns is-multiline">
        {group.members && group.members.map(user => (
          <UserCard key={user._id} user={user} />
        ))}
      </div>
      {isMember && (
        <div className={`modal ${showModal ? 'is-active' : ''}`}>
          <div className="modal-background" onClick={handleModalClose}></div>
          <div className="modal-content">
            <div className="box">
              <p>You are already a member of this group.</p>
            </div>
          </div>
          <button
            className="modal-close is-large"
            aria-label="close"
            onClick={handleModalClose}
          ></button>
        </div>
      )}
    </div>
  );
};

export default GroupPage;