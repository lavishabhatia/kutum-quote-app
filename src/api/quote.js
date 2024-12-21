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

export const createQuote = async (payload) => {
  console.log("Authorization Token:", getStoreHeader());
  try {
    const res = await axios.post(`${baseURL}/postQuote`, payload, {
      headers: {
        Authorization: `Bearer ${getStoreHeader()}`,
        "Content-Type": "application/json",
      },
    });

    console.log(res);

    if (res?.status === 200) {
      return res.data;
    }
  } catch (error) {
    console.error("Create Quote API error:", error);
  }
  return null;
};

export const getQuotes = async ({  offset }) => {
  try {
    const res = await axios.get(`https://assignment.stage.crafto.app/getQuotes?limit=20&offset=${offset}`, 
    {  headers: {
        Authorization: `Bearer ${getStoreHeader()}`, 
      },}
    );
    if (res?.status === 200) {
      return res.data;
    }
  } catch (error) {
    console.error("Get Quotes API error:", error);
    throw new Error("Failed to fetch quotes. Please try again.");
  }
  return null;
};

