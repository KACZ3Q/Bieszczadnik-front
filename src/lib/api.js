import axios from 'axios';
import { getStrapiURL } from '@/lib/utils';

const API_URL = getStrapiURL();

export const fetchAPI = async (path) => {
  try {
    const response = await axios.get(`${API_URL}${path}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching data from ${API_URL}${path}:`, error);
    throw error;
  }
};
