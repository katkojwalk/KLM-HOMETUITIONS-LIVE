import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { 
  User, 
  BookOpen, 
  GraduationCap, 
  Settings, 
  Edit, 
  Save, 
  X,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Award,
  Clock
} from 'lucide-react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

const Dashboard = () => {
  const { user, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (user) {
      reset({
        name: user.name || '',
        phone: user.phone || '',
        street: user.address?.street || '',
        city: user.address?.city || '',
        state: user.address?.state || '',
        pincode: user.address?.pincode || '',
      });
    }
  }, [user, reset]);

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const profileData = {
        name: data.name,
        phone: data.phone,
        address: {
          street: data.street,
          city: data.city,
          state: data.state,
          pincode: data.pincode,
        },
      };

      const result = await updateProfile(profileData);
      if (result.success) {
        setIsEditing(false);
      }
    } catch (error) {
      console.error('Profile update error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getRoleIcon = () => {
    return user?.role === 'tutor' ? GraduationCap : BookOpen;
  };

  const getRoleColor = () => {
    return user?.role === 'tutor' ? 'text-purple-600' : 'text-blue-600';
  };

  const getRoleBgColor = () => {
    return user?.role === 'tutor' ? 'bg-purple-100' : 'bg-blue-100';
  };

  if (!user) {
    return (
      <div className="min-h-screen pt-32 flex items-center justify-center">
        <div className="text-center">
          <div className="spinner mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-16">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-medium mb-2 gradient-text">
            Welcome back, {user.name}!
          </h1>
          <p className="text-gray-600">
            Manage your profile and view your account information
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-1"
          >
            <div className="card p-6">
              <div className="text-center mb-6">
                <div className="w-24 h-24 bg-gradient-to-br from-primary-600 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <User className="h-12 w-12 text-white" />
                </div>
                <h2 className="text-2xl font-medium text-gray-800 mb-2">
                  {user.name}
                </h2>
                <div className="flex items-center justify-center space-x-2">
                  {React.createElement(getRoleIcon(), { 
                    className: `h-5 w-5 ${getRoleColor()}` 
                  })}
                  <span className={`font-medium capitalize ${getRoleColor()}`}>
                    {user.role}
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-gray-400" />
                  <span className="text-gray-700">{user.email}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-gray-400" />
                  <span className="text-gray-700">{user.phone}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5 text-gray-400" />
                  <span className="text-gray-700">
                    {user.address?.city}, {user.address?.state}
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <Calendar className="h-5 w-5 text-gray-400" />
                  <span className="text-gray-700">
                    Joined {new Date(user.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t">
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="btn-outline w-full"
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Profile
                </button>
              </div>
            </div>
          </motion.div>

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2"
          >
            {/* Profile Edit Form */}
            {isEditing && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="card p-6 mb-8"
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-medium text-gray-800">
                    Edit Profile
                  </h3>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name
                      </label>
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
                        className="input-field"
                        placeholder="Enter your full name"
                      />
                      {errors.name && (
                        <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number
                      </label>
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
                        className="input-field"
                        placeholder="Enter your phone number"
                      />
                      {errors.phone && (
                        <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="street" className="block text-sm font-medium text-gray-700 mb-2">
                        Street Address
                      </label>
                      <input
                        {...register('street', { required: 'Street address is required' })}
                        type="text"
                        id="street"
                        className="input-field"
                        placeholder="Enter your street address"
                      />
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
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
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

                  <div className="flex space-x-4">
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="btn-primary flex items-center disabled:opacity-50"
                    >
                      {isLoading ? (
                        <>
                          <div className="spinner mr-2"></div>
                          Saving...
                        </>
                      ) : (
                        <>
                          <Save className="h-4 w-4 mr-2" />
                          Save Changes
                        </>
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="btn-outline"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </motion.div>
            )}

            {/* Role-specific Information */}
            <div className="grid md:grid-cols-2 gap-6">
              {user.role === 'student' && (
                <>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="card p-6"
                  >
                    <div className="flex items-center space-x-3 mb-4">
                      <BookOpen className="h-6 w-6 text-blue-600" />
                      <h3 className="text-xl font-medium text-gray-800">Academic Info</h3>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <span className="text-sm text-gray-500">Grade/Class:</span>
                        <p className="font-medium">{user.grade}</p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-500">Subjects:</span>
                        <p className="font-medium">{user.subjects?.join(', ')}</p>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="card p-6"
                  >
                    <div className="flex items-center space-x-3 mb-4">
                      <Award className="h-6 w-6 text-green-600" />
                      <h3 className="text-xl font-medium text-gray-800">Progress</h3>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <span className="text-sm text-gray-500">Status:</span>
                        <p className="font-medium text-green-600">Active</p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-500">Last Session:</span>
                        <p className="font-medium">2 days ago</p>
                      </div>
                    </div>
                  </motion.div>
                </>
              )}

              {user.role === 'tutor' && (
                <>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="card p-6"
                  >
                    <div className="flex items-center space-x-3 mb-4">
                      <GraduationCap className="h-6 w-6 text-purple-600" />
                      <h3 className="text-xl font-medium text-gray-800">Teaching Info</h3>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <span className="text-sm text-gray-500">Qualification:</span>
                        <p className="font-medium">{user.qualification}</p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-500">Experience:</span>
                        <p className="font-medium">{user.experience} years</p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-500">Subjects:</span>
                        <p className="font-medium">{user.subjectsTaught?.join(', ')}</p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-500">Hourly Rate:</span>
                        <p className="font-medium">₹{user.hourlyRate}</p>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="card p-6"
                  >
                    <div className="flex items-center space-x-3 mb-4">
                      <Clock className="h-6 w-6 text-orange-600" />
                      <h3 className="text-xl font-medium text-gray-800">Teaching Stats</h3>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <span className="text-sm text-gray-500">Total Students:</span>
                        <p className="font-medium">15</p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-500">Hours Taught:</span>
                        <p className="font-medium">120 hours</p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-500">Rating:</span>
                        <p className="font-medium">4.8/5.0</p>
                      </div>
                    </div>
                  </motion.div>
                </>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 
