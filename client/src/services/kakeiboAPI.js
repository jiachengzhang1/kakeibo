import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

// console.log(process.env.KAKEIBO_BASE_URL);

const kakeiboAPI = axios.create({
  // baseURL: process.env.KAKEIBO_BASE_URL,
  baseURL: "http://localhost:5000",
});

export default kakeiboAPI;
