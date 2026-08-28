import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Send, MessageSquare, User } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAuth } from '../contexts/AuthContext';

const ReviewsSection = () => {
  const { user, isAuthenticated } = useAuth();
  const [reviews, setReviews] = useState([]);
  const [stats, setStats] = useState({ averageRating: 0, totalReviews: 0 });
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');

  useEffect(() => {
    fetchReviews();
    fetchStats();
  }, []);

  const fetchReviews = async () => {
    try {
      const res = await axios.get('/api/reviews');
      setReviews(res.data || []);
    } catch (err) {
      console.error('Error fetching reviews:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const res = await axios.get('/api/reviews/stats');
      setStats(res.data || { averageRating: 0, totalReviews: 0 });
    } catch (err) {
      console.error('Error fetching review stats:', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (rating === 0) {
      toast.error('Please select a star rating');
      return;
    }
    if (comment.trim().length < 5) {
      toast.error('Comment must be at least 5 characters');
      return;
    }

    setSubmitting(true);
    try {
      await axios.post('/api/reviews', { rating, comment });
      toast.success('Review submitted! It will appear after admin approval.');
      setRating(0);
      setComment('');
      setShowForm(false);
      fetchReviews();
      fetchStats();
    } catch (err) {
      const msg = err.response?.data?.message || err.response?.data?.errors?.[0]?.msg || 'Failed to submit review';
      toast.error(msg);
    } finally {
      setSubmitting(false);
    }
  };

  const renderStars = (count, size = 'w-5 h-5') => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`${size} ${i < Math.round(count) ? 'text-orange-500 fill-orange-500' : 'text-slate-600'}`}
      />
    ));
  };

  const renderInteractiveStars = () => {
    return [...Array(5)].map((_, i) => (
      <button
        key={i}
        type="button"
        onClick={() => setRating(i + 1)}
        onMouseEnter={() => setHoverRating(i + 1)}
        onMouseLeave={() => setHoverRating(0)}
        className="focus:outline-none transition-transform hover:scale-110"
      >
        <Star
          className={`w-8 h-8 transition-colors ${
            i < (hoverRating || rating)
              ? 'text-orange-500 fill-orange-500'
              : 'text-slate-600'
          }`}
        />
      </button>
    ));
  };

  return (
    <section className="py-16 bg-white/70 border-t border-orange-200">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-2 mb-3 text-orange-600 font-bold">
            <MessageSquare className="w-5 h-5" />
            <span>Student & Parent Reviews</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
            What Our Students Say
          </h2>

          {/* Stats */}
          {stats.totalReviews > 0 && (
            <div className="flex items-center justify-center gap-3 mt-4">
              <div className="flex items-center gap-1">
                {renderStars(stats.averageRating, 'w-6 h-6')}
              </div>
              <span className="text-2xl font-bold text-slate-900">
                {stats.averageRating.toFixed(1)}
              </span>
              <span className="text-slate-500">
                ({stats.totalReviews} {stats.totalReviews === 1 ? 'review' : 'reviews'})
              </span>
            </div>
          )}
        </motion.div>

        {/* Reviews Grid */}
        {loading ? (
          <div className="text-center py-8 text-slate-500">Loading reviews...</div>
        ) : reviews.length === 0 ? (
          <div className="text-center py-8 text-slate-500">
            No reviews yet. Be the first to share your experience!
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {reviews.map((review, index) => (
              <motion.div
                key={review._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-slate-900 p-6 rounded-2xl shadow-lg border border-slate-800 ring-1 ring-white/5 hover:border-orange-500/50 transition-all"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 flex items-center justify-center shadow-lg shrink-0">
                    <span className="text-white font-bold text-sm">
                      {review.name?.charAt(0)?.toUpperCase() || 'U'}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white text-sm">{review.name}</h4>
                    <div className="flex items-center gap-1">
                      {renderStars(review.rating, 'w-3.5 h-3.5')}
                    </div>
                  </div>
                </div>
                <p className="text-slate-400 text-sm leading-relaxed">{review.comment}</p>
                <p className="text-slate-600 text-xs mt-3">
                  {new Date(review.createdAt).toLocaleDateString('en-IN', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                  })}
                </p>
              </motion.div>
            ))}
          </div>
        )}

        {/* Write Review Button / Form */}
        <div className="max-w-xl mx-auto">
          {isAuthenticated ? (
            <>
              {!showForm && (
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  onClick={() => setShowForm(true)}
                  className="w-full py-3.5 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold rounded-xl shadow-lg transition-all flex items-center justify-center transform hover:-translate-y-0.5"
                >
                  <Star className="w-5 h-5 mr-2" />
                  Write a Review
                </motion.button>
              )}

              <AnimatePresence>
                {showForm && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.4 }}
                    className="overflow-hidden"
                  >
                    <div className="bg-slate-900 p-6 md:p-8 rounded-2xl shadow-[0_0_40px_-10px_rgba(0,0,0,0.3)] border border-slate-800 ring-1 ring-white/5">
                      <h3 className="text-xl font-bold text-white mb-6 text-center">
                        Share Your Experience
                      </h3>
                      <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Star Rating */}
                        <div className="text-center">
                          <label className="block text-sm font-semibold text-slate-300 mb-3">
                            Your Rating
                          </label>
                          <div className="flex items-center justify-center gap-1">
                            {renderInteractiveStars()}
                          </div>
                          {rating > 0 && (
                            <p className="text-orange-400 text-sm mt-2 font-medium">
                              {['', 'Poor', 'Fair', 'Good', 'Very Good', 'Excellent'][rating]}
                            </p>
                          )}
                        </div>

                        {/* Comment */}
                        <div>
                          <label className="block text-sm font-semibold text-slate-300 mb-2">
                            Your Review
                          </label>
                          <textarea
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            rows={4}
                            maxLength={500}
                            className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all resize-none"
                            placeholder="Tell us about your experience..."
                          />
                          <p className="text-slate-600 text-xs mt-1 text-right">
                            {comment.length}/500
                          </p>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-3">
                          <button
                            type="button"
                            onClick={() => { setShowForm(false); setRating(0); setComment(''); }}
                            className="flex-1 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold rounded-xl transition-colors"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            disabled={submitting}
                            className="flex-1 py-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold rounded-xl shadow-lg transition-all flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            {submitting ? (
                              <div className="flex items-center">
                                <div className="spinner mr-2"></div>
                                Submitting...
                              </div>
                            ) : (
                              <div className="flex items-center">
                                <Send className="w-4 h-4 mr-2" />
                                Submit Review
                              </div>
                            )}
                          </button>
                        </div>
                      </form>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </>
          ) : (
            <div className="text-center">
              <p className="text-slate-500 text-sm">
                <a href="/login" className="text-orange-500 font-bold hover:text-orange-400 transition-colors">
                  Login
                </a>{' '}
                to write a review
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;
