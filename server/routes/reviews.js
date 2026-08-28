const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Review = require('../models/Review');
const User = require('../models/User');
const auth = require('../middleware/auth');
const { adminAuth } = require('../middleware/auth');

// @route   GET /api/reviews
// @desc    Get all approved reviews
// @access  Public
router.get('/', async (req, res) => {
  try {
    const reviews = await Review.find({ isApproved: true })
      .sort({ createdAt: -1 })
      .select('name rating comment createdAt');
    res.json(reviews);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET /api/reviews/stats
// @desc    Get review stats
// @access  Public
router.get('/stats', async (req, res) => {
  try {
    const stats = await Review.aggregate([
      { $match: { isApproved: true } },
      {
        $group: {
          _id: null,
          averageRating: { $avg: '$rating' },
          totalReviews: { $sum: 1 }
        }
      }
    ]);

    if (stats.length === 0) {
      return res.json({ averageRating: 0, totalReviews: 0 });
    }

    res.json({
      averageRating: Math.round(stats[0].averageRating * 10) / 10,
      totalReviews: stats[0].totalReviews
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST /api/reviews
// @desc    Create a review
// @access  Private
router.post(
  '/',
  [
    auth,
    [
      body('rating', 'Rating must be a number between 1 and 5').isInt({ min: 1, max: 5 }),
      body('comment', 'Comment must be between 5 and 500 characters').isLength({ min: 5, max: 500 })
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // Check if user already has a review
      let review = await Review.findOne({ user: req.user.userId });
      if (review) {
        return res.status(400).json({ message: 'You have already submitted a review' });
      }

      // Get user name
      const user = await User.findById(req.user.userId).select('name');
      if (!user) {
        return res.status(404).json({ msg: 'User not found' });
      }

      const { rating, comment } = req.body;

      review = new Review({
        user: req.user.userId,
        name: user.name,
        rating,
        comment
      });

      await review.save();
      res.json(review);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   GET /api/reviews/admin
// @desc    Get all reviews (admin)
// @access  Private/Admin
router.get('/admin', adminAuth, async (req, res) => {
  try {
    const reviews = await Review.find()
      .sort({ createdAt: -1 })
      .populate('user', 'name email');
    res.json(reviews);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT /api/reviews/:id/approve
// @desc    Toggle review approval
// @access  Private/Admin
router.put('/:id/approve', adminAuth, async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) {
      return res.status(404).json({ msg: 'Review not found' });
    }

    review.isApproved = !review.isApproved;
    await review.save();

    res.json(review);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Review not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route   DELETE /api/reviews/:id
// @desc    Delete a review
// @access  Private/Admin
router.delete('/:id', adminAuth, async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) {
      return res.status(404).json({ msg: 'Review not found' });
    }

    await review.deleteOne();
    res.json({ msg: 'Review removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Review not found' });
    }
    res.status(500).send('Server Error');
  }
});

module.exports = router;
