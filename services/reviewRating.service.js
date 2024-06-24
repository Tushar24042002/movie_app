import ReviewRating from '../models/ReviewRating.js';
import { getCurrentUser } from '../services/user.service.js'; // Adjust the path as needed

// Add or Update Review and Rating
export const addReviewRating = async (req, res) => {
  try {
    const user = await getCurrentUser(req); // Get the current user from the request
    const { movieId, rating, review } = req.body;

    // Find existing review rating
    const existingReviewRating = await ReviewRating.findOne({
      where: {
        userId: user.id,
        movieId: movieId,
      },
    });

    if (existingReviewRating) {
      existingReviewRating.rating = rating;
      existingReviewRating.review = review;
      await existingReviewRating.save();
      return res.status(200).json(existingReviewRating);
    } else {
      // Create new review rating
      const newReviewRating = await ReviewRating.create({
        userId: user.id,
        movieId: movieId,
        rating: rating,
        review: review,
      });
      return res.status(201).json(newReviewRating);
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
