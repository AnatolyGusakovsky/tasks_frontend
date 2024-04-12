import axios from 'axios';
import { api_url } from "../config";

// Syntax seems to be correct. Not sure why this error appears
const axiosApiInstance = axios.create({
  baseURL: api_url
});

export default axiosApiInstance;
