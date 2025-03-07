import axiosInstance from "../plugins/interceptor";
import Cookie from 'js-cookie';

// Register user
const register = async (userData) => {
  try {
    const response = await axiosInstance.post("accounts/api/register", userData);
    return response.data;
  } catch (err) {
    console.error(err)
    return Promise.reject(err);
  }
};

// Login user
const login = async (userData) => {
  try {
    const response = await axiosInstance.post("accounts/api/login", userData);

    if (response.data) {
      localStorage.setItem("user", JSON.stringify(response.data));
      // set cookie
      Cookie.set('token', response.data.token, { expires: 30 });
    }
    return response.data;
  } catch (err) {
    console.error(err)
    // reject
    return Promise.reject(err);
  }
};

// Logout user
const logout = () => {
  Cookie.remove('token');
  localStorage.removeItem("user")
};

// Get user profile
const getUserProfile = async (token) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axiosInstance.get("profile", config);
    return response.data;
  } catch (err) {
    console.error(err)
    return Promise.reject(err);
  }
};

const authService = {
  register,
  logout,
  login,
  getUserProfile,
};

export default authService;