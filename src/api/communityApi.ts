import axios from 'axios';

const API_BASE_URL = 'https://api.bienpet.com'; // Replace with your actual API base URL

export const fetchForumPosts = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/forum/posts`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message || 'Error fetching forum posts');
    }
    throw new Error('An unexpected error occurred');
  }
};

export const createForumPost = async (post: { title: string; content: string }) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/forum/posts`, post);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message || 'Error creating forum post');
    }
    throw new Error('An unexpected error occurred');
  }
};

export const fetchUserPoints = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/users/points`);
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
    const response = await axios.get(`${API_BASE_URL}/users/achievements`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message || 'Error fetching user achievements');
    }
    throw new Error('An unexpected error occurred');
  }
};

export const unlockAchievement = async (achievementId: string) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/users/achievements`, { achievementId });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message || 'Error unlocking achievement');
    }
    throw new Error('An unexpected error occurred');
  }
};

export const fetchLeaderboard = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/leaderboard`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message || 'Error fetching leaderboard');
    }
    throw new Error('An unexpected error occurred');
  }
};