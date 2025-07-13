import axios from 'axios';
import type { 
  ProductsResponse, 
  CartAnalysisResponse, 
  SwapResponse 
} from '../types/api';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const productService = {
  // Get all products
  getAllProducts: async (): Promise<ProductsResponse> => {
    const response = await api.get('/api/products');
    return response.data;
  },

  // Get product by ID
  getProductById: async (id: string) => {
    const response = await api.get(`/api/products/${id}`);
    return response.data;
  },

  // Get products by category
  getProductsByCategory: async (category: string): Promise<ProductsResponse> => {
    const response = await api.get(`/api/products/category/${category}`);
    return response.data;
  },
};

export const cartService = {
  // Analyze cart and get suggestions
  analyzeCart: async (productIds: string[]): Promise<CartAnalysisResponse> => {
    const response = await api.post('/api/cart/analysis', { productIds });
    return response.data;
  },

  // Swap product with sustainable alternative
  swapProduct: async (
    originalProductId: string, 
    alternativeProductId: string
  ): Promise<SwapResponse> => {
    const response = await api.post('/api/cart/swap', {
      originalProductId,
      alternativeProductId,
    });
    return response.data;
  },
};

export const healthService = {
  // Check API health
  checkHealth: async () => {
    const response = await api.get('/api/health');
    return response.data;
  },
};

export default api;
