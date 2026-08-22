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
  CheckCircle,
  Monitor
} from 'lucide-react';
import { GoogleLogin } from '@react-oauth/google';
import SEO from '../components/SEO';

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState('student');
  const [selectedServiceType, setSelectedServiceType] = useState('tuition');
  const [isLoading, setIsLoading] = useState(false);
  const { register: registerUser, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  const googleClientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
  const hasValidGoogleClientId = googleClientId && googleClientId !== 'your-google-client-id.apps.googleusercontent.com';

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
        serviceType: selectedServiceType,
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
        navigate('/login');
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
    <div className="min-h-screen pt-32 pb-16 bg-orange-100">
      <SEO 
        title="Register as Student or Tutor | KLM Home Tuitions"
        description="Join KLM Home Tuitions as a student seeking quality 1-on-1 tutoring or as a verified tutor providing home & online tuitions."
        keywords="register home tutor, join klm home tuitions, tuition registration"
      />
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-slate-900 p-8 rounded-2xl shadow-[0_0_40px_-10px_rgba(0,0,0,0.3)] border border-slate-800 ring-1 ring-white/5"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <BookOpen className="h-12 w-12 text-orange-500" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">
              Join KLM HOME TUITIONS
            </h1>
            <p className="text-slate-400">
              Create your account and start your educational journey
            </p>
          </div>

          {/* Service Type Selection */}
          <div className="mb-8">
            <label className="block text-sm font-semibold text-slate-300 mb-4">
              I am interested in:
            </label>
            <div className="grid md:grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setSelectedServiceType('tuition')}
                className={`p-4 rounded-xl border-2 transition-all duration-200 text-left ${
                  selectedServiceType === 'tuition'
                    ? 'border-orange-500 bg-orange-500/10'
                    : 'border-slate-700 bg-slate-800/80 hover:border-orange-500/50 hover:bg-slate-800'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <BookOpen className={`h-6 w-6 ${selectedServiceType === 'tuition' ? 'text-orange-500' : 'text-slate-500'}`} />
                  <div>
                    <h3 className={`font-semibold ${selectedServiceType === 'tuition' ? 'text-white' : 'text-slate-300'}`}>Home Tuitions</h3>
                    <p className="text-xs text-slate-500 mt-0.5">Academic tutoring and courses</p>
                  </div>
                  {selectedServiceType === 'tuition' && (
                    <CheckCircle className="h-5 w-5 text-orange-500 ml-auto" />
                  )}
                </div>
              </button>
              <button
                type="button"
                onClick={() => setSelectedServiceType('tech')}
                className={`p-4 rounded-xl border-2 transition-all duration-200 text-left ${
                  selectedServiceType === 'tech'
                    ? 'border-orange-500 bg-orange-500/10'
                    : 'border-slate-700 bg-slate-800/80 hover:border-orange-500/50 hover:bg-slate-800'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Monitor className={`h-6 w-6 ${selectedServiceType === 'tech' ? 'text-orange-500' : 'text-slate-500'}`} />
                  <div>
                    <h3 className={`font-semibold ${selectedServiceType === 'tech' ? 'text-white' : 'text-slate-300'}`}>Tech Solutions</h3>
                    <p className="text-xs text-slate-500 mt-0.5">Web design and development</p>
                  </div>
                  {selectedServiceType === 'tech' && (
                    <CheckCircle className="h-5 w-5 text-orange-500 ml-auto" />
                  )}
                </div>
              </button>
            </div>
          </div>

          {/* Role Selection */}
          <div className="mb-8">
            <label className="block text-sm font-semibold text-slate-300 mb-4">
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
                    className={`p-4 rounded-xl border-2 transition-all duration-200 text-left ${
                      selectedRole === role.id
                        ? 'border-orange-500 bg-orange-500/10'
                        : 'border-slate-700 bg-slate-800/80 hover:border-orange-500/50 hover:bg-slate-800'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <Icon className={`h-6 w-6 ${
                        selectedRole === role.id ? 'text-orange-500' : 'text-slate-500'
                      }`} />
                      <div>
                        <h3 className={`font-semibold ${selectedRole === role.id ? 'text-white' : 'text-slate-300'}`}>{role.title}</h3>
                        <p className="text-xs text-slate-500 mt-0.5">{role.description}</p>
                      </div>
                      {selectedRole === role.id && (
                        <CheckCircle className="h-5 w-5 text-orange-500 ml-auto" />
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
                <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-500" />
                  <input
                    {...register('name', {
                      required: 'Name is required',
                      minLength: { value: 2, message: 'Name must be at least 2 characters' },
                    })}
                    type="text"
                    id="name"
                    className="w-full pl-10 pr-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                    placeholder="Enter your full name"
                  />
                </div>
                {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>}
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-500" />
                  <input
                    {...register('email', {
                      required: 'Email is required',
                      pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: 'Please enter a valid email address' },
                    })}
                    type="email"
                    id="email"
                    className="w-full pl-10 pr-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                    placeholder="Enter your email"
                  />
                </div>
                {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-slate-300 mb-2">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-500" />
                  <input
                    {...register('phone', {
                      required: 'Phone number is required',
                      pattern: { value: /^[0-9]{10}$/, message: 'Please enter a valid 10-digit phone number' },
                    })}
                    type="tel"
                    id="phone"
                    className="w-full pl-10 pr-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                    placeholder="Enter your phone number"
                  />
                </div>
                {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone.message}</p>}
              </div>

              {/* Password */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-slate-300 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-500" />
                  <input
                    {...register('password', {
                      required: 'Password is required',
                      minLength: { value: 6, message: 'Password must be at least 6 characters' },
                    })}
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    className="w-full pl-10 pr-10 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-500 hover:text-slate-300"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>}
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-slate-300 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-500" />
                <input
                  {...register('confirmPassword', {
                    required: 'Please confirm your password',
                    validate: (value) => value === password || 'Passwords do not match',
                  })}
                  type={showConfirmPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  className="w-full pl-10 pr-10 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                  placeholder="Confirm your password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-500 hover:text-slate-300"
                >
                  {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              {errors.confirmPassword && <p className="mt-1 text-sm text-red-500">{errors.confirmPassword.message}</p>}
            </div>

            {/* Role-specific fields */}
            {selectedRole === 'student' && (
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="grade" className="block text-sm font-medium text-slate-300 mb-2">
                    Grade/Class
                  </label>
                  <input
                    {...register('grade', { required: 'Grade is required for students' })}
                    type="text"
                    id="grade"
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                    placeholder="e.g., 10th, 12th, B.Tech 2nd year"
                  />
                  {errors.grade && <p className="mt-1 text-sm text-red-500">{errors.grade.message}</p>}
                </div>
                <div>
                  <label htmlFor="subjects" className="block text-sm font-medium text-slate-300 mb-2">
                    Subjects (comma separated)
                  </label>
                  <input
                    {...register('subjects', { required: 'At least one subject is required' })}
                    type="text"
                    id="subjects"
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                    placeholder="e.g., Mathematics, Physics, English"
                  />
                  {errors.subjects && <p className="mt-1 text-sm text-red-500">{errors.subjects.message}</p>}
                </div>
              </div>
            )}

            {selectedRole === 'tutor' && (
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="qualification" className="block text-sm font-medium text-slate-300 mb-2">
                    Qualification
                  </label>
                  <input
                    {...register('qualification', { required: 'Qualification is required for tutors' })}
                    type="text"
                    id="qualification"
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                    placeholder="e.g., M.Sc Mathematics, B.Tech"
                  />
                  {errors.qualification && <p className="mt-1 text-sm text-red-500">{errors.qualification.message}</p>}
                </div>
                <div>
                  <label htmlFor="experience" className="block text-sm font-medium text-slate-300 mb-2">
                    Years of Experience
                  </label>
                  <input
                    {...register('experience', {
                      required: 'Experience is required for tutors',
                      min: { value: 0, message: 'Experience cannot be negative' },
                    })}
                    type="number"
                    id="experience"
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                    placeholder="e.g., 3"
                  />
                  {errors.experience && <p className="mt-1 text-sm text-red-500">{errors.experience.message}</p>}
                </div>
                <div>
                  <label htmlFor="subjectsTaught" className="block text-sm font-medium text-slate-300 mb-2">
                    Subjects You Teach (comma separated)
                  </label>
                  <input
                    {...register('subjectsTaught', { required: 'At least one subject is required' })}
                    type="text"
                    id="subjectsTaught"
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                    placeholder="e.g., Mathematics, Physics, Chemistry"
                  />
                  {errors.subjectsTaught && <p className="mt-1 text-sm text-red-500">{errors.subjectsTaught.message}</p>}
                </div>
                <div>
                  <label htmlFor="hourlyRate" className="block text-sm font-medium text-slate-300 mb-2">
                    Hourly Rate (₹)
                  </label>
                  <input
                    {...register('hourlyRate', {
                      required: 'Hourly rate is required for tutors',
                      min: { value: 0, message: 'Rate cannot be negative' },
                    })}
                    type="number"
                    id="hourlyRate"
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                    placeholder="e.g., 500"
                  />
                  {errors.hourlyRate && <p className="mt-1 text-sm text-red-500">{errors.hourlyRate.message}</p>}
                </div>
              </div>
            )}

            {/* Address Fields */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="street" className="block text-sm font-medium text-slate-300 mb-2">
                  Street Address
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-500" />
                  <input
                    {...register('street', { required: 'Street address is required' })}
                    type="text"
                    id="street"
                    className="w-full pl-10 pr-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                    placeholder="Enter your street address"
                  />
                </div>
                {errors.street && <p className="mt-1 text-sm text-red-500">{errors.street.message}</p>}
              </div>
              <div>
                <label htmlFor="city" className="block text-sm font-medium text-slate-300 mb-2">
                  City
                </label>
                <input
                  {...register('city', { required: 'City is required' })}
                  type="text"
                  id="city"
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                  placeholder="Enter your city"
                />
                {errors.city && <p className="mt-1 text-sm text-red-500">{errors.city.message}</p>}
              </div>
              <div>
                <label htmlFor="state" className="block text-sm font-medium text-slate-300 mb-2">
                  State
                </label>
                <input
                  {...register('state', { required: 'State is required' })}
                  type="text"
                  id="state"
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                  placeholder="Enter your state"
                />
                {errors.state && <p className="mt-1 text-sm text-red-500">{errors.state.message}</p>}
              </div>
              <div>
                <label htmlFor="pincode" className="block text-sm font-medium text-slate-300 mb-2">
                  Pincode
                </label>
                <input
                  {...register('pincode', {
                    required: 'Pincode is required',
                    pattern: { value: /^[0-9]{6}$/, message: 'Please enter a valid 6-digit pincode' },
                  })}
                  type="text"
                  id="pincode"
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                  placeholder="Enter your pincode"
                />
                {errors.pincode && <p className="mt-1 text-sm text-red-500">{errors.pincode.message}</p>}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold rounded-xl shadow-lg transition-all flex items-center justify-center transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none text-lg"
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

          {/* Divider & Google Login */}
          {hasValidGoogleClientId && (
            <>
              <div className="my-8">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-slate-800" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-slate-900 text-slate-500">Or sign up with</span>
                  </div>
                </div>
              </div>

              <div className="flex justify-center mb-8">
                <GoogleLogin
                  onSuccess={async (credentialResponse) => {
                    const result = await loginWithGoogle(credentialResponse.credential);
                    if (result.success) {
                      navigate('/dashboard');
                    }
                  }}
                  onError={() => {
                    console.error('Google Sign-up Failed');
                  }}
                />
              </div>
            </>
          )}

          {/* Login Link */}
          <div className="text-center">
            <p className="text-slate-400">
              Already have an account?{' '}
              <Link
                to="/login"
                className="text-orange-500 hover:text-orange-400 font-bold transition-colors"
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
