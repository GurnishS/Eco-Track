const mongoose = require('mongoose');
const Product = require('../models/Product');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/ecotrack';

const sampleProducts = [
  // Beverages
  {
    productName: "Coca-Cola 12-pack Cans",
    category: "Beverages",
    carbonFootprint: 45,
    packagingWaste: 180,
    isSustainable: false,
    price: 4.99,
    description: "Classic Coca-Cola in aluminum cans",
    image: "/images/coca-cola-cans.jpg"
  },
  {
    productName: "Eco-Friendly Cola 12-pack Glass Bottles",
    category: "Beverages",
    carbonFootprint: 25,
    packagingWaste: 80,
    isSustainable: true,
    price: 6.99,
    description: "Organic cola in recyclable glass bottles",
    image: "/images/eco-cola-glass.jpg"
  },
  {
    productName: "Plastic Water Bottles 24-pack",
    category: "Beverages",
    carbonFootprint: 55,
    packagingWaste: 240,
    isSustainable: false,
    price: 3.99,
    description: "Single-use plastic water bottles",
    image: "/images/plastic-water.jpg"
  },
  {
    productName: "Reusable Glass Water Bottles 4-pack",
    category: "Beverages",
    carbonFootprint: 15,
    packagingWaste: 20,
    isSustainable: true,
    price: 24.99,
    description: "Durable glass water bottles with lifetime guarantee",
    image: "/images/glass-water.jpg"
  },

  // Snacks
  {
    productName: "Lay's Potato Chips Family Size",
    category: "Snacks",
    carbonFootprint: 35,
    packagingWaste: 150,
    isSustainable: false,
    price: 4.49,
    description: "Classic potato chips in plastic bag",
    image: "/images/lays-chips.jpg"
  },
  {
    productName: "Organic Veggie Chips Compostable Pack",
    category: "Snacks",
    carbonFootprint: 18,
    packagingWaste: 30,
    isSustainable: true,
    price: 5.99,
    description: "Organic vegetable chips in compostable packaging",
    image: "/images/organic-veggie-chips.jpg"
  },
  {
    productName: "Oreo Cookies Original",
    category: "Snacks",
    carbonFootprint: 42,
    packagingWaste: 120,
    isSustainable: false,
    price: 3.99,
    description: "Classic Oreo cookies in plastic tray",
    image: "/images/oreo-original.jpg"
  },
  {
    productName: "Organic Oat Cookies Recyclable Box",
    category: "Snacks",
    carbonFootprint: 22,
    packagingWaste: 40,
    isSustainable: true,
    price: 4.99,
    description: "Organic oat cookies in recyclable cardboard",
    image: "/images/organic-oat-cookies.jpg"
  },

  // Dairy
  {
    productName: "Regular Milk 1 Gallon Plastic",
    category: "Dairy",
    carbonFootprint: 38,
    packagingWaste: 95,
    isSustainable: false,
    price: 3.49,
    description: "Whole milk in plastic jug",
    image: "/images/regular-milk.jpg"
  },
  {
    productName: "Organic Milk 1 Gallon Glass",
    category: "Dairy",
    carbonFootprint: 28,
    packagingWaste: 45,
    isSustainable: true,
    price: 5.99,
    description: "Organic whole milk in returnable glass bottle",
    image: "/images/organic-milk-glass.jpg"
  },
  {
    productName: "Regular Yogurt 6-pack Plastic",
    category: "Dairy",
    carbonFootprint: 32,
    packagingWaste: 110,
    isSustainable: false,
    price: 4.99,
    description: "Vanilla yogurt in plastic containers",
    image: "/images/regular-yogurt.jpg"
  },
  {
    productName: "Organic Yogurt Glass Jars 4-pack",
    category: "Dairy",
    carbonFootprint: 20,
    packagingWaste: 60,
    isSustainable: true,
    price: 7.99,
    description: "Organic yogurt in reusable glass jars",
    image: "/images/organic-yogurt-glass.jpg"
  },

  // Produce
  {
    productName: "Conventional Apples 3 lbs Plastic Bag",
    category: "Produce",
    carbonFootprint: 25,
    packagingWaste: 85,
    isSustainable: false,
    price: 4.99,
    description: "Red delicious apples in plastic bag",
    image: "/images/conventional-apples.jpg"
  },
  {
    productName: "Organic Apples 3 lbs Paper Bag",
    category: "Produce",
    carbonFootprint: 15,
    packagingWaste: 25,
    isSustainable: true,
    price: 6.99,
    description: "Organic red delicious apples in compostable paper bag",
    image: "/images/organic-apples.jpg"
  },

  // Cleaning Products
  {
    productName: "Regular Dish Soap Plastic Bottle",
    category: "Cleaning",
    carbonFootprint: 48,
    packagingWaste: 160,
    isSustainable: false,
    price: 2.99,
    description: "Standard dish soap in plastic bottle",
    image: "/images/regular-dish-soap.jpg"
  },
  {
    productName: "Eco Dish Soap Refillable Glass",
    category: "Cleaning",
    carbonFootprint: 22,
    packagingWaste: 35,
    isSustainable: true,
    price: 8.99,
    description: "Plant-based dish soap in refillable glass bottle",
    image: "/images/eco-dish-soap.jpg"
  }
];

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ Connected to MongoDB');

    // Clear existing products
    await Product.deleteMany({});
    console.log('🗑️  Cleared existing products');

    // Insert sample products
    const insertedProducts = await Product.insertMany(sampleProducts);
    console.log(`✅ Inserted ${insertedProducts.length} sample products`);

    // Link sustainable alternatives
    const linkings = [
      { conventional: "Coca-Cola 12-pack Cans", sustainable: "Eco-Friendly Cola 12-pack Glass Bottles" },
      { conventional: "Plastic Water Bottles 24-pack", sustainable: "Reusable Glass Water Bottles 4-pack" },
      { conventional: "Lay's Potato Chips Family Size", sustainable: "Organic Veggie Chips Compostable Pack" },
      { conventional: "Oreo Cookies Original", sustainable: "Organic Oat Cookies Recyclable Box" },
      { conventional: "Regular Milk 1 Gallon Plastic", sustainable: "Organic Milk 1 Gallon Glass" },
      { conventional: "Regular Yogurt 6-pack Plastic", sustainable: "Organic Yogurt Glass Jars 4-pack" },
      { conventional: "Conventional Apples 3 lbs Plastic Bag", sustainable: "Organic Apples 3 lbs Paper Bag" },
      { conventional: "Regular Dish Soap Plastic Bottle", sustainable: "Eco Dish Soap Refillable Glass" }
    ];

    for (const link of linkings) {
      const conventionalProduct = await Product.findOne({ productName: link.conventional });
      const sustainableProduct = await Product.findOne({ productName: link.sustainable });
      
      if (conventionalProduct && sustainableProduct) {
        conventionalProduct.sustainableAlternative = sustainableProduct._id;
        await conventionalProduct.save();
        console.log(`🔗 Linked "${link.conventional}" to "${link.sustainable}"`);
      }
    }

    console.log('\n🎉 Database seeded successfully!');
    console.log('\nSample EcoScores:');
    
    const products = await Product.find().limit(5);
    products.forEach(product => {
      console.log(`  ${product.productName}: ${product.ecoScore}/100`);
    });

  } catch (error) {
    console.error('❌ Error seeding database:', error);
  } finally {
    await mongoose.connection.close();
    console.log('\n📤 Disconnected from MongoDB');
  }
}

// Run the seed function
if (require.main === module) {
  seedDatabase();
}

module.exports = { seedDatabase, sampleProducts };
