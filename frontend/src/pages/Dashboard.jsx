import React, { useState, useEffect } from 'react';
import { useAuthStore } from '../store/useAuthStore';

const Dashboard = () => {
  const user = useAuthStore((state) => state.user);
  const loading = useAuthStore((state) => state.loading);
  const error = useAuthStore((state) => state.error);

  const updateProfile = useAuthStore((state) => state.updateProfile);

  const [userData, setUserData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null); 
  const [previewUrl, setPreviewUrl] = useState(null);

  useEffect(() => {
    if (user) {
      setUserData(user);
      setPreviewUrl(user.profilePic);
    }
  }, [user]);

  const handleEditToggle = async () => {
    if (isEditing && userData) {
      try {
        const formData = new FormData();
        ['name', 'mobile', 'location', 'email'].forEach((field) => {
          if (userData[field] !== undefined) {
            formData.append(field, userData[field]);
          }
        });

        if (selectedFile) {
          formData.append('profilePic', selectedFile);
        }

        const updated = await updateProfile(formData);
        setUserData(updated);
        setPreviewUrl(updated.profilePic);
        setSelectedFile(null);
        alert('Profile updated successfully!');
      } catch (err) {
        console.error('Error updating profile:', err);
        alert('An error occurred while updating the profile.');
      }
    }
    setIsEditing((prev) => !prev);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  if (!userData) return <p>No user data found. Please login.</p>;

  return (
    <div className="container my-3">
      <div className="card shadow p-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="h3">Welcome, {userData.name}!</h1>
          <button className="btn btn-primary" onClick={handleEditToggle} disabled={loading}>
            {loading
              ? (isEditing ? 'Saving…' : 'Loading…')
              : (isEditing ? 'Save' : 'Edit')}
          </button>
        </div>
        <div className="row">
          <div className="col-md-4 text-center">
            <div className="position-relative">
              <img
                src={
                  previewUrl || 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png'
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
            {['name', 'mobile', 'email', 'location'].map((field) => (
              <div className="mb-3" key={field}>
                <label className="form-label text-dark fw-bold">
                  {field.charAt(0).toUpperCase() + field.slice(1)}:
                </label>
                {isEditing ? (
                  <input
                    type={field === 'email' ? 'email' : field === 'mobile' ? 'tel' : 'text'}
                    className="form-control"
                    name={field}
                    value={userData[field] || ''}
                    onChange={handleChange}
                    {...(field === 'email' ? { readOnly: true } : {})}
                  />
                ) : (
                  <p className="form-control-plaintext text-secondary">
                    {userData[field] || (field === 'location' ? 'Not provided' : '')}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
