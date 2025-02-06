import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const location = useLocation();
  const { user } = useAuth(); 
  const [userData, setUserData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        if (user) {
          const response = await fetch(`http://localhost:3001/customers?mobile=${user.mobile}`);
          if (!response.ok) {
            throw new Error('Failed to fetch customer data.');
          }
          const [customerData] = await response.json(); // Assuming the result is an array
          setUserData(customerData || location.state); // Fallback to location.state if no customer found
        } else if (location.state) {
          // If no AuthContext user, fallback to location.state
          setUserData(location.state);
        }
      } catch (error) {
        console.error('Error fetching customer data:', error);
      }
    };

    fetchCustomerData();
  }, [user, location.state]);

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
      } catch (error) {
        console.error('Error updating profile:', error);
        alert('An error occurred while updating the profile.');
      }
    }
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

  if (!userData) {
    return <p>Loading...</p>;
  }

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
                src={userData.profileImage || "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"}
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
              <p className="form-control-plaintext text-secondary">
                {userData.mobile}
              </p>
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
