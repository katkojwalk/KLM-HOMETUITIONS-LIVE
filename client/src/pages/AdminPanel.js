import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { 
  Users, UserPlus, UserMinus, Shield, Search, Activity, TrendingUp, Kanban, LayoutDashboard, ChevronRight, Star, MessageSquare
} from 'lucide-react';
import { 
  PieChart, Pie, Cell, LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from 'recharts';
import toast from 'react-hot-toast';

const COLORS = ['#f97316', '#3b82f6', '#8b5cf6', '#10b981'];
const PIPELINE_STAGES = ['lead', 'contacted', 'in-progress', 'converted'];
const STAGE_LABELS = {
  'lead': 'New Leads',
  'contacted': 'Contacted',
  'in-progress': 'In Progress',
  'converted': 'Converted'
};

const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [activeTab, setActiveTab] = useState('dashboard'); // 'dashboard' | 'pipeline' | 'reviews'
  const [adminReviews, setAdminReviews] = useState([]);
  const [reviewsLoading, setReviewsLoading] = useState(false);

  useEffect(() => {
    fetchUsers();
    if (activeTab === 'dashboard') {
      fetchStats();
    }
    if (activeTab === 'reviews') {
      fetchAdminReviews();
    }
  }, [currentPage, searchTerm, roleFilter, activeTab]);

  const fetchAdminReviews = async () => {
    try {
      setReviewsLoading(true);
      const res = await axios.get('/api/reviews/admin');
      setAdminReviews(res.data || []);
    } catch (error) {
      console.error('Error fetching reviews:', error);
      toast.error('Failed to fetch reviews');
    } finally {
      setReviewsLoading(false);
    }
  };

  const handleApproveReview = async (reviewId) => {
    try {
      await axios.put(`/api/reviews/${reviewId}/approve`);
      toast.success('Review status updated');
      fetchAdminReviews();
    } catch (error) {
      console.error('Error approving review:', error);
      toast.error('Failed to update review');
    }
  };

  const handleDeleteReview = async (reviewId) => {
    try {
      await axios.delete(`/api/reviews/${reviewId}`);
      toast.success('Review deleted');
      fetchAdminReviews();
    } catch (error) {
      console.error('Error deleting review:', error);
      toast.error('Failed to delete review');
    }
  };

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: activeTab === 'pipeline' ? 1 : currentPage,
        limit: activeTab === 'pipeline' ? 200 : 10, // Fetch more users for pipeline view
        ...(searchTerm && { search: searchTerm }),
        ...(roleFilter && { role: roleFilter })
      });
      const response = await axios.get(`/api/admin/users?${params}`);
      setUsers(Array.isArray(response.data?.users) ? response.data.users : []);
    } catch (error) {
      console.error('Error fetching users:', error);
      toast.error('Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await axios.get('/api/admin/dashboard');
      setStats(response.data?.statistics || {});
    } catch (error) {
      console.error('Error fetching stats:', error);
      setStats({});
    }
  };

  const handleBulkAction = async (action) => {
    if (selectedUsers.length === 0) {
      toast.error('Please select users first');
      return;
    }
    try {
      await axios.post('/api/admin/users/bulk-action', { action, userIds: selectedUsers });
      toast.success(`Users ${action}ed successfully`);
      setSelectedUsers([]);
      fetchUsers();
    } catch (error) {
      console.error('Bulk action error:', error);
      toast.error('Failed to perform bulk action');
    }
  };

  const handleUserAction = async (userId, action) => {
    try {
      if (action === 'delete') {
        await axios.delete(`/api/admin/users/${userId}`);
        toast.success('User deleted successfully');
      } else {
        await axios.put(`/api/admin/users/${userId}`, {
          isActive: action === 'activate'
        });
        toast.success(`User ${action}ed successfully`);
      }
      fetchUsers();
    } catch (error) {
      console.error('User action error:', error);
      toast.error('Failed to perform action');
    }
  };

  const updatePipelineStage = async (userId, newStage) => {
    try {
      await axios.put(`/api/admin/users/${userId}`, { pipelineStage: newStage });
      toast.success('Pipeline stage updated');
      fetchUsers(); // Refresh to move the card
    } catch (error) {
      console.error('Error updating stage:', error);
      toast.error('Failed to update pipeline stage');
    }
  };

  const toggleUserSelection = (userId) => {
    setSelectedUsers(prev => 
      prev.includes(userId) 
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  const selectAllUsers = () => {
    setSelectedUsers(users.map(user => user._id));
  };

  const clearSelection = () => {
    setSelectedUsers([]);
  };

  // Mock data for graphs
  const pieData = [
    { name: 'Tech Solutions', value: Math.floor((stats.totalUsers || 200) * 0.4) },
    { name: 'Home Tuitions', value: Math.floor((stats.totalUsers || 200) * 0.6) },
  ];

  const barData = [
    { name: 'Students', Tech: 120, Tuitions: 300 },
    { name: 'Tutors/Devs', Tech: 45, Tuitions: 80 },
    { name: 'Admins', Tech: 5, Tuitions: 2 },
  ];

  const lineData = [
    { month: 'Jan', tech: 40, tuitions: 120 },
    { month: 'Feb', tech: 60, tuitions: 150 },
    { month: 'Mar', tech: 85, tuitions: 190 },
    { month: 'Apr', tech: 110, tuitions: 220 },
    { month: 'May', tech: 140, tuitions: 260 },
    { month: 'Jun', tech: 180, tuitions: 300 },
  ];

  const getPipelineUsers = (stage) => {
    return users.filter(user => (user.pipelineStage || 'lead') === stage);
  };

  return (
    <div className="min-h-screen pt-32 pb-16 bg-orange-100 text-slate-900">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header & Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-10 flex flex-col md:flex-row md:items-center justify-between space-y-6 md:space-y-0"
        >
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-orange-500/20 rounded-full flex items-center justify-center border border-orange-500/50 shadow-md">
              <Shield className="h-8 w-8 text-orange-500" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold">
                Admin <span className="text-orange-500">Workspace</span>
              </h1>
              <p className="text-slate-600 mt-1 text-lg">
                Manage your business growth and user lifecycle
              </p>
            </div>
          </div>
          
          <div className="flex bg-white p-1 rounded-xl border border-orange-200 w-fit shadow-xl">
            <button 
              onClick={() => setActiveTab('dashboard')}
              className={`flex items-center px-6 py-2.5 rounded-lg transition-all font-semibold ${activeTab === 'dashboard' ? 'bg-orange-500 text-slate-900 shadow-md' : 'text-slate-600 hover:text-slate-900 hover:bg-orange-50/50'}`}
            >
              <LayoutDashboard className="w-5 h-5 mr-2" /> Overview
            </button>
            <button 
              onClick={() => setActiveTab('pipeline')}
              className={`flex items-center px-6 py-2.5 rounded-lg transition-all font-semibold ${activeTab === 'pipeline' ? 'bg-orange-500 text-slate-900 shadow-md' : 'text-slate-600 hover:text-slate-900 hover:bg-orange-50/50'}`}
            >
              <Kanban className="w-5 h-5 mr-2" /> CRM Pipeline
            </button>
            <button 
              onClick={() => setActiveTab('reviews')}
              className={`flex items-center px-6 py-2.5 rounded-lg transition-all font-semibold ${activeTab === 'reviews' ? 'bg-orange-500 text-slate-900 shadow-md' : 'text-slate-600 hover:text-slate-900 hover:bg-orange-50/50'}`}
            >
              <MessageSquare className="w-5 h-5 mr-2" /> Reviews
            </button>
          </div>
        </motion.div>

        {activeTab === 'dashboard' && (
          <>
            {/* Charts Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="grid lg:grid-cols-2 gap-8 mb-12"
            >
              {/* Pie Chart */}
              <div className="bg-white p-6 rounded-2xl border border-orange-200 shadow-xl">
                <h3 className="text-xl font-bold mb-4 text-slate-900 flex items-center">
                  <Activity className="mr-2 h-5 w-5 text-orange-500" /> User Distribution
                </h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={90}
                        paddingAngle={5}
                        dataKey="value"
                        label
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip contentStyle={{ backgroundColor: '#ffffff', border: 'none', borderRadius: '8px', color: '#0f172a' }} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Bar Chart */}
              <div className="bg-white p-6 rounded-2xl border border-orange-200 shadow-xl">
                <h3 className="text-xl font-bold mb-4 text-slate-900 flex items-center">
                  <Users className="mr-2 h-5 w-5 text-orange-500" /> Demographics
                </h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={barData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                      <XAxis dataKey="name" stroke="#64748b" />
                      <YAxis stroke="#64748b" />
                      <Tooltip contentStyle={{ backgroundColor: '#ffffff', border: 'none', borderRadius: '8px' }} />
                      <Legend />
                      <Bar dataKey="Tech" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="Tuitions" fill="#f97316" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Line Chart (Full Width) */}
              <div className="bg-white p-6 rounded-2xl border border-orange-200 shadow-xl lg:col-span-2">
                <h3 className="text-xl font-bold mb-4 text-slate-900 flex items-center">
                  <TrendingUp className="mr-2 h-5 w-5 text-orange-500" /> Platform Growth
                </h3>
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={lineData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                      <XAxis dataKey="month" stroke="#64748b" />
                      <YAxis stroke="#64748b" />
                      <Tooltip contentStyle={{ backgroundColor: '#ffffff', border: 'none', borderRadius: '8px' }} />
                      <Legend />
                      <Line type="monotone" dataKey="tech" stroke="#3b82f6" strokeWidth={3} activeDot={{ r: 8 }} />
                      <Line type="monotone" dataKey="tuitions" stroke="#f97316" strokeWidth={3} activeDot={{ r: 8 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </motion.div>

            {/* Controls */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white p-6 rounded-2xl border border-orange-200 shadow-xl mb-8"
            >
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-600" />
                    <input
                      type="text"
                      placeholder="Search users..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full sm:w-64 pl-10 pr-4 py-2.5 bg-orange-100 border border-orange-200 rounded-xl text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
                    />
                  </div>
                  <select
                    value={roleFilter}
                    onChange={(e) => setRoleFilter(e.target.value)}
                    className="w-full sm:w-48 px-4 py-2.5 bg-orange-100 border border-orange-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
                  >
                    <option value="">All Roles</option>
                    <option value="student">Students</option>
                    <option value="tutor">Tutors</option>
                    <option value="admin">Admins</option>
                  </select>
                </div>

                <div className="flex space-x-2">
                  {selectedUsers.length > 0 && (
                    <>
                      <button
                        onClick={() => handleBulkAction('activate')}
                        className="flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-slate-900 rounded-lg transition-colors font-medium"
                      >
                        <UserPlus className="h-4 w-4 mr-2" />
                        Activate ({selectedUsers.length})
                      </button>
                      <button
                        onClick={() => handleBulkAction('deactivate')}
                        className="flex items-center px-4 py-2 bg-red-600 hover:bg-red-700 text-slate-900 rounded-lg transition-colors font-medium"
                      >
                        <UserMinus className="h-4 w-4 mr-2" />
                        Deactivate ({selectedUsers.length})
                      </button>
                      <button
                        onClick={clearSelection}
                        className="flex items-center px-4 py-2 bg-orange-50 hover:bg-slate-600 text-slate-900 rounded-lg transition-colors font-medium"
                      >
                        Clear
                      </button>
                    </>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Users Table */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white rounded-2xl border border-orange-200 shadow-xl overflow-hidden"
            >
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-orange-100/50 text-slate-600 uppercase text-xs">
                    <tr>
                      <th className="px-6 py-4 font-semibold">
                        <input
                          type="checkbox"
                          onChange={selectAllUsers}
                          checked={selectedUsers.length === users.length && users.length > 0}
                          className="rounded border-orange-200 bg-white text-orange-500 focus:ring-orange-500 focus:ring-offset-slate-900"
                        />
                      </th>
                      <th className="px-6 py-4 font-semibold">User</th>
                      <th className="px-6 py-4 font-semibold">Role</th>
                      <th className="px-6 py-4 font-semibold">Service</th>
                      <th className="px-6 py-4 font-semibold">Status</th>
                      <th className="px-6 py-4 font-semibold">Joined</th>
                      <th className="px-6 py-4 font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-orange-200">
                    {loading ? (
                      <tr>
                        <td colSpan="7" className="px-6 py-8 text-center text-slate-600">
                          <div className="spinner mx-auto mb-2 border-orange-500"></div>
                          Loading users...
                        </td>
                      </tr>
                    ) : users.length === 0 ? (
                      <tr>
                        <td colSpan="7" className="px-6 py-8 text-center text-slate-600">
                          No users found
                        </td>
                      </tr>
                    ) : (
                      users.map((user) => (
                        <tr key={user._id} className="hover:bg-orange-50/30 transition-colors">
                          <td className="px-6 py-4">
                            <input
                              type="checkbox"
                              checked={selectedUsers.includes(user._id)}
                              onChange={() => toggleUserSelection(user._id)}
                              className="rounded border-orange-200 bg-white text-orange-500 focus:ring-orange-500 focus:ring-offset-slate-900"
                            />
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 flex items-center justify-center shadow-lg shrink-0">
                                <span className="text-slate-900 font-bold">
                                  {user.name.charAt(0).toUpperCase()}
                                </span>
                              </div>
                              <div>
                                <div className="font-semibold text-slate-900">{user.name}</div>
                                <div className="text-slate-600 text-xs">{user.email}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`inline-flex px-2.5 py-1 text-xs font-bold rounded-full ${
                              user.role === 'admin' ? 'bg-red-500/20 text-red-400 border border-red-500/30' :
                              user.role === 'tutor' ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30' :
                              'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                            }`}>
                              {user.role.toUpperCase()}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`inline-flex px-2.5 py-1 text-xs font-bold rounded-full ${
                              user.serviceType === 'tech' ? 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30' :
                              'bg-teal-500/20 text-teal-400 border border-teal-500/30'
                            }`}>
                              {user.serviceType ? user.serviceType.toUpperCase() : 'TUITION'}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`inline-flex px-2.5 py-1 text-xs font-bold rounded-full ${
                              user.isActive ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-red-500/20 text-red-400 border border-red-500/30'
                            }`}>
                              {user.isActive ? 'ACTIVE' : 'INACTIVE'}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-slate-600">
                            {new Date(user.createdAt).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex space-x-3">
                              <button
                                onClick={() => handleUserAction(user._id, user.isActive ? 'deactivate' : 'activate')}
                                className={`font-semibold hover:underline ${
                                  user.isActive 
                                    ? 'text-red-400 hover:text-red-300' 
                                    : 'text-green-400 hover:text-green-300'
                                }`}
                              >
                                {user.isActive ? 'Deactivate' : 'Activate'}
                              </button>
                              <button
                                onClick={() => handleUserAction(user._id, 'delete')}
                                className="font-semibold text-slate-600 hover:text-red-400 hover:underline"
                              >
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </motion.div>
          </>
        )}

        {/* CRM PIPELINE VIEW */}
        {activeTab === 'pipeline' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6 overflow-x-auto pb-8"
          >
            {PIPELINE_STAGES.map((stage, stageIndex) => {
              const stageUsers = getPipelineUsers(stage);
              return (
                <div key={stage} className="flex-1 min-w-[300px] bg-white/50 rounded-2xl border border-orange-200/50 flex flex-col h-[700px]">
                  {/* Column Header */}
                  <div className="p-4 border-b border-orange-200/50 bg-white/80 rounded-t-2xl flex items-center justify-between">
                    <h3 className="font-bold text-lg text-slate-900">{STAGE_LABELS[stage]}</h3>
                    <span className="bg-orange-50 text-slate-700 text-xs font-bold px-2 py-1 rounded-full">
                      {stageUsers.length}
                    </span>
                  </div>
                  
                  {/* Column Body / Cards */}
                  <div className="p-4 flex-1 overflow-y-auto space-y-4 custom-scrollbar">
                    {loading ? (
                      <div className="text-slate-600 text-center py-8">Loading...</div>
                    ) : stageUsers.length === 0 ? (
                      <div className="text-slate-600 text-center py-8 text-sm italic border-2 border-dashed border-orange-200 rounded-xl">Empty</div>
                    ) : (
                      stageUsers.map(user => (
                        <div 
                          key={user._id} 
                          className="bg-orange-50/40 hover:bg-orange-50/60 transition-colors p-4 rounded-xl border border-orange-200 shadow-sm relative group"
                        >
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-bold text-slate-900 text-md leading-tight">{user.name}</h4>
                            <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-sm ${
                              user.serviceType === 'tech' ? 'bg-indigo-500/20 text-indigo-300' : 'bg-teal-500/20 text-teal-300'
                            }`}>
                              {user.serviceType || 'tuition'}
                            </span>
                          </div>
                          <div className="text-slate-600 text-xs mb-4 truncate">{user.email}</div>
                          
                          {/* Next Stage Button */}
                          {stageIndex < PIPELINE_STAGES.length - 1 && (
                            <button
                              onClick={() => updatePipelineStage(user._id, PIPELINE_STAGES[stageIndex + 1])}
                              className="w-full py-2 bg-white hover:bg-orange-500 hover:text-slate-900 text-slate-700 rounded-lg text-xs font-bold transition-all flex items-center justify-center group-hover:border-orange-500 border border-transparent"
                            >
                              Move to {STAGE_LABELS[PIPELINE_STAGES[stageIndex + 1]]} <ChevronRight className="w-3 h-3 ml-1" />
                            </button>
                          )}
                          {stageIndex === PIPELINE_STAGES.length - 1 && (
                            <div className="w-full py-2 bg-green-500/10 text-green-400 rounded-lg text-xs font-bold flex items-center justify-center border border-green-500/20">
                              Successfully Closed
                            </div>
                          )}
                        </div>
                      ))
                    )}
                  </div>
                </div>
              );
            })}
          </motion.div>
        )}

        {/* REVIEWS MODERATION VIEW */}
        {activeTab === 'reviews' && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-white p-6 rounded-2xl border border-orange-200 shadow-xl">
              <h3 className="text-xl font-bold mb-6 text-slate-900 flex items-center">
                <MessageSquare className="mr-2 h-5 w-5 text-orange-500" /> Review Moderation
              </h3>

              {reviewsLoading ? (
                <div className="text-center py-8 text-slate-600">
                  <div className="spinner mx-auto mb-2 border-orange-500"></div>
                  Loading reviews...
                </div>
              ) : adminReviews.length === 0 ? (
                <div className="text-center py-8 text-slate-500">No reviews yet.</div>
              ) : (
                <div className="space-y-4">
                  {adminReviews.map((review) => (
                    <div
                      key={review._id}
                      className={`p-5 rounded-xl border transition-all ${
                        review.isApproved
                          ? 'bg-green-50/50 border-green-200'
                          : 'bg-orange-50/50 border-orange-200'
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 flex items-center justify-center shadow-lg shrink-0">
                              <span className="text-white font-bold text-sm">
                                {review.name?.charAt(0)?.toUpperCase() || 'U'}
                              </span>
                            </div>
                            <div>
                              <h4 className="font-bold text-slate-900">{review.name}</h4>
                              <p className="text-slate-500 text-xs">
                                {review.user?.email || 'N/A'} • {new Date(review.createdAt).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-1 mb-2">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < review.rating ? 'text-orange-500 fill-orange-500' : 'text-slate-300'
                                }`}
                              />
                            ))}
                          </div>
                          <p className="text-slate-700 text-sm">{review.comment}</p>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                            review.isApproved
                              ? 'bg-green-500/20 text-green-700 border border-green-500/30'
                              : 'bg-yellow-500/20 text-yellow-700 border border-yellow-500/30'
                          }`}>
                            {review.isApproved ? 'APPROVED' : 'PENDING'}
                          </span>
                          <button
                            onClick={() => handleApproveReview(review._id)}
                            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                              review.isApproved
                                ? 'bg-yellow-100 hover:bg-yellow-200 text-yellow-700'
                                : 'bg-green-100 hover:bg-green-200 text-green-700'
                            }`}
                          >
                            {review.isApproved ? 'Unapprove' : 'Approve'}
                          </button>
                          <button
                            onClick={() => handleDeleteReview(review._id)}
                            className="px-4 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg text-sm font-semibold transition-colors"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
