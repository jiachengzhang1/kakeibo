import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const kakeiboAPI = axios.create({
  // baseURL: process.env.KAKEIBO_BASE_URL
  baseURL: "http://kakeibo.jzhangdeveloper.com:5000/",
});

export default kakeiboAPI;
