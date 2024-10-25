import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import './SignupPage.css'; // Assuming this exists

const BarberSignup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    barberShopName: '',
    experience: '',
    servicesOffered: '',
    location: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Barber Signup Data:', formData);
    // Add your form submission logic here
  };

  return (
    <div className="container-box">
    <div className="signup-page-container">
      <h3 className="my-4">Barber Registration</h3>

      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
            required
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            required
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Barber's Shop Name</Form.Label>
          <Form.Control
            type="text"
            name="barberShopName"
            value={formData.barberShopName}
            onChange={handleChange}
            placeholder="Enter your shop name"
            required
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Experience (Years)</Form.Label>
          <Form.Control
            type="number"
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            placeholder="Enter your experience"
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Services Offered</Form.Label>
          <Form.Control
            type="text"
            name="servicesOffered"
            value={formData.servicesOffered}
            onChange={handleChange}
            placeholder="Describe the services you offer"
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Location</Form.Label>
          <Form.Control
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Enter your shop location"
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="mt-3">
          Sign Up
        </Button>
      </Form>
    </div>
    </div>
  );
};

export default BarberSignup;
