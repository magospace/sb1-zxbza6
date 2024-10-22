import axios from 'axios';

const API_BASE_URL = 'https://api.bienpet.com'; // Replace with your actual API base URL

// ... (keep existing functions)

export const fetchPetPassport = async (petId: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/pets/${petId}/passport`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message || 'Error fetching pet passport');
    }
    throw new Error('An unexpected error occurred');
  }
};

export const updatePetPassport = async (petId: string, passportData: any) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/pets/${petId}/passport`, passportData);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message || 'Error updating pet passport');
    }
    throw new Error('An unexpected error occurred');
  }
};