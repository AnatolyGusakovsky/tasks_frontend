import axios from 'axios';
import { api_url } from "../config";

const axiosApiInstance = axios.create({
  baseURL: api_url
});

export default axiosApiInstance;
