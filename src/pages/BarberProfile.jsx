import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate, useLocation } from "react-router-dom";

const BarberProfile = () => {
  const navigate = useNavigate();
  const location = useLocation();  // Import useLocation to access location state

  const [profileImage, setProfileImage] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    mobile: location.state?.mobile || "",  // Mobile is set from location state if available
    barberShopName: "",
    location: "",
    email: "",
    agree: false,
  });

  useEffect(() => {
    if (location.state?.mobile) {
      setFormData((prevState) => ({
        ...prevState,
        mobile: location.state.mobile,  // Updating formData if mobile exists in state
      }));
    }
  }, [location.state]);

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
    navigate("/Barber/dashboard", { state: { ...formData, profileImage } });
  };

  return (
    <div className="container-box">
      <div className="">
        <div className="text-center mb-4">
          <h1 style={{ fontSize: "2rem", fontWeight: "bold", color: "#007bff" }}>
            Enter Details
          </h1>
        </div>

        <div className="row justify-content-center">
          <div className="col-md-6">
            <form onSubmit={handleSubmit}>
              <div className="mb-4 text-center">
                <label htmlFor="profileImage">
                  <img
                    src={profileImage || "https://via.placeholder.com/150?text=Profile+Image"}
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

              <div className="mb-3">
                <label htmlFor="barberShopName" className="form-label">
                  Barber's Shop Name
                </label>
                <input
                  type="text"
                  id="barberShopName"
                  name="barberShopName"
                  className="form-control"
                  placeholder="Enter your shop name"
                  value={formData.barberShopName}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="location" className="form-label">
                  Location
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  className="form-control"
                  placeholder="Enter your shop's address"
                  value={formData.location}
                  onChange={handleInputChange}
                  required
                />
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
  );
};

export default BarberProfile;
