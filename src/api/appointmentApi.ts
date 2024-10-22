import axios from 'axios';

const API_BASE_URL = 'https://api.bienpet.com'; // Replace with your actual API base URL

export const bookAppointment = async (clinicId: string, appointmentData: any) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/appointments`, {
      clinicId,
      ...appointmentData,
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message || 'Error booking appointment');
    }
    throw new Error('An unexpected error occurred');
  }
};

export const fetchAvailableSlots = async (clinicId: string, date: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/appointments/available-slots`, {
      params: { clinicId, date },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message || 'Error fetching available slots');
    }
    throw new Error('An unexpected error occurred');
  }
};