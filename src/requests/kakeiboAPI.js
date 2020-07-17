import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const kakeiboAPI = axios.create({
  baseURL: process.env.KAKEIBO_BASE_URL,
});

export default kakeiboAPI;
