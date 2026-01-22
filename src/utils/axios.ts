import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "",
  timeout: 10000,
  withCredentials: true,
});
