import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Award, 
  Gift, 
  Star, 
  Leaf, 
  ShoppingCart,
  Crown,
  Zap,
  Heart
} from 'lucide-react';

const RewardsPage: React.FC = () => {
  const [selectedTier, setSelectedTier] = useState('current');
  
  const userStats = {
    currentPoints: 1250,
    totalEarned: 3420,
    currentTier: 'Gold',
    nextTier: 'Platinum',
    pointsToNext: 750
  };

  const tiers = [
    {
      name: 'Bronze',
      minPoints: 0,
      color: 'from-orange-400 to-orange-600',
      icon: Award,
      benefits: ['5% eco-discount', 'Monthly eco-tips', 'Basic analytics']
    },
    {
      name: 'Silver',
      minPoints: 500,
      color: 'from-gray-400 to-gray-600',
      icon: Star,
      benefits: ['10% eco-discount', 'Weekly eco-tips', 'Advanced analytics', 'Priority support']
    },
    {
      name: 'Gold',
      minPoints: 1000,
      color: 'from-yellow-400 to-yellow-600',
      icon: Crown,
      benefits: ['15% eco-discount', 'Daily eco-tips', 'Premium analytics', 'Early access to new features']
    },
    {
      name: 'Platinum',
      minPoints: 2000,
      color: 'from-purple-400 to-purple-600',
      icon: Zap,
      benefits: ['20% eco-discount', 'Personal eco-consultant', 'Custom analytics', 'Exclusive events']
    }
  ];

  const rewards = [
    {
      id: 1,
      title: '$5 Walmart Gift Card',
      description: 'Use on any purchase at Walmart stores or online',
      cost: 500,
      category: 'Gift Cards',
      icon: Gift,
      available: true
    },
    {
      id: 2,
      title: '$10 Walmart Gift Card',
      description: 'Use on any purchase at Walmart stores or online',
      cost: 1000,
      category: 'Gift Cards',
      icon: Gift,
      available: true
    },
    {
      id: 3,
      title: '15% Off Organic Products',
      description: 'Valid on all organic food items for one month',
      cost: 750,
      category: 'Discounts',
      icon: Leaf,
      available: true
    },
    {
      id: 4,
      title: 'Free Eco-Friendly Tote Bag',
      description: 'Sustainable shopping bag made from recycled materials',
      cost: 300,
      category: 'Physical Items',
      icon: ShoppingCart,
      available: true
    },
    {
      id: 5,
      title: '$25 Walmart Gift Card',
      description: 'Use on any purchase at Walmart stores or online',
      cost: 2500,
      category: 'Gift Cards',
      icon: Gift,
      available: false
    },
    {
      id: 6,
      title: 'Exclusive Eco-Product Bundle',
      description: 'Curated selection of premium eco-friendly products',
      cost: 1800,
      category: 'Physical Items',
      icon: Heart,
      available: false
    }
  ];

  const recentActivity = [
    { action: 'Earned 50 points', detail: 'Chose organic apples over regular', date: '2 hours ago' },
    { action: 'Redeemed reward', detail: '$5 Walmart Gift Card', date: '1 day ago' },
    { action: 'Earned 25 points', detail: 'Picked reusable water bottle', date: '2 days ago' },
    { action: 'Earned 75 points', detail: 'Completed weekly eco-challenge', date: '3 days ago' }
  ];

  const canAfford = (cost: number) => userStats.currentPoints >= cost;

  const handleRedeem = (reward: any) => {
    if (canAfford(reward.cost)) {
      // In a real app, this would make an API call
      alert(`Redeemed: ${reward.title}`);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-8"
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-2">EcoPoints Rewards</h1>
        <p className="text-gray-600">Earn points for sustainable choices and redeem amazing rewards!</p>
      </motion.div>

      {/* Points Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl p-8 text-white mb-8"
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold mb-2">{userStats.currentPoints.toLocaleString()}</div>
            <div className="text-green-100">Available Points</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold mb-2">{userStats.totalEarned.toLocaleString()}</div>
            <div className="text-green-100">Total Earned</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold mb-2 flex items-center justify-center">
              <Crown className="h-6 w-6 mr-2" />
              {userStats.currentTier}
            </div>
            <div className="text-green-100">Current Tier</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold mb-2">{userStats.pointsToNext}</div>
            <div className="text-green-100">Points to {userStats.nextTier}</div>
          </div>
        </div>

        {/* Progress to Next Tier */}
        <div className="mt-6">
          <div className="flex justify-between text-sm mb-2">
            <span>{userStats.currentTier}</span>
            <span>{userStats.nextTier}</span>
          </div>
          <div className="w-full bg-white/20 rounded-full h-3">
            <div 
              className="bg-white h-3 rounded-full transition-all duration-1000"
              style={{ width: `${(userStats.currentPoints / (userStats.currentPoints + userStats.pointsToNext)) * 100}%` }}
            />
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Rewards Catalog */}
        <div className="lg:col-span-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-2xl shadow-lg p-6"
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Available Rewards</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {rewards.map((reward, index) => {
                const Icon = reward.icon;
                const affordable = canAfford(reward.cost);
                
                return (
                  <motion.div
                    key={reward.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className={`border-2 rounded-xl p-4 transition-all ${
                      affordable && reward.available
                        ? 'border-green-200 bg-green-50 hover:shadow-md'
                        : 'border-gray-200 bg-gray-50'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        affordable && reward.available
                          ? 'bg-green-500 text-white'
                          : 'bg-gray-300 text-gray-500'
                      }`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                        affordable && reward.available
                          ? 'bg-green-200 text-green-800'
                          : 'bg-gray-200 text-gray-600'
                      }`}>
                        {reward.cost} points
                      </div>
                    </div>
                    
                    <h3 className="font-semibold text-gray-900 mb-2">{reward.title}</h3>
                    <p className="text-sm text-gray-600 mb-4">{reward.description}</p>
                    
                    <button
                      onClick={() => handleRedeem(reward)}
                      disabled={!affordable || !reward.available}
                      className={`w-full py-2 px-4 rounded-lg font-medium transition-all ${
                        affordable && reward.available
                          ? 'bg-green-600 text-white hover:bg-green-700'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      {!reward.available ? 'Coming Soon' : affordable ? 'Redeem' : 'Not Enough Points'}
                    </button>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Tier Benefits */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white rounded-2xl shadow-lg p-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Tier Benefits</h3>
            
            <div className="space-y-3">
              {tiers.map((tier) => {
                const Icon = tier.icon;
                const isCurrentTier = tier.name === userStats.currentTier;
                
                return (
                  <div
                    key={tier.name}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      isCurrentTier
                        ? 'border-green-200 bg-green-50'
                        : 'border-gray-200 bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center space-x-3 mb-2">
                      <div className={`w-8 h-8 bg-gradient-to-r ${tier.color} rounded-lg flex items-center justify-center`}>
                        <Icon className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{tier.name}</div>
                        <div className="text-xs text-gray-500">{tier.minPoints}+ points</div>
                      </div>
                      {isCurrentTier && (
                        <div className="bg-green-600 text-white px-2 py-1 rounded-full text-xs font-medium">
                          Current
                        </div>
                      )}
                    </div>
                    
                    <ul className="text-xs text-gray-600 space-y-1">
                      {tier.benefits.map((benefit, idx) => (
                        <li key={idx} className="flex items-center">
                          <div className="w-1 h-1 bg-gray-400 rounded-full mr-2" />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white rounded-2xl shadow-lg p-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
            
            <div className="space-y-3">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-gray-900">{activity.action}</div>
                    <div className="text-xs text-gray-600">{activity.detail}</div>
                    <div className="text-xs text-gray-500 mt-1">{activity.date}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default RewardsPage;
