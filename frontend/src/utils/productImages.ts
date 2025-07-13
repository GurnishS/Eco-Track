// Product image utility for generating realistic placeholder images
import type { Product } from '../types/api';

// Category-based image mappings using realistic placeholder services
export const getProductImage = (product: Product): string => {
  const { category, _id } = product;
  
  // Use a consistent seed based on product ID for reproducible images
  const seed = _id.slice(-6);
  
  // Category-specific image generators
  const categoryImages: Record<string, string> = {
    'Beverages': `https://picsum.photos/seed/${seed}/400/300?category=drinks`,
    'Snacks': `https://picsum.photos/seed/${seed}/400/300?category=food`,
    'Dairy': `https://picsum.photos/seed/${seed}/400/300?category=dairy`,
    'Produce': `https://picsum.photos/seed/${seed}/400/300?category=fruits`,
    'Cleaning': `https://picsum.photos/seed/${seed}/400/300?category=cleaning`,
    'Personal Care': `https://picsum.photos/seed/${seed}/400/300?category=care`,
    'Household': `https://picsum.photos/seed/${seed}/400/300?category=household`,
    'Electronics': `https://picsum.photos/seed/${seed}/400/300?category=tech`,
  };

  // Fallback to a general product image
  return categoryImages[category] || `https://picsum.photos/seed/${seed}/400/300?category=product`;
};

// Alternative: Use more specific placeholder images based on product names
export const getSpecificProductImage = (product: Product): string => {
  const { productName } = product;
  
  // Map specific product names to more appropriate images
  const productNameLower = productName.toLowerCase();
  
  if (productNameLower.includes('apple') || productNameLower.includes('fruit')) {
    return `https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=400&h=300&fit=crop&crop=center&auto=format&q=80`;
  }
  
  if (productNameLower.includes('water') || productNameLower.includes('bottle')) {
    return `https://images.unsplash.com/photo-1523362628745-0c100150b504?w=400&h=300&fit=crop&crop=center&auto=format&q=80`;
  }
  
  if (productNameLower.includes('milk') || productNameLower.includes('dairy')) {
    return `https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400&h=300&fit=crop&crop=center&auto=format&q=80`;
  }
  
  if (productNameLower.includes('bread') || productNameLower.includes('bakery')) {
    return `https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=300&fit=crop&crop=center&auto=format&q=80`;
  }
  
  if (productNameLower.includes('chips') || productNameLower.includes('snack')) {
    return `https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=400&h=300&fit=crop&crop=center&auto=format&q=80`;
  }
  
  if (productNameLower.includes('soap') || productNameLower.includes('cleaning')) {
    return `https://images.unsplash.com/photo-1584362917165-526a968579e8?w=400&h=300&fit=crop&crop=center&auto=format&q=80`;
  }
  
  if (productNameLower.includes('yogurt')) {
    return `https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&h=300&fit=crop&crop=center&auto=format&q=80`;
  }
  
  if (productNameLower.includes('juice')) {
    return `https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400&h=300&fit=crop&crop=center&auto=format&q=80`;
  }
  
  if (productNameLower.includes('pasta') || productNameLower.includes('spaghetti')) {
    return `https://images.unsplash.com/photo-1551892374-ecf8754cf8b0?w=400&h=300&fit=crop&crop=center&auto=format&q=80`;
  }
  
  if (productNameLower.includes('rice')) {
    return `https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=300&fit=crop&crop=center&auto=format&q=80`;
  }
  
  // Fallback to category-based image
  return getProductImage(product);
};

// Generate thumbnail version
export const getProductThumbnail = (product: Product): string => {
  return getSpecificProductImage(product).replace('w=400&h=300', 'w=200&h=150');
};

// Generate different sizes
export const getProductImageSizes = (product: Product) => {
  const baseUrl = getSpecificProductImage(product);
  
  return {
    thumbnail: baseUrl.replace('w=400&h=300', 'w=150&h=150'),
    small: baseUrl.replace('w=400&h=300', 'w=200&h=150'),
    medium: baseUrl,
    large: baseUrl.replace('w=400&h=300', 'w=600&h=450'),
  };
};
