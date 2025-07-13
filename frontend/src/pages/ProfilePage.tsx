import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Edit3, 
  Save,
  Bell,
  Shield,
  Leaf,
  Award,
  Calendar,
  Target
} from 'lucide-react';

const ProfilePage: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: 'Alex Johnson',
    email: 'alex.johnson@example.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    joinDate: 'January 2024',
    bio: 'Passionate about sustainable living and making eco-friendly choices in everyday life.'
  });

  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    pushNotifications: true,
    weeklyReports: true,
    ecoTips: true,
    productUpdates: false
  });

  const stats = [
    {
      icon: Award,
      label: 'Total EcoPoints',
      value: '3,420',
      color: 'from-yellow-500 to-orange-500'
    },
    {
      icon: Leaf,
      label: 'Carbon Saved',
      value: '45.2 kg',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: Target,
      label: 'Eco Choices',
      value: '156',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Calendar,
      label: 'Days Active',
      value: '89',
      color: 'from-purple-500 to-pink-500'
    }
  ];

  const achievements = [
    { name: 'Eco Warrior', date: 'March 2024', icon: '🏆' },
    { name: 'Carbon Saver', date: 'February 2024', icon: '🌱' },
    { name: 'Green Streak', date: 'January 2024', icon: '🔥' },
    { name: 'Sustainable Shopper', date: 'January 2024', icon: '🛍️' }
  ];

  const handleSave = () => {
    setIsEditing(false);
    // In a real app, this would save to the API
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Profile</h1>
        <p className="text-gray-600">Manage your account and track your eco-journey.</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Profile Section */}
        <div className="lg:col-span-2 space-y-6">
          {/* Profile Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-white rounded-2xl shadow-lg p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Personal Information</h2>
              <button
                onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                {isEditing ? <Save className="h-4 w-4" /> : <Edit3 className="h-4 w-4" />}
                <span>{isEditing ? 'Save' : 'Edit'}</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                ) : (
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <User className="h-5 w-5 text-gray-400" />
                    <span>{profile.name}</span>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                {isEditing ? (
                  <input
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                ) : (
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <Mail className="h-5 w-5 text-gray-400" />
                    <span>{profile.email}</span>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                {isEditing ? (
                  <input
                    type="tel"
                    value={profile.phone}
                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                ) : (
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <Phone className="h-5 w-5 text-gray-400" />
                    <span>{profile.phone}</span>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={profile.location}
                    onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                ) : (
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <MapPin className="h-5 w-5 text-gray-400" />
                    <span>{profile.location}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
              {isEditing ? (
                <textarea
                  value={profile.bio}
                  onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              ) : (
                <div className="p-3 bg-gray-50 rounded-lg">
                  <span>{profile.bio}</span>
                </div>
              )}
            </div>
          </motion.div>

          {/* Notification Preferences */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-2xl shadow-lg p-6"
          >
            <div className="flex items-center space-x-3 mb-6">
              <Bell className="h-6 w-6 text-gray-600" />
              <h2 className="text-xl font-semibold text-gray-900">Notification Preferences</h2>
            </div>

            <div className="space-y-4">
              {Object.entries(preferences).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <div className="font-medium text-gray-900">
                      {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                    </div>
                    <div className="text-sm text-gray-600">
                      {key === 'emailNotifications' && 'Receive updates via email'}
                      {key === 'pushNotifications' && 'Get mobile push notifications'}
                      {key === 'weeklyReports' && 'Weekly sustainability reports'}
                      {key === 'ecoTips' && 'Daily eco-friendly tips'}
                      {key === 'productUpdates' && 'New product announcements'}
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={value}
                      onChange={(e) => setPreferences({ ...preferences, [key]: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                  </label>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Profile Avatar & Stats */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white rounded-2xl shadow-lg p-6 text-center"
          >
            <div className="w-24 h-24 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="h-12 w-12 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">{profile.name}</h3>
            <p className="text-gray-600 text-sm mb-2">{profile.location}</p>
            <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
              <Calendar className="h-4 w-4" />
              <span>Joined {profile.joinDate}</span>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white rounded-2xl shadow-lg p-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Impact</h3>
            <div className="space-y-4">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={stat.label} className="flex items-center space-x-3">
                    <div className={`w-10 h-10 bg-gradient-to-r ${stat.color} rounded-lg flex items-center justify-center`}>
                      <Icon className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">{stat.value}</div>
                      <div className="text-sm text-gray-600">{stat.label}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Recent Achievements */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="bg-white rounded-2xl shadow-lg p-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Achievements</h3>
            <div className="space-y-3">
              {achievements.map((achievement, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className="text-2xl">{achievement.icon}</div>
                  <div>
                    <div className="font-medium text-gray-900">{achievement.name}</div>
                    <div className="text-sm text-gray-600">{achievement.date}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Security */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="bg-white rounded-2xl shadow-lg p-6"
          >
            <div className="flex items-center space-x-3 mb-4">
              <Shield className="h-6 w-6 text-gray-600" />
              <h3 className="text-lg font-semibold text-gray-900">Security</h3>
            </div>
            <div className="space-y-3">
              <button className="w-full text-left p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="font-medium text-gray-900">Change Password</div>
                <div className="text-sm text-gray-600">Update your account password</div>
              </button>
              <button className="w-full text-left p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="font-medium text-gray-900">Two-Factor Authentication</div>
                <div className="text-sm text-gray-600">Add an extra layer of security</div>
              </button>
              <button className="w-full text-left p-3 bg-red-50 rounded-lg hover:bg-red-100 transition-colors text-red-600">
                <div className="font-medium">Delete Account</div>
                <div className="text-sm">Permanently remove your account</div>
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
