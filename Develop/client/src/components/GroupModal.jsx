import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_GROUP } from '../utils/mutations';
import { GET_USER, GET_ME } from '../utils/queries';

const GroupModal = ({ isOpen, onClose, userId }) => {
  const [name, setName] = useState('');
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [addGroup, { error }] = useMutation(ADD_GROUP, {
    refetchQueries: [
      { query: GET_USER, variables: { userId } }, // Refetch user data after adding a group
      { query: GET_ME } // Optionally refetch the logged-in user's data
    ]
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      await addGroup({ variables: { name, subject, description } });
      onClose();
    } catch (e) {
      console.error('Error creating group:', e.message);
      console.error(e);
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal is-active">
      <div className="modal-background" onClick={onClose}></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Create Group</p>
          <button className="delete" aria-label="close" onClick={onClose}></button>
        </header>
        <form onSubmit={handleFormSubmit}>
          <section className="modal-card-body">
            <div className="field">
              <label className="label">Name</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  placeholder="Group Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Subject</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  placeholder="Subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Description</label>
              <div className="control">
                <textarea
                  className="textarea"
                  placeholder="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>
            </div>
          </section>
          <footer className="modal-card-foot">
            <button className="button is-success" type="submit">Create</button>
            <button className="button" type="button" onClick={onClose}>Cancel</button>
          </footer>
        </form>
        {error && <p className="error-message">Error creating group: {error.message}</p>}
      </div>
    </div>
  );
};

export default GroupModal;