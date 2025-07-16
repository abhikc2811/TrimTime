import React, { useState, useEffect } from 'react';
import { useAuthStore } from '../store/useAuthStore'; // your zustand store

const Dashboard = () => {
  const user = useAuthStore(state => state.user);
  const role = useAuthStore(state => state.role);
  const loading = useAuthStore(state => state.loading);
  const error = useAuthStore(state => state.error);

  const [userData, setUserData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    // When user updates in store, set it locally for editing
    if (user) {
      setUserData(user);
    }
  }, [user]);

  const handleEditToggle = async () => {
    if (isEditing && userData) {
      try {
        const response = await fetch(`http://localhost:3001/customers/${userData.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData),
        });

        if (!response.ok) {
          throw new Error('Failed to update customer data.');
        }

        const updatedData = await response.json();
        setUserData(updatedData);
        alert('Profile updated successfully!');
      } catch (err) {
        console.error('Error updating profile:', err);
        alert('An error occurred while updating the profile.');
      }
    }
    setIsEditing(!isEditing);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const fileReader = new FileReader();
      fileReader.onload = (event) => {
        setUserData(prev => ({
          ...prev,
          profileImage: event.target.result,
        }));
      };
      fileReader.readAsDataURL(e.target.files[0]);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!userData) return <p>No user data found. Please login.</p>;

  return (
    <div className="container my-3">
      <div className="card shadow p-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="h3">Welcome, {userData.name}!</h1>
          <button className="btn btn-primary" onClick={handleEditToggle}>
            {isEditing ? 'Save' : 'Edit'}
          </button>
        </div>
        <div className="row">
          <div className="col-md-4 text-center">
            <div className="position-relative">
              <img
                src={
                  userData.profileImage ||
                  "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"
                }
                alt="Profile"
                className="img-fluid rounded-circle mb-3"
                style={{ width: '150px', height: '150px', border: '2px solid #ddd' }}
              />
              {isEditing && (
                <div className="mt-2">
                  <input
                    type="file"
                    className="form-control"
                    onChange={handleImageChange}
                    accept="image/*"
                  />
                </div>
              )}
            </div>
          </div>
          <div className="col-md-8">
            <div className="mb-3">
              <label className="form-label text-dark fw-bold">Name:</label>
              {isEditing ? (
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={userData.name || ''}
                  onChange={handleChange}
                />
              ) : (
                <p className="form-control-plaintext text-secondary">{userData.name}</p>
              )}
            </div>

            <div className="mb-3">
              <label className="form-label text-dark fw-bold">Mobile:</label>
              {isEditing ? (
                <input
                  type="tel"
                  className="form-control"
                  name="mobile"
                  value={userData.mobile || ''}
                  onchange={handleChange}
                />
              ) : (
                <p className="form-control-plaintext text-secondary">{userData.mobile}</p>
              )}
            </div>

            <div className="mb-3">
              <label className="form-label text-dark fw-bold">Email:</label>
              {isEditing ? (
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={userData.email || ''}
                  onChange={handleChange}
                  disabled 
                />
              ) : (
                <p className="form-control-plaintext text-secondary">{userData.email}</p>
              )}
            </div>

            <div className="mb-3">
              <label className="form-label text-dark fw-bold">Location:</label>
              {isEditing ? (
                <input
                  type="text"
                  className="form-control"
                  name="location"
                  value={userData.location || ''}
                  onChange={handleChange}
                />
              ) : (
                <p className="form-control-plaintext text-secondary">
                  {userData.location || 'Not provided'}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
