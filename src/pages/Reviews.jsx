import React from "react";
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
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
      <>
        {[...Array(fullStars)].map((_, i) => (
          <FaStar key={`full-${i}`} className="text-warning" />
        ))}
        {hasHalfStar && <FaStarHalfAlt className="text-warning" />}
        {[...Array(emptyStars)].map((_, i) => (
          <FaRegStar key={`empty-${i}`} className="text-warning" />
        ))}
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
