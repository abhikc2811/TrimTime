import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const BDashboard = () => {
  const location = useLocation();
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [shopImage, setShopImage] = useState(null);
  const [barberId, setBarberId] = useState(null);
  const [userData, setUserData] = useState(null);
  const [services, setServices] = useState([{ name: '', price: '' }]);

  useEffect(() => {
    const fetchBarberData = async () => {
      try {
        if (user) {
          const response = await fetch(`http://localhost:3001/barbers?mobile=${user.mobile}`);
          if (!response.ok) {
            throw new Error('Failed to fetch barber data.');
          }
          const [barberData] = await response.json();
          setUserData(barberData || location.state);
          if (barberData?.services) {
            setServices(barberData.services);
          }
        } else if (location.state) {
          setUserData(location.state);
          if (location.state?.services) {
            setServices(location.state.services);
          }
        }
      } catch (error) {
        console.error('Error fetching barber data:', error);
      }
    };

    fetchBarberData();
  }, [user, location.state]);

  const handleEditToggle = async () => {
    if (isEditing && userData) {
      try {
        const updatedData = { 
          ...userData, 
          services: services.map((service) => ({
            name: service.name.trim(),
            price: parseFloat(service.price) || 0,
          }))
        };
  
        const response = await fetch(`http://localhost:3001/barbers/${userData.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedData),
        });
  
        if (!response.ok) {
          throw new Error('Failed to update profile.');
        }
  
        const updatedDataResponse = await response.json();
        setUserData(updatedDataResponse); // Update local state with the response
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

  const handleServiceChange = (index, field, value) => {
    const updatedServices = [...services];
    updatedServices[index][field] = value;
    setServices(updatedServices);
  };

  const addService = () => {
    setServices([...services, { name: '', price: '' }]);
  };

  const removeService = (index) => {
    const updatedServices = services.filter((_, i) => i !== index);
    setServices(updatedServices);
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

  const handleShopImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const fileReader = new FileReader();
      fileReader.onload = (event) => {
        setUserData((prevData) => ({
          ...prevData,
          shopImage: event.target.result,
        }));
      };
      fileReader.readAsDataURL(e.target.files[0]);
    }
  };

  return (
    <div className="container my-3">
      <div className="card shadow p-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="h3">Welcome, {userData?.name || 'Guest'}!</h1>
          <button className="btn btn-primary" onClick={handleEditToggle}>
            {isEditing ? 'Save' : 'Edit'}
          </button>
        </div>
        <div className="row">
          <div className="col-md-4 text-center">
            <div className="position-relative">
              <img
                src={userData?.profileImage || 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png'}
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
            {/* Existing Fields */}
            <div className="mb-3">
              <label className="form-label text-dark fw-bold">Name:</label>
              {isEditing ? (
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={userData?.name || ''}
                  onChange={handleChange}
                />
              ) : (
                <p className="form-control-plaintext text-secondary">
                  {userData?.name || ''}
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
                  value={userData?.mobile || ''}
                  onChange={handleChange}
                />
              ) : (
                <p className="form-control-plaintext text-secondary">
                  {userData?.mobile || ''}
                </p>
              )}
            </div>
            <div className="mb-3">
              <label className="form-label text-dark fw-bold">Barber Shop Name:</label>
              {isEditing ? (
                <input
                  type="text"
                  className="form-control"
                  name="barberShopName"
                  value={userData?.barberShopName || ''}
                  onChange={handleChange}
                />
              ) : (
                <p className="form-control-plaintext text-secondary">
                  {userData?.barberShopName || ''}
                </p>
              )}
            </div>
            <div className="mb-3">
              <label className="form-label text-dark fw-bold">Location:</label>
              {isEditing ? (
                <input
                  type="text"
                  className="form-control"
                  name="location"
                  value={userData?.location || ''}
                  onChange={handleChange}
                />
              ) : (
                <p className="form-control-plaintext text-secondary">
                  {userData?.location || ''}
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
                  value={userData?.email || ''}
                  onChange={handleChange}
                />
              ) : (
                <p className="form-control-plaintext text-secondary">
                  {userData?.email || ''}
                </p>
              )}
            </div>
            {/* Service Fields */}
            <div className="mb-3">
              <label className="form-label text-dark fw-bold">Services:</label>
              {services.map((service, index) => (
                <div key={index} className="d-flex align-items-center mb-2">
                  {isEditing ? (
                    <>
                      <input
                        type="text"
                        className="form-control me-2"
                        placeholder="Service Name"
                        value={service.name}
                        onChange={(e) =>
                          handleServiceChange(index, 'name', e.target.value)
                        }
                      />
                      <input
                        type="text"
                        className="form-control me-2"
                        placeholder="Price"
                        value={service.price}
                        onChange={(e) =>
                          handleServiceChange(index, 'price', e.target.value)
                        }
                      />
                      <button
                        className="btn btn-danger"
                        onClick={() => removeService(index)}
                      >
                        Remove
                      </button>
                    </>
                  ) : (
                    <p className="form-control-plaintext text-secondary">
                      {service.name} - ₹{service.price}
                    </p>
                  )}
                </div>
              ))}
              {isEditing && (
                <button className="btn btn-success mt-2" onClick={addService}>
                  + Add
                </button>
              )}
            </div>

            <div className="mb-3">
              <label className="form-label text-dark fw-bold">Shop Image:</label>
              {isEditing && (
                <input
                  type="file"
                  className="form-control"
                  onChange={handleShopImageChange}
                />
              )}
              <p className="mt-2">
                {userData?.shopImage ? 'Shop image has been uploaded.' : 'No shop image uploaded.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BDashboard;
