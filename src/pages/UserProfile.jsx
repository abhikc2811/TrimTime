import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  const [profileImage, setProfileImage] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    mobile: "",
    email: "",
    agree: false,
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setProfileImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.agree) {
      alert("You must agree to the privacy policy and terms of conditions.");
      return;
    }
    console.log("Profile Updated:", formData);
    // Redirect to the user-dashboard
    navigate("/user");
  };

  return (
    <div className="container mt-5">
      {/* Title */}
      <div className="text-center mb-4">
        <h1 style={{ fontSize: "2rem", fontWeight: "bold", color: "#007bff" }}>
          Edit Profile
        </h1>
      </div>

      {/* Form Section */}
      <div className="row justify-content-center">
        <div className="col-md-6">
          <form onSubmit={handleSubmit}>
            {/* Profile Image */}
            <div className="mb-4 text-center">
              <label htmlFor="profileImage">
                <img
                  src={
                    profileImage ||
                    "https://via.placeholder.com/150?text=Profile+Image"
                  }
                  alt="Profile"
                  className="rounded-circle"
                  style={{
                    width: "150px",
                    height: "150px",
                    objectFit: "cover",
                    cursor: "pointer",
                  }}
                />
              </label>
              <input
                type="file"
                id="profileImage"
                className="d-none"
                accept="image/*"
                onChange={handleImageChange}
              />
              <p className="small text-muted mt-2">Click image to upload</p>
            </div>

            {/* Name */}
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="form-control"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* Age */}
            <div className="mb-3">
              <label htmlFor="age" className="form-label">
                Age
              </label>
              <input
                type="number"
                id="age"
                name="age"
                className="form-control"
                placeholder="Enter your age"
                value={formData.age}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* Mobile Number */}
            <div className="mb-3">
              <label htmlFor="mobile" className="form-label">
                Mobile Number
              </label>
              <input
                type="tel"
                id="mobile"
                name="mobile"
                className="form-control"
                placeholder="Enter your mobile number"
                value={formData.mobile}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* Email */}
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email ID
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="form-control"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* Privacy Policy Checkbox */}
            <div className="mb-4 form-check">
              <input
                type="checkbox"
                id="agree"
                name="agree"
                className="form-check-input"
                checked={formData.agree}
                onChange={handleInputChange}
              />
              <label htmlFor="agree" className="form-check-label">
                I agree to the <a href="#privacy">Privacy Policy</a> &{" "}
                <a href="#terms">Terms and Conditions</a>.
              </label>
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button type="submit" className="btn btn-primary w-100">
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
