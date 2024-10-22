import axios from 'axios';

const API_BASE_URL = 'https://api.bienpet.com'; // Replace with your actual API base URL

interface FilterOptions {
  category?: string;
  petType?: string;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: 'price-asc' | 'price-desc' | 'rating';
}

export const fetchMarketplaceItems = async (options: FilterOptions = {}) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/marketplace/items`, { params: options });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message || 'Error fetching marketplace items');
    }
    throw new Error('An unexpected error occurred');
  }
};

// ... rest of the existing functions

export const searchMarketplaceItems = async (query: string, options: FilterOptions = {}) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/marketplace/search`, {
      params: { query, ...options },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message || 'Error searching marketplace items');
    }
    throw new Error('An unexpected error occurred');
  }
};