const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    maxlength: 50
  },
  rating: {
    type: Number,
    required: [true, 'Rating is required'],
    min: 1,
    max: 5
  },
  comment: {
    type: String,
    required: [true, 'Comment is required'],
    trim: true,
    maxlength: 500
  },
  isApproved: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// One review per user
reviewSchema.index({ user: 1 }, { unique: true });

module.exports = mongoose.model('Review', reviewSchema);
