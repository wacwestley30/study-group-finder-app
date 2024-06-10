import { useState } from 'react';
import GroupModal from './GroupModal';
import Auth from '../utils/auth';

const UserProfile = ({ user }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <h1 className="title my-3">{user.username}'s Profile</h1>
      <p>Name: {user.firstName} {user.lastName}</p>
      <p>University: {user.university}</p>
      <p>Major: {user.major}</p>
      <p>Year: {user.year}</p>
      <div className="level mb-0">
        <h2 className="title my-3">{user.username}'s Groups:</h2>
        {Auth.loggedIn() && (
          <button className="button is-primary my-3" onClick={handleOpenModal}>Create Group</button>
        )}
      </div>
      <GroupModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </>
  );
};

export default UserProfile;