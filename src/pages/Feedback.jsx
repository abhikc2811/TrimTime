import React, { useState } from "react";

const Feedback = () => {
  const [feedback, setFeedback] = useState(""); // State for the feedback text
  const [submitted, setSubmitted] = useState(false); // State to track if feedback is submitted

  // Handle feedback submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (feedback.trim()) {
      setSubmitted(true);
      setFeedback(""); // Clear the text area after submission
    }
  };

  return (
    <div className="container mt-4">
      <h2>Feedback</h2>
      <p>We value your feedback. Please share your thoughts below:</p>
      
      {!submitted ? (
        <form onSubmit={handleSubmit}>
          {/* Textarea for feedback */}
          <div className="mb-3">
            <textarea
              className="form-control"
              placeholder="Write your feedback here..."
              rows="5"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)} // Update feedback state
              required
            ></textarea>
          </div>
          {/* Submit button */}
          <button type="submit" className="btn btn-primary">
            Send
          </button>
        </form>
      ) : (
        // Confirmation message after submission
        <div className="alert alert-success mt-3" role="alert">
          Thank you for submitting your valuable feedback!
        </div>
      )}
    </div>
  );
};

export default Feedback;
