import React, { useState } from 'react';
import { Form, Button, Col, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const SignupPage = () => {
  const [role, setRole] = useState('user'); // 'user' or 'barber'
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    age: '',
    address: '',
    barberShopName: '',
    experience: '',
    servicesOffered: '',
    location: '',
  });

  const navigate = useNavigate(); // To navigate to different pages after signup

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Add your form submission logic here (e.g., send to API)
    console.log('Form Data:', formData);

    // Redirect to dashboard based on role after successful registration
    if (role === 'user') {
      navigate('/user-dashboard');  // Redirect to User Dashboard
    } else if (role === 'barber') {
      navigate('/barber-dashboard');  // Redirect to Barber Dashboard
    }
  };

  return (
    <div className="container">
      <h2 className="my-4">Signup Page</h2>
      
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Register as:</Form.Label>
          <div>
            <Form.Check
              type="radio"
              label="User"
              name="role"
              value="user"
              checked={role === 'user'}
              onChange={() => setRole('user')}
            />
            <Form.Check
              type="radio"
              label="Barber"
              name="role"
              value="barber"
              checked={role === 'barber'}
              onChange={() => setRole('barber')}
            />
          </div>
        </Form.Group>

        {/* Common fields */}
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

        {/* Conditional fields for User */}
        {role === 'user' && (
          <>
            <Form.Group>
              <Form.Label>Age</Form.Label>
              <Form.Control
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                placeholder="Enter your age"
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Enter your address"
              />
            </Form.Group>
          </>
        )}

        {/* Conditional fields for Barber */}
        {role === 'barber' && (
          <>
            <Form.Group>
              <Form.Label>Barber's Shop Name</Form.Label>
              <Form.Control
                type="text"
                name="barberShopName"
                value={formData.barberShopName}
                onChange={handleChange}
                placeholder="Enter your shop name"
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
          </>
        )}

        <Button variant="primary" type="submit" className="mt-3">
          Sign Up
        </Button>
      </Form>

      <hr />

      <h5>Sign up with Social Media</h5>
      <Row>
        <Col>
          <Button variant="danger" className="w-100 mb-2">
            Google
          </Button>
        </Col>
        <Col>
          <Button variant="primary" className="w-100 mb-2">
            Facebook
          </Button>
        </Col>
        <Col>
          <Button variant="info" className="w-100 mb-2">
            Twitter
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default SignupPage;
