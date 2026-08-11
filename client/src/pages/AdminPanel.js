import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { 
  Users, 
  UserPlus, 
  UserMinus, 
  Shield, 
  Search, 
  Filter,
  Edit,
  Trash2,
  Eye,
  MoreHorizontal,
  Download,
  BarChart3,
  TrendingUp,
  Activity
} from 'lucide-react';
import toast from 'react-hot-toast';

const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUsers, setSelectedUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
    fetchStats();
  }, [currentPage, searchTerm, roleFilter]);

  const fetchUsers = async () => {
    try {
      const params = new URLSearchParams({
        page: currentPage,
        limit: 10,
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
      await axios.post('/api/admin/users/bulk-action', {
        action,
        userIds: selectedUsers
      });
      
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
          isActive: action === 'activate' ? true : false
        });
        toast.success(`User ${action}ed successfully`);
      }
      fetchUsers();
    } catch (error) {
      console.error('User action error:', error);
      toast.error('Failed to perform action');
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

  const statsCards = [
    {
      title: 'Total Users',
      value: stats.totalUsers || 0,
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      title: 'Students',
      value: stats.totalStudents || 0,
      icon: Users,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      title: 'Tutors',
      value: stats.totalTutors || 0,
      icon: Users,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    },
    {
      title: 'Active Users',
      value: stats.activeUsers || 0,
      icon: Activity,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100'
    }
  ];

  return (
    <div className="pt-32 pb-16">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex items-center space-x-3 mb-4">
            <Shield className="h-8 w-8 text-red-600" />
            <h1 className="text-3xl md:text-4xl font-bold gradient-text">
              Admin Panel
            </h1>
          </div>
          <p className="text-gray-600">
            Manage users, view statistics, and monitor system activity
          </p>
        </motion.div>

        {/* Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {statsCards.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="card p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                    <p className="text-3xl font-bold text-gray-800">{stat.value}</p>
                  </div>
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${stat.bgColor}`}>
                    <Icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
              </div>
            );
          })}
        </motion.div>

        {/* Controls */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="card p-6 mb-8"
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="input-field pl-10"
                />
              </div>
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="input-field"
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
                    className="btn-primary text-sm"
                  >
                    <UserPlus className="h-4 w-4 mr-1" />
                    Activate ({selectedUsers.length})
                  </button>
                  <button
                    onClick={() => handleBulkAction('deactivate')}
                    className="btn-outline text-sm"
                  >
                    <UserMinus className="h-4 w-4 mr-1" />
                    Deactivate ({selectedUsers.length})
                  </button>
                  <button
                    onClick={clearSelection}
                    className="btn-outline text-sm"
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
          className="card overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left">
                    <input
                      type="checkbox"
                      onChange={selectAllUsers}
                      checked={selectedUsers.length === users.length && users.length > 0}
                      className="rounded border-gray-300"
                    />
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Joined
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {loading ? (
                  <tr>
                    <td colSpan="6" className="px-6 py-4 text-center">
                      <div className="spinner mx-auto"></div>
                    </td>
                  </tr>
                ) : users.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                      No users found
                    </td>
                  </tr>
                ) : (
                  users.map((user) => (
                    <tr key={user._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <input
                          type="checkbox"
                          checked={selectedUsers.includes(user._id)}
                          onChange={() => toggleUserSelection(user._id)}
                          className="rounded border-gray-300"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-purple-600 rounded-full flex items-center justify-center">
                            <span className="text-white font-medium">
                              {user.name.charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {user.name}
                            </div>
                            <div className="text-sm text-gray-500">
                              {user.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          user.role === 'admin' ? 'bg-red-100 text-red-800' :
                          user.role === 'tutor' ? 'bg-purple-100 text-purple-800' :
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          user.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {user.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {new Date(user.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleUserAction(user._id, user.isActive ? 'deactivate' : 'activate')}
                            className={`text-xs px-2 py-1 rounded ${
                              user.isActive 
                                ? 'text-red-600 hover:text-red-800' 
                                : 'text-green-600 hover:text-green-800'
                            }`}
                          >
                            {user.isActive ? 'Deactivate' : 'Activate'}
                          </button>
                          <button
                            onClick={() => handleUserAction(user._id, 'delete')}
                            className="text-xs px-2 py-1 rounded text-red-600 hover:text-red-800"
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
      </div>
    </div>
  );
};

export default AdminPanel; 