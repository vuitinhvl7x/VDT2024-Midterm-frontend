// src/api.js

import axios from "axios";

const primaryUrl = "http://192.168.56.61:30001/api/students";
const fallbackUrl = "http://localhost:4000/api/students";

const fetchWithFallback = async (primary, fallback) => {
  try {
    const response = await axios.get(primary);
    return response.data;
  } catch (error) {
    console.error("Primary URL failed, trying fallback:", error);
    const response = await axios.get(fallback);
    return response.data;
  }
};

const postWithFallback = async (primary, fallback, data) => {
  try {
    const response = await axios.post(primary, data);
    return response.data;
  } catch (error) {
    console.error("Primary URL failed, trying fallback:", error);
    const response = await axios.post(fallback, data);
    return response.data;
  }
};

const putWithFallback = async (primary, fallback, data) => {
  try {
    const response = await axios.put(primary, data);
    return response.data;
  } catch (error) {
    console.error("Primary URL failed, trying fallback:", error);
    const response = await axios.put(fallback, data);
    return response.data;
  }
};

const deleteWithFallback = async (primary, fallback) => {
  try {
    await axios.delete(primary);
  } catch (error) {
    console.error("Primary URL failed, trying fallback:", error);
    await axios.delete(fallback);
  }
};

export {
  fetchWithFallback,
  postWithFallback,
  putWithFallback,
  deleteWithFallback,
  primaryUrl,
  fallbackUrl,
};
