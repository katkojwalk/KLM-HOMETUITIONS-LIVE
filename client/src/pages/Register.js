import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { 
  Eye, 
  EyeOff, 
  User, 
  Mail, 
  Lock, 
  Phone, 
  BookOpen, 
  GraduationCap,
  MapPin,
  CheckCircle
} from 'lucide-react';
import { GoogleLogin } from '@react-oauth/google';

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState('student');
  const [isLoading, setIsLoading] = useState(false);
  const { register: registerUser, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch('password');

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const userData = {
        ...data,
        role: selectedRole,
        address: {
          street: data.street,
          city: data.city,
          state: data.state,
          pincode: data.pincode,
        },
      };

      // Remove address fields from main data
      delete userData.street;
      delete userData.city;
      delete userData.state;
      delete userData.pincode;

      // Convert comma-separated strings to arrays for backend
      if (userData.subjects) {
        userData.subjects = userData.subjects.split(',').map(s => s.trim());
      }
      if (userData.subjectsTaught) {
        userData.subjectsTaught = userData.subjectsTaught.split(',').map(s => s.trim());
      }

      const result = await registerUser(userData);
      if (result.success) {
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Registration error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const roles = [
    {
      id: 'student',
      title: 'Student',
      icon: BookOpen,
      description: 'I want to learn and improve my academic performance'
    },
    {
      id: 'tutor',
      title: 'Tutor',
      icon: GraduationCap,
      description: 'I want to teach and help students succeed'
    }
  ];

  return (
    <div className="min-h-screen pt-32 pb-16 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="card p-8"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <BookOpen className="h-12 w-12 text-primary-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Join QUADRA HOME TUITIONS
            </h1>
            <p className="text-gray-600">
              Create your account and start your educational journey
            </p>
          </div>

          {/* Role Selection */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 mb-4">
              I am a:
            </label>
            <div className="grid md:grid-cols-2 gap-4">
              {roles.map((role) => {
                const Icon = role.icon;
                return (
                  <button
                    key={role.id}
                    type="button"
                    onClick={() => setSelectedRole(role.id)}
                    className={`p-4 rounded-lg border-2 transition-all duration-200 text-left ${
                      selectedRole === role.id
                        ? 'border-primary-600 bg-primary-50'
                        : 'border-gray-300 hover:border-primary-300'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <Icon className={`h-6 w-6 ${
                        selectedRole === role.id ? 'text-primary-600' : 'text-gray-400'
                      }`} />
                      <div>
                        <h3 className="font-semibold text-gray-800">{role.title}</h3>
                        <p className="text-sm text-gray-600">{role.description}</p>
                      </div>
                      {selectedRole === role.id && (
                        <CheckCircle className="h-5 w-5 text-primary-600 ml-auto" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Registration Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    {...register('name', {
                      required: 'Name is required',
                      minLength: {
                        value: 2,
                        message: 'Name must be at least 2 characters',
                      },
                    })}
                    type="text"
                    id="name"
                    className="input-field pl-10"
                    placeholder="Enter your full name"
                  />
                </div>
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    {...register('email', {
                      required: 'Email is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Please enter a valid email address',
                      },
                    })}
                    type="email"
                    id="email"
                    className="input-field pl-10"
                    placeholder="Enter your email"
                  />
                </div>
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    {...register('phone', {
                      required: 'Phone number is required',
                      pattern: {
                        value: /^[0-9]{10}$/,
                        message: 'Please enter a valid 10-digit phone number',
                      },
                    })}
                    type="tel"
                    id="phone"
                    className="input-field pl-10"
                    placeholder="Enter your phone number"
                  />
                </div>
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
                )}
              </div>

              {/* Password */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    {...register('password', {
                      required: 'Password is required',
                      minLength: {
                        value: 6,
                        message: 'Password must be at least 6 characters',
                      },
                    })}
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    className="input-field pl-10 pr-10"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
                )}
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  {...register('confirmPassword', {
                    required: 'Please confirm your password',
                    validate: (value) =>
                      value === password || 'Passwords do not match',
                  })}
                  type={showConfirmPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  className="input-field pl-10 pr-10"
                  placeholder="Confirm your password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-600">{errors.confirmPassword.message}</p>
              )}
            </div>

            {/* Role-specific fields */}
            {selectedRole === 'student' && (
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="grade" className="block text-sm font-medium text-gray-700 mb-2">
                    Grade/Class
                  </label>
                  <input
                    {...register('grade', {
                      required: 'Grade is required for students',
                    })}
                    type="text"
                    id="grade"
                    className="input-field"
                    placeholder="e.g., 10th, 12th, B.Tech 2nd year"
                  />
                  {errors.grade && (
                    <p className="mt-1 text-sm text-red-600">{errors.grade.message}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="subjects" className="block text-sm font-medium text-gray-700 mb-2">
                    Subjects (comma separated)
                  </label>
                  <input
                    {...register('subjects', {
                      required: 'At least one subject is required',
                    })}
                    type="text"
                    id="subjects"
                    className="input-field"
                    placeholder="e.g., Mathematics, Physics, English"
                  />
                  {errors.subjects && (
                    <p className="mt-1 text-sm text-red-600">{errors.subjects.message}</p>
                  )}
                </div>
              </div>
            )}

            {selectedRole === 'tutor' && (
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="qualification" className="block text-sm font-medium text-gray-700 mb-2">
                    Qualification
                  </label>
                  <input
                    {...register('qualification', {
                      required: 'Qualification is required for tutors',
                    })}
                    type="text"
                    id="qualification"
                    className="input-field"
                    placeholder="e.g., M.Sc Mathematics, B.Tech"
                  />
                  {errors.qualification && (
                    <p className="mt-1 text-sm text-red-600">{errors.qualification.message}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-2">
                    Years of Experience
                  </label>
                  <input
                    {...register('experience', {
                      required: 'Experience is required for tutors',
                      min: { value: 0, message: 'Experience cannot be negative' },
                    })}
                    type="number"
                    id="experience"
                    className="input-field"
                    placeholder="e.g., 3"
                  />
                  {errors.experience && (
                    <p className="mt-1 text-sm text-red-600">{errors.experience.message}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="subjectsTaught" className="block text-sm font-medium text-gray-700 mb-2">
                    Subjects You Teach (comma separated)
                  </label>
                  <input
                    {...register('subjectsTaught', {
                      required: 'At least one subject is required',
                    })}
                    type="text"
                    id="subjectsTaught"
                    className="input-field"
                    placeholder="e.g., Mathematics, Physics, Chemistry"
                  />
                  {errors.subjectsTaught && (
                    <p className="mt-1 text-sm text-red-600">{errors.subjectsTaught.message}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="hourlyRate" className="block text-sm font-medium text-gray-700 mb-2">
                    Hourly Rate (₹)
                  </label>
                  <input
                    {...register('hourlyRate', {
                      required: 'Hourly rate is required for tutors',
                      min: { value: 0, message: 'Rate cannot be negative' },
                    })}
                    type="number"
                    id="hourlyRate"
                    className="input-field"
                    placeholder="e.g., 500"
                  />
                  {errors.hourlyRate && (
                    <p className="mt-1 text-sm text-red-600">{errors.hourlyRate.message}</p>
                  )}
                </div>
              </div>
            )}

            {/* Address Fields */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="street" className="block text-sm font-medium text-gray-700 mb-2">
                  Street Address
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    {...register('street', { required: 'Street address is required' })}
                    type="text"
                    id="street"
                    className="input-field pl-10"
                    placeholder="Enter your street address"
                  />
                </div>
                {errors.street && (
                  <p className="mt-1 text-sm text-red-600">{errors.street.message}</p>
                )}
              </div>
              <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">
                  City
                </label>
                <input
                  {...register('city', { required: 'City is required' })}
                  type="text"
                  id="city"
                  className="input-field"
                  placeholder="Enter your city"
                />
                {errors.city && (
                  <p className="mt-1 text-sm text-red-600">{errors.city.message}</p>
                )}
              </div>
              <div>
                <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-2">
                  State
                </label>
                <input
                  {...register('state', { required: 'State is required' })}
                  type="text"
                  id="state"
                  className="input-field"
                  placeholder="Enter your state"
                />
                {errors.state && (
                  <p className="mt-1 text-sm text-red-600">{errors.state.message}</p>
                )}
              </div>
              <div>
                <label htmlFor="pincode" className="block text-sm font-medium text-gray-700 mb-2">
                  Pincode
                </label>
                <input
                  {...register('pincode', {
                    required: 'Pincode is required',
                    pattern: {
                      value: /^[0-9]{6}$/,
                      message: 'Please enter a valid 6-digit pincode',
                    },
                  })}
                  type="text"
                  id="pincode"
                  className="input-field"
                  placeholder="Enter your pincode"
                />
                {errors.pincode && (
                  <p className="mt-1 text-sm text-red-600">{errors.pincode.message}</p>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary w-full py-3 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="spinner mr-2"></div>
                  Creating account...
                </div>
              ) : (
                'Create Account'
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="my-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or sign up with</span>
              </div>
            </div>
          </div>

          <div className="flex justify-center mb-6">
            <GoogleLogin
              onSuccess={async (credentialResponse) => {
                const result = await loginWithGoogle(credentialResponse.credential, true);
                if (result.success) {
                  navigate('/dashboard');
                }
              }}
              onError={() => {
                console.error('Google Sign-up Failed');
              }}
            />
          </div>

          {/* Login Link */}
          <div className="text-center">
            <p className="text-gray-600">
              Already have an account?{' '}
              <Link
                to="/login"
                className="text-primary-600 hover:text-primary-700 font-medium transition-colors"
              >
                Sign in here
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Register; 