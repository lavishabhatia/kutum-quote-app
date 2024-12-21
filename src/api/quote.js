import axios from "axios";
import { baseURL, getStoreHeader, imageUploadURL } from "./constant";

export const uploadImage = async (file) => {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const res = await axios.post(`${imageUploadURL}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${getStoreHeader()}`,
      },
    });

    if (res?.status === 200) {
      return res.data;
    }
  } catch (error) {
    console.error("Upload Image API error:", error);
    throw new Error("Failed to upload image. Please try again.");
  }
  return null;
};

// export const createQuote = async (payload) => {
//   try {
//     const res = await axios.post(`${baseURL}/postQuote`, payload, {
//       headers: {
//         Authorization: `Bearer ${getStoreHeader()}`,
//         "Content-Type": "application/json",
//       },
//     });

//     if (res?.status === 200) {
//       return res.data;
//     }
//   } catch (error) {
//     console.error("Create Quote API error:", error);
//     throw new Error("Failed to create quote. Please try again.");
//   }
//   return null;
// };

export const createQuote = async (payload) => {
  const token = getStoreHeader(); // Ensure this retrieves the valid token
  try {
    const res = await axios.post(
      "https://assignment.stage.crafto.app/postQuote",
      {data:payload},
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    return res.data; // Handle response
  } catch (error) {
    console.error("Create Quote API Error:", error.response?.data || error);
    throw new Error("Failed to create quote.");
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
