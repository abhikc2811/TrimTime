import React, { useState, useEffect } from 'react';
import { useAuthStore } from '../store/useAuthStore';

const BDashboard = () => {
  const user = useAuthStore((s) => s.user);
  const loading = useAuthStore((s) => s.loading);
  const error = useAuthStore((s) => s.error);
  const updateProfile = useAuthStore((s) => s.updateProfile);

  const [userData, setUserData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [services, setServices] = useState([]);
  const [profileFile, setProfileFile] = useState(null);
  const [shopFile, setShopFile] = useState(null);
  const [previewProfile, setPreviewProfile] = useState(null);
  const [previewShop, setPreviewShop] = useState(null);

  useEffect(() => {
    if (user) {
      setUserData(user);
      setServices(user.services || []);
      setPreviewProfile(user.profilePic || '');
      setPreviewShop(user.shopImage || '');
    }
  }, [user]);

  const handleEditToggle = async () => {
    if (isEditing && userData) {
      try {
        const formData = new FormData();
        ['name', 'mobile', 'shopName', 'location', 'email'].forEach((f) => {
          if (userData[f] != null) formData.append(f, userData[f]);
        });
        formData.append('services', JSON.stringify(services));
        if (profileFile) formData.append('profilePic', profileFile);
        if (shopFile) formData.append('shopImage', shopFile);

        const updated = await updateProfile(formData);
        setUserData(updated);
        setServices(updated.services || []);
        setPreviewProfile(updated.profilePic);
        setPreviewShop(updated.shopImage);
        setProfileFile(null);
        setShopFile(null);
        alert('Profile updated successfully!');
      } catch (e) {
        console.error('Error updating profile:', e);
        alert('Error updating profile');
      }
    }
    setIsEditing((p) => !p);
  };

  const handleChange = ({ target: { name, value } }) =>
    setUserData((p) => ({ ...p, [name]: value }));

  const handleServiceChange = (i, field, val) => {
    const copy = [...services];
    copy[i][field] = val;
    setServices(copy);
  };

  const addService = () => setServices([...services, { name: '', price: '' }]);
  const removeService = (i) => setServices(services.filter((_, idx) => idx !== i));

  const handleFile = (e, isShop) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    if (isShop) {
      setShopFile(file);
      setPreviewShop(url);
    } else {
      setProfileFile(file);
      setPreviewProfile(url);
    }
  };

  return (
    <div className="container my-3">
      <div className="card shadow p-4">
        {error && <div className="alert alert-danger">{error}</div>}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="h3">Welcome, {userData?.name || 'Guest'}!</h1>
          <button
            className="btn btn-primary"
            onClick={handleEditToggle}
            disabled={loading}
          >
            {loading
              ? isEditing
                ? 'Saving…'
                : 'Loading…'
              : isEditing
              ? 'Save'
              : 'Edit'}
          </button>
        </div>
        <div className="row">
          {/* Images */}
          <div className="col-md-4 text-center">
            <img
              src={
                previewProfile ||
                'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png'
              }
              alt="Profile"
              className="rounded-circle mb-3"
              style={{ width: 150, height: 150, border: '2px solid #ddd' }}
            />
            {isEditing && (
              <input
                type="file"
                className="form-control mb-2"
                accept="image/*"
                onChange={(e) => handleFile(e, false)}
              />
            )}
            <img
              src={previewShop || ''}
              alt="Shop"
              className="img-fluid mb-3"
              style={{ border: '2px solid #ddd' }}
            />
            {isEditing && (
              <input
                type="file"
                className="form-control"
                accept="image/*"
                onChange={(e) => handleFile(e, true)}
              />
            )}
          </div>
          {/* Details & Services */}
          <div className="col-md-8">
            {['name', 'mobile', 'shopName', 'location', 'email'].map((field) => (
              <div className="mb-3" key={field}>
                <label className="fw-bold text-dark">
                  {field.charAt(0).toUpperCase() + field.slice(1)}:
                </label>
                {isEditing ? (
                  <input
                    type={field === 'email' ? 'email' : 'text'}
                    className="form-control"
                    name={field}
                    value={userData?.[field] || ''}
                    onChange={handleChange}
                    readOnly={field === 'email'}
                  />
                ) : (
                  <p className="form-control-plaintext text-secondary">
                    {userData?.[field] || ''}
                  </p>
                )}
              </div>
            ))}
            <div className="mb-3">
              <label className="fw-bold text-dark">Services:</label>
              {services.map((s, i) => (
                <div className="d-flex align-items-center mb-2" key={i}>
                  {isEditing ? (
                    <>
                      <input
                        className="form-control me-2"
                        placeholder="Name"
                        value={s.name}
                        onChange={(e) => handleServiceChange(i, 'name', e.target.value)}
                      />
                      <input
                        className="form-control me-2"
                        placeholder="Price"
                        value={s.price}
                        onChange={(e) => handleServiceChange(i, 'price', e.target.value)}
                      />
                      <button
                        className="btn btn-danger"
                        onClick={() => removeService(i)}
                      >
                        Remove
                      </button>
                    </>
                  ) : (
                    <p className="form-control-plaintext text-secondary">
                      {s.name} – ₹{s.price}
                    </p>
                  )}
                </div>
              ))}
              {isEditing && (
                <button className="btn btn-success" onClick={addService}>
                  + Add Service
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BDashboard;
