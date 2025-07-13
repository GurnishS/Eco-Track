import React from 'react';
import type { CartAnalysis } from '../types/api';

interface EcoScoreChartProps {
  cartAnalysis: CartAnalysis | null;
}

const EcoScoreChart: React.FC<EcoScoreChartProps> = ({ cartAnalysis }) => {
  if (!cartAnalysis) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4">Cart Analytics</h3>
        <p className="text-gray-500">Add items to cart to see analytics</p>
      </div>
    );
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBg = (score: number) => {
    if (score >= 80) return 'bg-green-100';
    if (score >= 60) return 'bg-yellow-100';
    return 'bg-red-100';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    if (score >= 40) return 'Fair';
    return 'Poor';
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold mb-6">Cart Analytics</h3>
      
      {/* EcoScore Gauge */}
      <div className="mb-6">
        <div className="text-center">
          <h4 className="text-md font-medium text-gray-700 mb-4">Cart Green Score</h4>
          <div className="relative w-32 h-32 mx-auto">
            {/* Circular progress */}
            <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-gray-200"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className={
                  cartAnalysis.cartGreenScore >= 80 ? 'text-green-500' :
                  cartAnalysis.cartGreenScore >= 60 ? 'text-yellow-500' : 'text-red-500'
                }
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                fill="none"
                strokeDasharray={`${cartAnalysis.cartGreenScore}, 100`}
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className={`text-2xl font-bold ${getScoreColor(cartAnalysis.cartGreenScore)}`}>
                  {cartAnalysis.cartGreenScore.toFixed(0)}
                </div>
                <div className={`text-xs font-medium ${getScoreColor(cartAnalysis.cartGreenScore)}`}>
                  {getScoreLabel(cartAnalysis.cartGreenScore)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className={`p-4 rounded-lg ${getScoreBg(cartAnalysis.cartGreenScore)}`}>
          <h4 className="text-sm font-medium text-gray-600">Cart Green Score</h4>
          <p className={`text-2xl font-bold ${getScoreColor(cartAnalysis.cartGreenScore)}`}>
            {cartAnalysis.cartGreenScore.toFixed(1)}
          </p>
        </div>
        
        <div className="p-4 rounded-lg bg-blue-100">
          <h4 className="text-sm font-medium text-gray-600">Total Items</h4>
          <p className="text-2xl font-bold text-blue-600">
            {cartAnalysis.totalItems}
          </p>
        </div>
        
        <div className="p-4 rounded-lg bg-red-100">
          <h4 className="text-sm font-medium text-gray-600">Carbon Footprint</h4>
          <p className="text-2xl font-bold text-red-600">
            {cartAnalysis.totalCarbonFootprint.toFixed(1)}
          </p>
          <p className="text-xs text-gray-500">kg CO₂</p>
        </div>
        
        <div className="p-4 rounded-lg bg-orange-100">
          <h4 className="text-sm font-medium text-gray-600">Packaging Waste</h4>
          <p className="text-2xl font-bold text-orange-600">
            {cartAnalysis.totalPackagingWaste.toFixed(1)}
          </p>
          <p className="text-xs text-gray-500">grams</p>
        </div>
      </div>

      {/* Environmental Impact Bars */}
      <div className="mb-6">
        <h4 className="text-md font-semibold mb-3">Environmental Impact</h4>
        <div className="space-y-3">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Carbon Footprint</span>
              <span>{cartAnalysis.totalCarbonFootprint.toFixed(1)} kg CO₂</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-red-500 h-2 rounded-full"
                style={{ width: `${Math.min(cartAnalysis.totalCarbonFootprint * 2, 100)}%` }}
              ></div>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Packaging Waste</span>
              <span>{cartAnalysis.totalPackagingWaste.toFixed(1)} g</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-orange-500 h-2 rounded-full"
                style={{ width: `${Math.min(cartAnalysis.totalPackagingWaste / 5, 100)}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Average EcoScore Progress */}
      <div className="mb-6">
        <h4 className="text-md font-semibold mb-3">Average EcoScore</h4>
        <div className="flex justify-between text-sm mb-1">
          <span>Overall Rating</span>
          <span className={getScoreColor(cartAnalysis.averageEcoScore)}>
            {cartAnalysis.averageEcoScore.toFixed(1)}/100
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div 
            className={`h-3 rounded-full ${
              cartAnalysis.averageEcoScore >= 80 ? 'bg-green-500' :
              cartAnalysis.averageEcoScore >= 60 ? 'bg-yellow-500' : 'bg-red-500'
            }`}
            style={{ width: `${cartAnalysis.averageEcoScore}%` }}
          ></div>
        </div>
      </div>

      {/* EcoTips */}
      <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
        <h4 className="text-md font-semibold text-blue-800 mb-2">💡 EcoTip</h4>
        <p className="text-sm text-blue-700">
          {cartAnalysis.averageEcoScore >= 80 
            ? "Excellent! Your cart is very eco-friendly. Keep up the sustainable shopping!"
            : cartAnalysis.averageEcoScore >= 60
            ? "Good progress! Consider swapping some items for more sustainable alternatives."
            : "There's room for improvement. Check out the suggested sustainable alternatives to boost your EcoScore!"
          }
        </p>
      </div>
    </div>
  );
};

export default EcoScoreChart;
