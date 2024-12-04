import axios from "axios";
import { LOCAL } from "../utils/enum/standard.enum";

const axiosAPI = axios.create({
  baseURL:
    process.env.REACT_APP_ENV === LOCAL
      ? `http://localhost:4000`
      : `https://development.....`,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosAPI;
