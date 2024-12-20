import axios from "axios";
import { baseURL } from "./constant";

export const uploadMedia = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await axios.post(`${baseURL}/uploadMedia`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data; // Assuming the response contains the mediaUrl
  } catch (error) {
    console.error("Upload Media API error:", error);
    throw error;
  }
};

export const createQuote = async (data) => {
  try {
    const response = await axios.post(`${baseURL}/postQuote`, data, {
      headers: { Authorization: `Bearer <TOKEN>` }, // Replace <TOKEN> dynamically
    });
    return response.data;
  } catch (error) {
    console.error("Create Quote API error:", error);
    throw error;
  }
};

// Get Quotes API
export const getQuotes = async (token, limit, offset) => {
  try {
    const res = await axios.get(`${baseURL}/getQuotes`, {
      params: { limit, offset },
      headers: {
        Authorization: token,
      },
    });
    if (res?.status === 200) {
      return res.data;
    }
  } catch (error) {
    console.error("Get Quotes API error:", error);
    throw new Error("Failed to fetch quotes. Please try again.");
  }
  return null;
};
