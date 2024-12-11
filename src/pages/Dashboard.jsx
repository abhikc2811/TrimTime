import React, { useState } from 'react';

const Dashboard = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    username: 'John Doe',
    profileImage: 'https://via.placeholder.com/150', // Placeholder image
    name: 'John Doe',
    age: 30,
    mobile: '123-456-7890',
    email: 'johndoe@example.com',
  });

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const fileReader = new FileReader();
      fileReader.onload = (event) => {
        setUserData((prevData) => ({
          ...prevData,
          profileImage: event.target.result,
        }));
      };
      fileReader.readAsDataURL(e.target.files[0]);
    }
  };

  return (
    <div className="container my-5">
      <div className="card shadow p-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="h3">Welcome, {userData.username}!</h1>
          <button className="btn btn-primary" onClick={handleEditToggle}>
            {isEditing ? 'Save' : 'Edit'}
          </button>
        </div>
        <div className="row">
          <div className="col-md-4 text-center">
            <div className="position-relative">
              <img
                src={userData.profileImage}
                alt="Profile"
                className="img-fluid rounded-circle mb-3"
                style={{ maxWidth: '150px', border: '2px solid #ddd' }}
              />
              {isEditing && (
                <div className="mt-2">
                  <input
                    type="file"
                    className="form-control"
                    onChange={handleImageChange}
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
                  value={userData.name}
                  onChange={handleChange}
                />
              ) : (
                <p className="form-control-plaintext text-secondary">
                  {userData.name}
                </p>
              )}
            </div>
            <div className="mb-3">
              <label className="form-label text-dark fw-bold">Age:</label>
              {isEditing ? (
                <input
                  type="number"
                  className="form-control"
                  name="age"
                  value={userData.age}
                  onChange={handleChange}
                />
              ) : (
                <p className="form-control-plaintext text-secondary">
                  {userData.age}
                </p>
              )}
            </div>
            <div className="mb-3">
              <label className="form-label text-dark fw-bold">Mobile:</label>
              {isEditing ? (
                <input
                  type="text"
                  className="form-control"
                  name="mobile"
                  value={userData.mobile}
                  onChange={handleChange}
                />
              ) : (
                <p className="form-control-plaintext text-secondary">
                  {userData.mobile}
                </p>
              )}
            </div>
            <div className="mb-3">
              <label className="form-label text-dark fw-bold">Email:</label>
              {isEditing ? (
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={userData.email}
                  onChange={handleChange}
                />
              ) : (
                <p className="form-control-plaintext text-secondary">
                  {userData.email}
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
