import axios from 'axios';
import { GetChaptersResponse } from '@/models/Chapter';

const API_BASE_URL = 'https://api.quran.com/api/v4';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Accept': 'application/json',
  },
  maxBodyLength: Infinity,
});

export const getChapters = async (): Promise<GetChaptersResponse> => {
  try {
    const response = await apiClient.get<GetChaptersResponse>('/chapters');
    return response.data;
  } catch (error) {
    console.error('Error fetching chapters:', error);
    throw error;
  }
};