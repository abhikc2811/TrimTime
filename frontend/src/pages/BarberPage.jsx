import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Card, Form, Button, Alert, Modal } from 'react-bootstrap';
import axiosInstance from '../api/axios';

const BarberPage = () => {
  const { barberId } = useParams();
  const [barber, setBarber] = useState(null);
  const [selectedService, setSelectedService] = useState('');
  const [dateTime, setDateTime] = useState('');
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [feedback, setFeedback] = useState({ type: '', message: '' });
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchBarber = async () => {
      try {
        const { data } = await axiosInstance.get(`/barbers/${barberId}`);
        setBarber(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchBarber();
  }, [barberId]);

  const handleBooking = async () => {
    if (!selectedService || !dateTime) {
      setFeedback({ type: 'danger', message: 'Please select a service and date/time.' });
      setShowModal(true);
      return;
    }
    try {
      await axiosInstance.post('/appointments', {
        barberId,
        service: selectedService,
        datetime: dateTime,
      });
      setFeedback({ type: 'success', message: 'Appointment booked successfully!' });
      setShowModal(true);
    } catch (err) {
      setFeedback({ type: 'danger', message: err.response?.data?.message || 'Booking failed.' });
      setShowModal(true);
    }
  };

  const handleReviewSubmit = async () => {
    if (rating < 1 || rating > 5) {
      setFeedback({ type: 'danger', message: 'Rating must be between 1 and 5.' });
      setShowModal(true);
      return;
    }
    try {
      await axiosInstance.post(`/barbers/${barberId}/rate`, { rating, review });
      setFeedback({ type: 'success', message: 'Review submitted!' });
      setShowModal(true);
    } catch (err) {
      setFeedback({ type: 'danger', message: err.response?.data?.message || 'Review failed.' });
      setShowModal(true);
    }
  };

  if (!barber) return <p className="text-center mt-5">Loading...</p>;

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Card className="shadow-lg rounded-3">
            <Card.Img
              variant="top"
              src={
                barber.shopImage ||
                'https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png'
              }
            />
            <Card.Body>
              <Card.Title className="mb-3">{barber.shopName}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">{barber.location}</Card.Subtitle>
              <hr />

              <Form.Group controlId="serviceSelect" className="mb-3">
                <Form.Label>Select Service</Form.Label>
                <Form.Control
                  as="select"
                  value={selectedService}
                  onChange={(e) => setSelectedService(e.target.value)}
                >
                  <option value="">-- Choose one --</option>
                  {barber.services.map((svc) => (
                    <option key={svc._id || svc.name} value={svc.name}>
                      {svc.name} ({svc.price}₹)
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>

              <Form.Group controlId="datetime" className="mb-4">
                <Form.Label>Pick Date & Time</Form.Label>
                <Form.Control
                  type="datetime-local"
                  value={dateTime}
                  onChange={(e) => setDateTime(e.target.value)}
                />
              </Form.Group>

              <Button variant="primary" size="lg" onClick={handleBooking} className="w-100 mb-4">
                Book Appointment
              </Button>

              <Card.Text className="fw-bold">Leave a Review</Card.Text>
              <Form.Group controlId="rating" className="mb-2">
                <Form.Label>Rating (1-5)</Form.Label>
                <Form.Control
                  type="number"
                  min={1}
                  max={5}
                  value={rating}
                  onChange={(e) => setRating(Number(e.target.value))}
                />
              </Form.Group>

              <Form.Group controlId="review" className="mb-3">
                <Form.Label>Your Feedback</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                />
              </Form.Group>

              <Button variant="success" onClick={handleReviewSubmit} className="w-100">
                Submit Review
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Notification</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Alert variant={feedback.type}>{feedback.message}</Alert>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default BarberPage;
