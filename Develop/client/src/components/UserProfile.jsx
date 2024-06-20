import { useState } from 'react';
import GroupModal from './GroupModal';
import UserModal from './UserModal';
import Auth from '../utils/auth';

const UserProfile = ({ user }) => {
  const [isGroupModalOpen, setIsGroupModalOpen] = useState(false);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);

  const handleOpenGroupModal = () => {
    setIsGroupModalOpen(true);
  };

  const handleCloseGroupModal = () => {
    setIsGroupModalOpen(false);
  };

  const handleOpenUserModal = () => {
    setIsUserModalOpen(true);
  };

  const handleCloseUserModal = () => {
    setIsUserModalOpen(false);
  };

  // Retrieve the logged-in user's profile
  const loggedInUserProfile = Auth.getProfile();

  // Check if the logged-in user is the same as the user profile on display
  const isUserProfile = loggedInUserProfile && loggedInUserProfile.authenticatedPerson._id === user._id;

  return (
    <>
      <div className="level mb-0">
        <h1 className="title my-3">{user.username}'s Profile</h1>
        {Auth.loggedIn() && isUserProfile && (
          <button className="button is-warning my-3" onClick={handleOpenUserModal}>Edit Profile</button>
        )}
      </div>
      <p>Name: {user.firstName} {user.lastName}</p>
      <p>University: {user.university}</p>
      <p>Major: {user.major}</p>
      <p>Year: {user.year}</p>
      <div className="level mb-0">
        <h2 className="title my-3">{user.username}'s Groups:</h2>
        {Auth.loggedIn() && (
          <button className="button is-primary my-3" onClick={handleOpenGroupModal}>Create Group</button>
        )}
      </div>
      <GroupModal isOpen={isGroupModalOpen} onClose={handleCloseGroupModal} />
      <UserModal isOpen={isUserModalOpen} onClose={handleCloseUserModal} user={user} />
    </>
  );
};

export default UserProfile;