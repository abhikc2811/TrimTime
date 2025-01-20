import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const EditProfile = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [profileImage, setProfileImage] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    mobile: location.state?.mobile || "",
    email: "",
    agree: false,
  });
  const [errors, setErrors] = useState({ mobile: "" });

  useEffect(() => {
    if (location.state?.mobile) {
      setFormData((prevState) => ({
        ...prevState,
        mobile: location.state.mobile,
      }));
    }
  }, [location.state]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });

    // Validation for mobile number
    if (name === "mobile") {
      const isValid = /^[0-9]{0,10}$/.test(value);
      if (!isValid) {
        return; // Prevents updating state if input exceeds 10 digits
      }
      setFormData({ ...formData, mobile: value });
      setErrors({
        ...errors,
        mobile: value.length === 10 || value === "" ? "" : "Please enter a valid phone number.",
      });
    }
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setProfileImage(URL.createObjectURL(e.target.files[0]));
    }
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
  
    const newCustomer = {
      ...formData,
      profileImage: profileImage || "",
    };
  
    try {
      const response = await fetch(`http://localhost:3001/customers`, {
        method: "POST", 
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCustomer),
      });
  
      if (!response.ok) {
        throw new Error("Failed to register customer.");
      }
  
      const savedCustomer = await response.json(); 

      console.log("Customer Registered:", savedCustomer);
      alert("Customer registered successfully!");

      navigate("/Customer/dashboard", { state: { ...savedCustomer } });
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
            <div
              style={{
                border: "2px solid white",
                borderRadius: "10px",
                padding: "15px",
              }}
            >
              <form onSubmit={handleSubmit}>
                <div className="mb-4 text-center">
                  <label htmlFor="profileImage">
                    <img
                      src={profileImage || "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"}
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
                    id="profileImage"
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

                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email ID (Optional)
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="form-control"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleInputChange}
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
                    I agree to the <a href="#privacy">Privacy Policy</a> &{" "}
                    <a href="#terms">Terms and Conditions</a>.
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
    </div>
  );
};

export default EditProfile;
