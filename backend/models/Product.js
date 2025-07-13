const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    trim: true
  },
  carbonFootprint: {
    type: Number,
    required: true,
    min: 0
  },
  packagingWaste: {
    type: Number,
    required: true,
    min: 0
  },
  isSustainable: {
    type: Boolean,
    required: true,
    default: false
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  description: {
    type: String,
    trim: true
  },
  image: {
    type: String,
    default: '/images/default-product.png'
  },
  sustainableAlternative: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    default: null
  }
}, {
  timestamps: true
});

// Calculate EcoScore
productSchema.virtual('ecoScore').get(function() {
  // Lower carbon footprint and packaging waste = higher score
  // Scale: 0-100, where 100 is the most eco-friendly
  const maxCarbonFootprint = 100; // Assume max value for normalization
  const maxPackagingWaste = 500; // Assume max value for normalization
  
  const carbonScore = Math.max(0, 100 - (this.carbonFootprint / maxCarbonFootprint) * 100);
  const packagingScore = Math.max(0, 100 - (this.packagingWaste / maxPackagingWaste) * 100);
  
  // Weighted average: 60% carbon footprint, 40% packaging waste
  const score = (carbonScore * 0.6 + packagingScore * 0.4);
  return Math.round(score);
});

// Ensure virtual fields are serialized
productSchema.set('toJSON', { virtuals: true });
productSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Product', productSchema);
