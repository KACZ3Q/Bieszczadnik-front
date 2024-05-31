import axios from 'axios';

const API_URL = process.env.STRAPI_API_URL || 'http://localhost:1338/api';

export const fetchAPI = async (path) => {
  try {
    const response = await axios.get(`${API_URL}${path}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching data from ${API_URL}${path}:`, error);
    throw error;
  }
};
