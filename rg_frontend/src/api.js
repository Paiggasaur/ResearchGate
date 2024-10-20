// src/api.js

const API_BASE_URL = 'http://127.0.0.1:8000/api/';

const getAuthHeader = () => {
  const token = localStorage.getItem('access_token');
  return {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };
};

// Fetch function
export const fetchData = async (endpoint) => {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: 'GET',
    headers: getAuthHeader(),
  });

  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }

  return await response.json();
};
