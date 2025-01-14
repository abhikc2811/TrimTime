import React from "react";
import RatingStars from "../components/RatingStars";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const Reviews = () => {
  const reviews = [
    {
      name: "John Doe",
      rating: 4.5,
      comment: "Great service and friendly staff! Would highly recommend.",
    },
    {
      name: "Jane Smith",
      rating: 5,
      comment: "Absolutely amazing experience. Exceeded my expectations!",
    },
    {
      name: "Sam Wilson",
      rating: 3.5,
      comment: "Good service, but there's room for improvement.",
    },
  ];

  const renderStars = (rating) => {

    return (
      <>
        <RatingStars rating={rating} />
      </>
    );
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Customer Reviews</h2>
      <ul className="list-group">
        {reviews.map((review, index) => (
          <li key={index} className="list-group-item mb-4">
            <div className="mb-2">
              <strong>{review.name}</strong>
            </div>
            <div className="mb-2">{renderStars(review.rating)}</div>
            <p>{review.comment}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Reviews;
