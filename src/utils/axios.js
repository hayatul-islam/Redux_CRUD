import axios from "axios";
const axiosInstance = axios.create({
  // baseURL: "http://localhost:9000",
  baseURL: "https://reduxcurd.herokuapp.com",
});
export default axiosInstance;
