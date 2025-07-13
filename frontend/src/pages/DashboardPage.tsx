import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  TrendingDown, 
  Leaf, 
  Award, 
  ShoppingCart,
  Target,
  BarChart3
} from 'lucide-react';

const DashboardPage: React.FC = () => {
  const [timeframe, setTimeframe] = useState<'week' | 'month' | 'year'>('month');
  
  // Mock data - in a real app, this would come from your API
  const mockData = {
    totalEcoPoints: 1250,
    carbonSaved: 12.5,
    sustainableChoices: 89,
    currentStreak: 7,
    weeklyProgress: [65, 78, 82, 76, 85, 92, 88],
    categories: [
      { name: 'Beverages', ecoScore: 85, count: 15 },
      { name: 'Snacks', ecoScore: 72, count: 12 },
      { name: 'Dairy', ecoScore: 68, count: 8 },
      { name: 'Produce', ecoScore: 95, count: 20 },
      { name: 'Cleaning', ecoScore: 78, count: 6 }
    ],
    achievements: [
      { title: 'Eco Warrior', description: 'Made 50+ sustainable choices', earned: true },
      { title: 'Carbon Saver', description: 'Reduced carbon footprint by 10kg', earned: true },
      { title: 'Green Streak', description: '7 days of eco-friendly shopping', earned: true },
      { title: 'Plastic Reducer', description: 'Avoided 100g+ of packaging waste', earned: false }
    ]
  };

  const stats = [
    {
      title: 'Total EcoPoints',
      value: mockData.totalEcoPoints.toLocaleString(),
      change: '+127',
      changeType: 'increase' as const,
      icon: Award,
      color: 'from-yellow-500 to-orange-500'
    },
    {
      title: 'Carbon Saved',
      value: `${mockData.carbonSaved}kg`,
      change: '+2.3kg',
      changeType: 'increase' as const,
      icon: Leaf,
      color: 'from-green-500 to-emerald-500'
    },
    {
      title: 'Sustainable Choices',
      value: mockData.sustainableChoices.toString(),
      change: '+12',
      changeType: 'increase' as const,
      icon: ShoppingCart,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'Current Streak',
      value: `${mockData.currentStreak} days`,
      change: '+1',
      changeType: 'increase' as const,
      icon: Target,
      color: 'from-purple-500 to-pink-500'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Eco Dashboard</h1>
        <p className="text-gray-600">Track your sustainable shopping progress and environmental impact.</p>
        
        {/* Timeframe Selector */}
        <div className="mt-6 flex space-x-1 bg-gray-100 rounded-lg p-1 w-fit">
          {['week', 'month', 'year'].map((period) => (
            <button
              key={period}
              onClick={() => setTimeframe(period as any)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                timeframe === period
                  ? 'bg-white text-green-600 shadow-sm'
                  : 'text-gray-600 hover:text-green-600'
              }`}
            >
              {period.charAt(0).toUpperCase() + period.slice(1)}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-lg"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-lg flex items-center justify-center`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <div className={`flex items-center space-x-1 text-sm ${
                  stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.changeType === 'increase' ? (
                    <TrendingUp className="h-4 w-4" />
                  ) : (
                    <TrendingDown className="h-4 w-4" />
                  )}
                  <span>{stat.change}</span>
                </div>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                <div className="text-gray-600 text-sm">{stat.title}</div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Weekly Progress Chart */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-white rounded-2xl p-6 shadow-lg"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Weekly EcoScore Progress</h3>
            <BarChart3 className="h-5 w-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {mockData.weeklyProgress.map((score, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className="w-12 text-sm text-gray-600">
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][index]}
                </div>
                <div className="flex-1 bg-gray-200 rounded-full h-3">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${score}%` }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                    className="bg-gradient-to-r from-green-500 to-blue-500 h-3 rounded-full"
                  />
                </div>
                <div className="w-12 text-sm font-medium text-gray-900">{score}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Category Performance */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="bg-white rounded-2xl p-6 shadow-lg"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Category Performance</h3>
          <div className="space-y-4">
            {mockData.categories.map((category, index) => (
              <div key={category.name} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-gradient-to-r from-green-500 to-blue-500 rounded-full" />
                  <span className="font-medium text-gray-900">{category.name}</span>
                  <span className="text-sm text-gray-500">({category.count} items)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-20 bg-gray-200 rounded-full h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${category.ecoScore}%` }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                      className={`h-2 rounded-full ${
                        category.ecoScore >= 80 ? 'bg-green-500' :
                        category.ecoScore >= 60 ? 'bg-yellow-500' :
                        'bg-orange-500'
                      }`}
                    />
                  </div>
                  <span className="text-sm font-medium text-gray-900 w-8">{category.ecoScore}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Achievements */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="bg-white rounded-2xl p-6 shadow-lg"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Achievements</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {mockData.achievements.map((achievement) => (
            <div
              key={achievement.title}
              className={`p-4 rounded-xl border-2 transition-all ${
                achievement.earned
                  ? 'border-green-200 bg-green-50'
                  : 'border-gray-200 bg-gray-50'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  achievement.earned ? 'bg-green-500' : 'bg-gray-300'
                }`}>
                  <Award className={`h-4 w-4 ${achievement.earned ? 'text-white' : 'text-gray-500'}`} />
                </div>
                {achievement.earned && (
                  <div className="text-green-600 text-sm font-medium">Earned!</div>
                )}
              </div>
              <h4 className={`font-medium mb-1 ${
                achievement.earned ? 'text-green-800' : 'text-gray-600'
              }`}>
                {achievement.title}
              </h4>
              <p className={`text-sm ${
                achievement.earned ? 'text-green-600' : 'text-gray-500'
              }`}>
                {achievement.description}
              </p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default DashboardPage;
