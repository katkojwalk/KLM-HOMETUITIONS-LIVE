import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { 
  User, BookOpen, GraduationCap, Edit, Save, X, Phone, Mail, MapPin, 
  Calendar, Award, Clock, TrendingUp, DollarSign
} from 'lucide-react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { 
  LineChart, Line, BarChart, Bar, ResponsiveContainer, 
  Tooltip, CartesianGrid, XAxis, YAxis, PieChart, Pie, Cell 
} from 'recharts';

const Dashboard = () => {
  const { user, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm();

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
        toast.success("Profile updated successfully!");
      }
    } catch (error) {
      console.error('Profile update error:', error);
      toast.error("Failed to update profile");
    } finally {
      setIsLoading(false);
    }
  };

  const getRoleIcon = () => user?.role === 'tutor' ? GraduationCap : BookOpen;
  const getRoleColor = () => user?.role === 'tutor' ? 'text-orange-500' : 'text-blue-500';

  // --- MOCK DATA FOR CHARTS ---
  const studentPerformance = [
    { month: 'Jan', score: 65 },
    { month: 'Feb', score: 72 },
    { month: 'Mar', score: 68 },
    { month: 'Apr', score: 85 },
    { month: 'May', score: 82 },
    { month: 'Jun', score: 91 },
  ];

  const tutorEarnings = [
    { week: 'W1', hours: 12, earnings: 6000 },
    { week: 'W2', hours: 15, earnings: 7500 },
    { week: 'W3', hours: 10, earnings: 5000 },
    { week: 'W4', hours: 18, earnings: 9000 },
  ];

  const tutorStudents = [
    { name: 'Active', value: 12 },
    { name: 'Completed', value: 3 },
  ];
  const PIE_COLORS = ['#f97316', '#3b82f6']; 

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white border border-orange-100 p-3 rounded-lg shadow-xl text-slate-700">
          <p className="font-semibold text-slate-900 mb-1">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }} className="text-sm font-medium">
              {entry.name}: {entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  if (!user) {
    return (
      <div className="min-h-screen pt-32 bg-orange-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-slate-600 font-medium">Loading Dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-16 bg-orange-100">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-10 text-center lg:text-left flex flex-col lg:flex-row justify-between items-center gap-6"
        >
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-2 tracking-tight">
              Welcome back, <span className="text-orange-500">{user.name}</span>!
            </h1>
            <p className="text-slate-600 text-lg">
              Manage your profile, track progress, and view analytics.
            </p>
          </div>
          <button 
            onClick={() => setIsEditing(!isEditing)}
            className="px-6 py-3 bg-white hover:bg-orange-50 border border-orange-200 text-slate-700 rounded-xl shadow-sm hover:shadow-md transition-all flex items-center font-bold"
          >
            {isEditing ? <X className="h-5 w-5 mr-2" /> : <Edit className="h-5 w-5 mr-2" />}
            {isEditing ? 'Cancel Editing' : 'Edit Profile'}
          </button>
        </motion.div>

        {/* TOP ROW: Horizontal Profile Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-8"
        >
          <div className="bg-white p-8 rounded-2xl shadow-lg border border-orange-100 relative overflow-hidden flex flex-col md:flex-row items-center gap-8">
            <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-orange-500 to-orange-400"></div>
            
            {/* Avatar & Name */}
            <div className="flex flex-col items-center md:items-start text-center md:text-left shrink-0 pl-4">
              <div className="w-28 h-28 bg-orange-50 rounded-full flex items-center justify-center border-4 border-white shadow-md mb-4">
                <User className="h-14 w-14 text-slate-400" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">{user.name}</h2>
              <div className="flex items-center justify-center md:justify-start space-x-2 bg-orange-50 py-1.5 px-4 rounded-full w-fit border border-orange-100">
                {React.createElement(getRoleIcon(), { className: `h-4 w-4 ${getRoleColor()}` })}
                <span className={`text-sm font-bold uppercase tracking-wider ${getRoleColor()}`}>
                  {user.role}
                </span>
              </div>
            </div>

            {/* Divider */}
            <div className="hidden md:block w-px h-32 bg-orange-100 mx-4"></div>

            {/* Contact Details (Horizontal Grid) */}
            <div className="flex-1 w-full grid grid-cols-1 sm:grid-cols-2 gap-6 text-slate-600">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-orange-50 rounded-xl"><Mail className="h-5 w-5 text-orange-500" /></div>
                <div className="overflow-hidden">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-0.5">Email</p>
                  <p className="font-semibold text-slate-800 truncate">{user.email}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-orange-50 rounded-xl"><Phone className="h-5 w-5 text-orange-500" /></div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-0.5">Phone</p>
                  <p className="font-semibold text-slate-800">{user.phone || 'Not provided'}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-orange-50 rounded-xl"><MapPin className="h-5 w-5 text-orange-500" /></div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-0.5">Location</p>
                  <p className="font-semibold text-slate-800">
                    {user.address?.city ? `${user.address.city}, ${user.address.state}` : 'Address incomplete'}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-orange-50 rounded-xl"><Calendar className="h-5 w-5 text-orange-500" /></div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-0.5">Joined</p>
                  <p className="font-semibold text-slate-800">{new Date(user.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* BOTTOM ROW: Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Profile Edit Form */}
          {isEditing && (
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-orange-100 mb-8">
              <h3 className="text-xl font-bold text-slate-900 mb-6 border-b border-orange-100 pb-4">
                Update Profile Information
              </h3>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-slate-600 mb-2">Full Name</label>
                    <input
                      {...register('name', { required: 'Name is required' })}
                      type="text"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:ring-2 focus:ring-orange-500 outline-none transition-all focus:bg-white"
                    />
                    {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-600 mb-2">Phone Number</label>
                    <input
                      {...register('phone', { required: 'Phone is required' })}
                      type="tel"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:ring-2 focus:ring-orange-500 outline-none transition-all focus:bg-white"
                    />
                    {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone.message}</p>}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-slate-600 mb-2">Street Address</label>
                    <input
                      {...register('street', { required: 'Street is required' })}
                      type="text"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:ring-2 focus:ring-orange-500 outline-none transition-all focus:bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-600 mb-2">City</label>
                    <input
                      {...register('city', { required: 'City is required' })}
                      type="text"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:ring-2 focus:ring-orange-500 outline-none transition-all focus:bg-white"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-slate-600 mb-2">State</label>
                    <input
                      {...register('state', { required: 'State is required' })}
                      type="text"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:ring-2 focus:ring-orange-500 outline-none transition-all focus:bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-600 mb-2">Pincode</label>
                    <input
                      {...register('pincode', { required: 'Pincode is required' })}
                      type="text"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:ring-2 focus:ring-orange-500 outline-none transition-all focus:bg-white"
                    />
                  </div>
                </div>

                <div className="pt-4 flex justify-end">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="px-8 py-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold rounded-xl shadow-lg transition-all flex items-center disabled:opacity-50"
                  >
                    {isLoading ? 'Saving...' : <><Save className="w-5 h-5 mr-2" /> Save Changes</>}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Analytics & Role Info - Hidden during editing for clean UI */}
          {!isEditing && (
            <>
              {user.role === 'student' && (
                <div className="space-y-8">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-white p-6 rounded-2xl border border-orange-100 flex items-center shadow-lg hover:shadow-xl transition-shadow cursor-default">
                      <div className="p-4 bg-blue-50 rounded-xl mr-4"><BookOpen className="w-8 h-8 text-blue-500" /></div>
                      <div>
                        <p className="text-slate-500 text-sm font-bold uppercase tracking-wider">Current Grade</p>
                        <p className="text-2xl font-black text-slate-900">{user.grade || 'Not Assigned'}</p>
                      </div>
                    </div>
                    <div className="bg-white p-6 rounded-2xl border border-orange-100 flex items-center shadow-lg hover:shadow-xl transition-shadow cursor-default">
                      <div className="p-4 bg-green-50 rounded-xl mr-4"><Award className="w-8 h-8 text-green-500" /></div>
                      <div>
                        <p className="text-slate-500 text-sm font-bold uppercase tracking-wider">Status</p>
                        <p className="text-2xl font-black text-green-500">Active</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white p-8 rounded-2xl shadow-xl border border-orange-100">
                    <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center">
                      <TrendingUp className="w-6 h-6 mr-3 text-orange-500" />
                      Performance Analytics
                    </h3>
                    <div className="h-80 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={studentPerformance} margin={{ top: 5, right: 30, left: -20, bottom: 5 }}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                          <XAxis dataKey="month" stroke="#64748b" tick={{ fill: '#64748b', fontWeight: 600 }} axisLine={false} tickLine={false} />
                          <YAxis stroke="#64748b" tick={{ fill: '#64748b', fontWeight: 600 }} axisLine={false} tickLine={false} />
                          <Tooltip content={<CustomTooltip />} />
                          <Line type="monotone" dataKey="score" name="Test Score" stroke="#f97316" strokeWidth={4} dot={{ r: 6, fill: '#f97316', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 8 }} />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              )}

              {user.role === 'tutor' && (
                <div className="space-y-8">
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="bg-white p-6 rounded-2xl border border-orange-100 shadow-lg flex flex-col justify-center items-center text-center hover:shadow-xl transition-shadow">
                      <Clock className="w-8 h-8 text-orange-500 mb-2" />
                      <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">Hours Taught</p>
                      <p className="text-2xl font-black text-slate-900">120h</p>
                    </div>
                    <div className="bg-white p-6 rounded-2xl border border-orange-100 shadow-lg flex flex-col justify-center items-center text-center hover:shadow-xl transition-shadow">
                      <User className="w-8 h-8 text-blue-500 mb-2" />
                      <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">Total Students</p>
                      <p className="text-2xl font-black text-slate-900">15</p>
                    </div>
                    <div className="bg-white p-6 rounded-2xl border border-orange-100 shadow-lg flex flex-col justify-center items-center text-center hover:shadow-xl transition-shadow">
                      <DollarSign className="w-8 h-8 text-green-500 mb-2" />
                      <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">Hourly Rate</p>
                      <p className="text-2xl font-black text-slate-900">₹{user.hourlyRate || 500}</p>
                    </div>
                  </div>

                  <div className="grid lg:grid-cols-2 gap-8">
                    <div className="bg-white p-6 rounded-2xl shadow-xl border border-orange-100">
                      <h3 className="text-lg font-bold text-slate-900 mb-6">Earnings Overview</h3>
                      <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={tutorEarnings} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                            <XAxis dataKey="week" stroke="#64748b" tick={{ fill: '#64748b', fontWeight: 600 }} axisLine={false} tickLine={false} />
                            <YAxis stroke="#64748b" tick={{ fill: '#64748b', fontWeight: 600 }} axisLine={false} tickLine={false} />
                            <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f1f5f9' }} />
                            <Bar dataKey="earnings" name="Earnings (₹)" fill="#f97316" radius={[4, 4, 0, 0]} />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-xl border border-orange-100 flex flex-col">
                      <h3 className="text-lg font-bold text-slate-900 mb-2">Student Roster</h3>
                      <div className="flex-grow flex items-center justify-center">
                        <div className="h-64 w-full">
                          <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                              <Pie
                                data={tutorStudents}
                                innerRadius={60}
                                outerRadius={80}
                                paddingAngle={5}
                                dataKey="value"
                                stroke="none"
                              >
                                {tutorStudents.map((entry, index) => (
                                  <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                                ))}
                              </Pie>
                              <Tooltip content={<CustomTooltip />} />
                            </PieChart>
                          </ResponsiveContainer>
                        </div>
                      </div>
                      <div className="flex justify-center gap-6 pb-2">
                        {tutorStudents.map((entry, index) => (
                          <div key={index} className="flex items-center">
                            <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: PIE_COLORS[index] }}></div>
                            <span className="text-sm font-bold text-slate-600">{entry.name} ({entry.value})</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
