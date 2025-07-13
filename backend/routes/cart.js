const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// POST /api/cart/analysis - Analyze cart and get suggestions
router.post('/analysis', async (req, res) => {
  try {
    const { productIds } = req.body;
    
    if (!productIds || !Array.isArray(productIds)) {
      return res.status(400).json({
        success: false,
        message: 'Product IDs array is required'
      });
    }

    // Fetch all products in cart
    const cartProducts = await Product.find({ 
      _id: { $in: productIds } 
    }).populate('sustainableAlternative');

    let totalEcoScore = 0;
    let totalItems = cartProducts.length;
    let suggestions = [];
    let ecoPoints = 0;

    // Analyze each product and find suggestions
    for (const product of cartProducts) {
      totalEcoScore += product.ecoScore;
      
      // If product is not sustainable, find better alternatives
      if (!product.isSustainable) {
        const alternatives = await findSustainableAlternatives(product);
        if (alternatives.length > 0) {
          suggestions.push({
            originalProduct: product,
            alternatives: alternatives,
            potentialEcoPoints: calculateEcoPoints(product, alternatives[0])
          });
        }
      }
    }

    // Calculate Cart GreenScore (average of all EcoScores)
    const cartGreenScore = totalItems > 0 ? Math.round(totalEcoScore / totalItems) : 0;

    res.json({
      success: true,
      data: {
        cartAnalysis: {
          totalItems,
          cartGreenScore,
          averageEcoScore: cartGreenScore,
          totalCarbonFootprint: cartProducts.reduce((sum, p) => sum + p.carbonFootprint, 0),
          totalPackagingWaste: cartProducts.reduce((sum, p) => sum + p.packagingWaste, 0)
        },
        products: cartProducts.map(product => ({
          ...product.toObject(),
          ecoScore: product.ecoScore
        })),
        suggestions,
        ecoPoints
      }
    });

  } catch (error) {
    console.error('Error analyzing cart:', error);
    res.status(500).json({
      success: false,
      message: 'Error analyzing cart',
      error: error.message
    });
  }
});

// POST /api/cart/swap - Swap product with sustainable alternative
router.post('/swap', async (req, res) => {
  try {
    const { originalProductId, alternativeProductId } = req.body;
    
    if (!originalProductId || !alternativeProductId) {
      return res.status(400).json({
        success: false,
        message: 'Both original and alternative product IDs are required'
      });
    }

    const [originalProduct, alternativeProduct] = await Promise.all([
      Product.findById(originalProductId),
      Product.findById(alternativeProductId)
    ]);

    if (!originalProduct || !alternativeProduct) {
      return res.status(404).json({
        success: false,
        message: 'Product(s) not found'
      });
    }

    const ecoPointsEarned = calculateEcoPoints(originalProduct, alternativeProduct);

    res.json({
      success: true,
      data: {
        swapped: true,
        ecoPointsEarned,
        originalProduct,
        newProduct: alternativeProduct,
        ecoScoreImprovement: alternativeProduct.ecoScore - originalProduct.ecoScore
      }
    });

  } catch (error) {
    console.error('Error swapping products:', error);
    res.status(500).json({
      success: false,
      message: 'Error swapping products',
      error: error.message
    });
  }
});

// Helper function to find sustainable alternatives
async function findSustainableAlternatives(product) {
  try {
    // Find sustainable products in the same category with better EcoScore
    const alternatives = await Product.find({
      category: product.category,
      isSustainable: true,
      _id: { $ne: product._id } // Exclude the current product
    }).limit(3);

    // Filter alternatives with better EcoScore and sort by score
    return alternatives
      .filter(alt => alt.ecoScore > product.ecoScore)
      .sort((a, b) => b.ecoScore - a.ecoScore);
      
  } catch (error) {
    console.error('Error finding alternatives:', error);
    return [];
  }
}

// Helper function to calculate EcoPoints earned
function calculateEcoPoints(originalProduct, alternativeProduct) {
  const scoreDifference = alternativeProduct.ecoScore - originalProduct.ecoScore;
  // Award 1 point per EcoScore improvement, minimum 5 points for any sustainable swap
  return Math.max(5, Math.round(scoreDifference));
}

module.exports = router;
