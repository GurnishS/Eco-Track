export interface Product {
  _id: string;
  productName: string;
  category: string;
  carbonFootprint: number;
  packagingWaste: number;
  isSustainable: boolean;
  price: number;
  description: string;
  image: string;
  ecoScore: number;
  sustainableAlternative?: Product;
  createdAt: string;
  updatedAt: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CartAnalysis {
  totalItems: number;
  cartGreenScore: number;
  averageEcoScore: number;
  totalCarbonFootprint: number;
  totalPackagingWaste: number;
}

export interface Suggestion {
  originalProduct: Product;
  alternatives: Product[];
  potentialEcoPoints: number;
}

export interface CartAnalysisResponse {
  success: boolean;
  data: {
    cartAnalysis: CartAnalysis;
    products: Product[];
    suggestions: Suggestion[];
    ecoPoints: number;
  };
}

export interface ProductsResponse {
  success: boolean;
  data: Product[];
  count: number;
}

export interface SwapResponse {
  success: boolean;
  data: {
    swapped: boolean;
    ecoPointsEarned: number;
    originalProduct: Product;
    newProduct: Product;
    ecoScoreImprovement: number;
  };
}
