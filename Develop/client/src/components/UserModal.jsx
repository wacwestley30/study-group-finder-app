import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { EDIT_USER } from '../utils/mutations';

const UserModal = ({ isOpen, onClose, user }) => {
  const [formState, setFormState] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    university: user.university,
    major: user.major,
    year: user.year,
  });

  const [editUser, { error }] = useMutation(EDIT_USER);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: name === 'year' ? parseInt(value, 10) : value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      await editUser({
        variables: { ...formState },
      });
      onClose();
    } catch (err) {
      console.error('Error updating user:', err.message);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal is-active">
      <div className="modal-background" onClick={onClose}></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Edit Profile</p>
          <button className="delete" aria-label="close" onClick={onClose}></button>
        </header>
        <form onSubmit={handleFormSubmit}>
          <section className="modal-card-body">
            <div className="field">
              <label className="label">First Name</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  name="firstName"
                  value={formState.firstName}
                  onChange={handleChange}
                  placeholder="First Name"
                  required
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Last Name</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  name="lastName"
                  value={formState.lastName}
                  onChange={handleChange}
                  placeholder="Last Name"
                  required
                />
              </div>
            </div>
            <div className="field">
              <label className="label">University</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  name="university"
                  value={formState.university}
                  onChange={handleChange}
                  placeholder="University"
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Major</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  name="major"
                  value={formState.major}
                  onChange={handleChange}
                  placeholder="Major"
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Year</label>
              <div className="control">
                <input
                  className="input"
                  type="number"
                  name="year"
                  value={formState.year}
                  onChange={handleChange}
                  placeholder="Year"
                />
              </div>
            </div>
          </section>
          <footer className="modal-card-foot">
            <button className="button is-success" type="submit">Save Changes</button>
            <button className="button" type="button" onClick={onClose}>Cancel</button>
          </footer>
        </form>
        {error && <p className="error-message">Error updating profile: {error.message}</p>}
      </div>
    </div>
  );
};

export default UserModal;