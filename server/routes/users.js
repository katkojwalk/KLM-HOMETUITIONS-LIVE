const express = require('express');
const User = require('../models/User');
const auth = require('../middleware/auth');

const router = express.Router();

// Get tutors (for students to browse)
router.get('/tutors', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const subject = req.query.subject;
    const search = req.query.search;

    const filter = { role: 'tutor', isActive: true, isVerified: true };
    
    if (subject) {
      filter.subjectsTaught = { $in: [subject] };
    }
    
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { qualification: { $regex: search, $options: 'i' } }
      ];
    }

    const skip = (page - 1) * limit;
    
    const tutors = await User.find(filter)
      .select('-password')
      .sort({ experience: -1, createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await User.countDocuments(filter);
    const totalPages = Math.ceil(total / limit);

    res.json({
      tutors,
      pagination: {
        currentPage: page,
        totalPages,
        totalTutors: total,
        hasNext: page < totalPages,
        hasPrev: page > 1
      }
    });

  } catch (error) {
    console.error('Get tutors error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get tutor by ID
router.get('/tutors/:id', async (req, res) => {
  try {
    const tutor = await User.findOne({ 
      _id: req.params.id, 
      role: 'tutor', 
      isActive: true 
    }).select('-password');
    
    if (!tutor) {
      return res.status(404).json({ message: 'Tutor not found' });
    }

    res.json({ tutor });
  } catch (error) {
    console.error('Get tutor error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get available subjects
router.get('/subjects', async (req, res) => {
  try {
    const subjects = await User.distinct('subjectsTaught', { 
      role: 'tutor', 
      isActive: true 
    });
    
    res.json({ subjects: subjects.filter(Boolean) });
  } catch (error) {
    console.error('Get subjects error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get user's own profile
router.get('/profile', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ user });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update user's own profile
router.put('/profile', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update allowed fields
    const allowedUpdates = ['name', 'phone', 'address', 'profileImage'];
    
    // Role-specific updates
    if (user.role === 'student') {
      allowedUpdates.push('grade', 'subjects');
    } else if (user.role === 'tutor') {
      allowedUpdates.push('qualification', 'experience', 'subjectsTaught', 'hourlyRate');
    }

    allowedUpdates.forEach(field => {
      if (req.body[field] !== undefined) {
        user[field] = req.body[field];
      }
    });

    await user.save();

    res.json({
      message: 'Profile updated successfully',
      user: user.toJSON()
    });

  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Upload profile image
router.post('/profile/image', auth, async (req, res) => {
  try {
    const { imageData } = req.body;
    
    if (!imageData) {
      return res.status(400).json({ message: 'Image data is required' });
    }

    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.profileImage = imageData;
    await user.save();

    res.json({
      message: 'Profile image updated successfully',
      profileImage: user.profileImage
    });

  } catch (error) {
    console.error('Upload image error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get user statistics (for tutors)
router.get('/stats', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    let stats = {
      totalStudents: 0,
      totalTutors: 0,
      totalUsers: 0
    };

    if (user.role === 'tutor') {
      stats.totalStudents = await User.countDocuments({ role: 'student', isActive: true });
    } else if (user.role === 'student') {
      stats.totalTutors = await User.countDocuments({ role: 'tutor', isActive: true, isVerified: true });
    }

    stats.totalUsers = await User.countDocuments({ isActive: true });

    res.json({ stats });
  } catch (error) {
    console.error('Get stats error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 