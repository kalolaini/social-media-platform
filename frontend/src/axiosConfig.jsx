import axios from 'axios';

const axiosInstance = axios.create({
  //baseURL: "http://localhost:5001/api", 
  baseURL: 'http://3.26.39.90/:5001/api', 
  headers: { "Content-Type": "application/json" },
});

export default axiosInstance;
