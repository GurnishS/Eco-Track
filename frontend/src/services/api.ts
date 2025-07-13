import axios from 'axios';
import type { ProductsResponse, CartAnalysisResponse, SwapResponse } from '../types/api';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const productService = {
  // Get all products
  async getAllProducts(): Promise<ProductsResponse> {
    const response = await api.get<ProductsResponse>('/products');
    return response.data;
  },

  // Get products by category
  async getProductsByCategory(category: string): Promise<ProductsResponse> {
    const response = await api.get<ProductsResponse>(`/products/category/${category}`);
    return response.data;
  },

  // Get single product
  async getProduct(id: string) {
    const response = await api.get(`/products/${id}`);
    return response.data;
  },
};

export const cartService = {
  // Analyze cart and get suggestions
  async analyzeCart(productIds: string[]): Promise<CartAnalysisResponse> {
    const response = await api.post<CartAnalysisResponse>('/cart/analysis', {
      productIds,
    });
    return response.data;
  },

  // Swap product with sustainable alternative
  async swapProduct(originalProductId: string, alternativeProductId: string): Promise<SwapResponse> {
    const response = await api.post<SwapResponse>('/cart/swap', {
      originalProductId,
      alternativeProductId,
    });
    return response.data;
  },
};

export const healthService = {
  // Check API health
  async checkHealth() {
    const response = await api.get('/health');
    return response.data;
  },
};

export default api;
