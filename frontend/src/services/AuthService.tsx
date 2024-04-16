import axios from "axios";
import http from "../http-common";
const API_URL = "http://localhost:8080/api/auth/";

const register = async (
  username: string,
  password: string,
  role: string[] | null
) => {
  try {
    const data = await http.post(API_URL + "signup", {
      username: username,
      password: password,
      role: role,
    });
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error.status);
      console.error(error.response);
      console.info(error.message);
    }
  }
};

export interface LoginResponse {
  id?: string;
  username: string;
  roles: string[];
}
const login = async (username: string, password: string) => {
  try {
    const response = await http.post(API_URL + "signin", {
      username,
      password,
    });
    const data = response.data as LoginResponse;
    console.log(data);
    if (data.username) {
      localStorage.setItem("user", JSON.stringify(data));
      return data;
    }
  } catch (error) {
    throw new Error(String(error));
  }
};

const logout = () => {
  localStorage.removeItem("user");
  return http.post(API_URL + "signout").then((response) => {
    return response.data;
  });
};

// const getCurrentUser = () => {
//   const userStr = localStorage.getItem("user");
//   if (userStr) return JSON.parse(userStr);
// };

const AuthService = {
  register,
  login,
  logout,
  // getCurrentUser,
};

export default AuthService;
