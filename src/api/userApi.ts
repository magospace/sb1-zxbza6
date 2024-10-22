import axios from 'axios';

const API_BASE_URL = 'https://api.bienpet.com'; // Replace with your actual API base URL

export const fetchUserData = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/user`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message || 'Error fetching user data');
    }
    throw new Error('An unexpected error occurred');
  }
};

export const updateUserProfile = async (userData: any) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/user`, userData);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message || 'Error updating user profile');
    }
    throw new Error('An unexpected error occurred');
  }
};

export const fetchUserPoints = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/user/points`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message || 'Error fetching user points');
    }
    throw new Error('An unexpected error occurred');
  }
};

export const fetchUserAchievements = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/user/achievements`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message || 'Error fetching user achievements');
    }
    throw new Error('An unexpected error occurred');
  }
};