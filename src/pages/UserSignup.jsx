import React, { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import './SignupPage.css';

const UserSignup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    age: '',
    address: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('User Signup Data:', formData);
    // Add your form submission logic here
  };

  return (
    <div className="container-box">
        <h1>TrimTime</h1>
        <div className="signup-page-container">
        <h3 className="mb-4">User Registration</h3>

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

            <Button variant="primary" type="submit" className="mt-3">
            Sign Up
            </Button>
        </Form>
        </div>
    </div>
  );
};

export default UserSignup;
