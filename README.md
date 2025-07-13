# EcoTrack - Smart Cart Intelligence System

EcoTrack is a smart cart intelligence system for Walmart that encourages sustainable shopping by providing real-time EcoScores, suggesting greener alternatives, and rewarding users with EcoPoints.

## Features

🌱 **Real-Time Cart Analysis**
- Calculate EcoScore for each item based on carbon footprint and packaging waste
- Compute cumulative Cart GreenScore in real-time
- Visual analytics with Chart.js

🔄 **Eco-Friendly Suggestions**
- Identify greener alternatives for products in your cart
- Smart suggestions based on category and EcoScore improvements
- One-click product swapping

🏆 **EcoPoints Reward System**
- Earn points for choosing sustainable products
- Gamified shopping experience to encourage eco-friendly choices

🎨 **Modern UI/UX**
- Built with React.js and Tailwind CSS
- Responsive design that works on all devices
- Real-time updates and smooth animations

## Tech Stack

- **Frontend**: React.js (TypeScript), Tailwind CSS, Chart.js
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **API**: RESTful APIs with comprehensive error handling

## Quick Start

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn

### 1. Clone and Setup

```bash
git clone <repository-url>
cd Eco-Track
```

### 2. Backend Setup

```bash
cd backend
npm install

# Start MongoDB (if using local installation)
# mongod

# Seed the database with sample products
npm run seed

# Start the backend server
npm run dev
```

The backend will run on `http://localhost:5000`

### 3. Frontend Setup

```bash
cd ../frontend
npm install

# Start the React development server
npm start
```

The frontend will run on `http://localhost:3000`

## Project Structure

```
Eco-Track/
├── backend/
│   ├── models/
│   │   └── Product.js          # MongoDB product schema
│   ├── routes/
│   │   ├── products.js         # Product API endpoints
│   │   └── cart.js            # Cart analysis and swap endpoints
│   ├── scripts/
│   │   └── seedData.js        # Database seeding script
│   ├── server.js              # Express server setup
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.tsx     # App header with EcoPoints
│   │   │   ├── ProductList.tsx # Product catalog
│   │   │   ├── Cart.tsx       # Shopping cart with suggestions
│   │   │   └── EcoScoreChart.tsx # Analytics dashboard
│   │   ├── services/
│   │   │   └── api.ts         # API service layer
│   │   ├── types/
│   │   │   └── index.ts       # TypeScript interfaces
│   │   └── App.tsx           # Main React component
│   └── package.json
└── README.md
```

## API Endpoints

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `GET /api/products/category/:category` - Get products by category

### Cart Analysis
- `POST /api/cart/analysis` - Analyze cart and get suggestions
- `POST /api/cart/swap` - Swap product with sustainable alternative

### Health Check
- `GET /api/health` - API health status

## EcoScore Calculation

The EcoScore is calculated using a weighted formula:
- **60%** Carbon Footprint (lower is better)
- **40%** Packaging Waste (lower is better)

Score ranges:
- **80-100**: Excellent 🟢
- **60-79**: Good 🟡
- **40-59**: Fair 🟠
- **0-39**: Poor 🔴

## Sample Data

The database includes sample products across categories:
- Beverages (sodas, water, eco-friendly alternatives)
- Snacks (chips, cookies, organic options)
- Dairy (milk, yogurt in various packaging)
- Produce (conventional vs organic)
- Cleaning products (standard vs eco-friendly)

## Development

### Backend Development
```bash
cd backend
npm run dev  # Uses nodemon for auto-restart
```

### Frontend Development
```bash
cd frontend
npm start  # Hot reloading enabled
```

### Database Management
```bash
cd backend
npm run seed  # Re-seed database with fresh data
```

## Environment Variables

### Backend (.env)
```
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/ecotrack
```

### Frontend (.env)
```
REACT_APP_API_URL=http://localhost:5000/api
```

## Production Deployment

1. **Backend**: Deploy to services like Heroku, DigitalOcean, or AWS
2. **Frontend**: Deploy to Netlify, Vercel, or AWS S3
3. **Database**: Use MongoDB Atlas for production database

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - see LICENSE file for details

---

**Built for Walmart Labs Hackathon** 🏪  
*Encouraging sustainable shopping through intelligent cart analysis*