import axios from "axios";
import {  IP } from "./constant";

export const login = async (data) => {
  try {
    const res = await axios.post(`${IP}/login`, data);
    if (res?.status === 200) {
      return res;
    }
  } catch (error) {
    console.error("Login API error:", error);
    throw new Error("Failed to log in. Please try again.");
  }
  return null;
};
