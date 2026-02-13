import axios from "axios";
import type { LoginData } from "../types";

const API_BASE_URL = `${import.meta.env.VITE_API_URL}/api`;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    // "Access-Control-Allow-Origin": "*",
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.res?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export const login = async (data: LoginData) => {
  const res = await api.post("/auth/login", data);
  return res.data;
};

export const register = async (data: any) => {
  const res = await api.post("/auth/register", data);
  return res.data;
};
export const getPhotos = async () => {
  const res = await api.get("/photos");
  return res.data;
};

export const getUserPhotos = async (userId: string) => {
  const res = await api.get(`/photos/users/${userId}/photos`);
  return res.data;
};

export const uploadPhoto = async (formData: FormData) => {
  const res = await api.post("/photos", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

export const likePhoto = async (photoId: string) => {
  const res = await api.post(`/photos/${photoId}/like`);
  return res.data;
};

export const deletePhoto = async (photoId: string) => {
  const res = await api.delete(`/photos/${photoId}`);
  return res.data;
};

export const updatePhoto = async (
  photoId: string,
  data: { title: string; description: string }
) => {
  const res = await api.put(`/photos/${photoId}`, data);
  return res.data;
};

export default api;
