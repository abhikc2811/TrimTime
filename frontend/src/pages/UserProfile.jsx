import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

const UserProfile = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const role = useAuthStore((state) => state.role);
  const emailFromStore = useAuthStore((state) => state.email);
  const register = useAuthStore((state) => state.register);

  const [profilePic, setProfilePic] = useState(null);
  const [profileFile, setProfileFile] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    mobile: location.state?.mobile || "",
    email: emailFromStore || "",
    password: "",
    agree: false,
    shopName: "",
    location: "",
  });
  const [errors, setErrors] = useState({ mobile: "" });

  useEffect(() => {
    if (emailFromStore) {
      setFormData((prev) => ({
        ...prev,
        email: emailFromStore,
      }));
    }
  }, [emailFromStore]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    let updatedValue = type === "checkbox" ? checked : value;

    if (name === "mobile") {
      const isValid = /^[0-9]{0,10}$/.test(value);
      if (!isValid) return;
      setErrors((prev) => ({
        ...prev,
        mobile: value.length === 10 || value === "" ? "" : "Please enter a valid phone number.",
      }));
      updatedValue = value;
    }

    setFormData((prevState) => ({
      ...prevState,
      [name]: updatedValue,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setProfilePic(reader.result);
    reader.readAsDataURL(file);
    setProfileFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.agree) {
      alert("You must agree to the privacy policy and terms of conditions.");
      return;
    }
    if (formData.mobile.length !== 10) {
      setErrors({ ...errors, mobile: "Please enter a valid phone number." });
      return;
    }
    if (!formData.password) {
      alert("Please enter a password.");
      return;
    }

    // If barber, ensure shop fields are filled
    if (role === 'barber' && (!formData.shopName || !formData.location)) {
      alert("Please enter your shop name and location.");
      return;
    }

    const dataToRegister = {
      ...formData,
      profileFile,
      role,
      email: emailFromStore,
    };

    try {
      await register(dataToRegister);
      alert("Profile updated successfully!");
      if (role === 'barber') {
        navigate("/barber/dashboard", { state: { ...dataToRegister } });
      } else {
        navigate("/Customer/dashboard", { state: { ...dataToRegister } });
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred while registering the customer.");
    }
  };

  return (
    <div className="container-box">
      <div className="container mt-2">
        <div className="text-center mb-4">
          <h1 style={{ fontSize: "2rem", fontWeight: "bold", color: "#007bff" }}>
            Edit Profile
          </h1>
        </div>

        <div className="row justify-content-center">
          <div className="col-md-6">
            <form onSubmit={handleSubmit}>
              <div className="mb-4 text-center">
                <label htmlFor="profilePic">
                  <img
                    src={ profilePic || "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png" }
                    alt="Profile"
                    className="rounded-circle"
                    style={{
                      width: "120px",
                      height: "120px",
                      objectFit: "cover",
                      cursor: "pointer",
                    }}
                  />
                </label>
                <input
                  type="file"
                  id="profilePic"
                  className="d-none"
                  accept="image/*"
                  onChange={handleImageChange}
                />
                <p className="small text-muted mt-2">Click image to upload</p>
              </div>

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
                  maxLength="10"
                />
                {errors.mobile && (
                  <p className="text-danger mt-1" style={{ fontSize: "0.9rem" }}>
                    {errors.mobile}
                  </p>
                )}
              </div>

              {role === 'barber' && (
                <>
                  <div className="mb-3">
                    <label htmlFor="shopName" className="form-label">
                      Shop Name
                    </label>
                    <input
                      type="text"
                      id="shopName"
                      name="shopName"
                      className="form-control"
                      placeholder="Enter your shop name"
                      value={formData.shopName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="location" className="form-label">
                      Shop Location
                    </label>
                    <input
                      type="text"
                      id="location"
                      name="location"
                      className="form-control"
                      placeholder="Enter your shop location"
                      value={formData.location}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </>
              )}

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
                  readOnly
                />
              </div>

              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="form-control"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
              </div>

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
                  I agree to the <a href="#privacy">Privacy Policy</a> & <a href="#terms">Terms and Conditions</a>.
                </label>
              </div>

              <div className="text-center">
                <button type="submit" className="btn btn-primary w-100">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
