import axios from "axios";

const http = axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
    "Content-type": "application/json",
  },
  withCredentials: true,
});

export default http;
