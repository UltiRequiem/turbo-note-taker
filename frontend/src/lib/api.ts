import axios from "axios";

import type {
  Category,
  CreateCategoryData,
  CreateNoteData,
  LoginResponse,
  Note,
  NotesStats,
  ProfileResponse,
  RefreshTokenResponse,
  SignupResponse,
  UpdateNoteData,
} from "@/types";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";

const api = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      const refreshToken = localStorage.getItem("refreshToken");
      if (refreshToken) {
        try {
          const response = await axios.post(
            `${API_BASE_URL}/api/auth/refresh/`,
            {
              refresh: refreshToken,
            }
          );
          const newToken = response.data.access;
          localStorage.setItem("accessToken", newToken);
          // Retry the original request
          error.config.headers.Authorization = `Bearer ${newToken}`;
          return api.request(error.config);
        } catch (_refreshError) {
          // Refresh failed, redirect to login
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          window.location.href = "/login";
        }
      } else {
        // No refresh token, redirect to login
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

// Categories API
export const categoriesApi = {
  getAll: async (): Promise<Category[]> => {
    const response = await api.get("/categories/");
    return response.data.results || response.data;
  },

  getById: async (id: number): Promise<Category> => {
    const response = await api.get(`/categories/${id}/`);
    return response.data;
  },

  create: async (data: CreateCategoryData): Promise<Category> => {
    const response = await api.post("/categories/", data);
    return response.data;
  },

  update: async (
    id: number,
    data: Partial<CreateCategoryData>
  ): Promise<Category> => {
    const response = await api.patch(`/categories/${id}/`, data);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/categories/${id}/`);
  },
};

// Notes API
export const notesApi = {
  getAll: async (params?: {
    category?: number;
    priority?: string;
    is_pinned?: boolean;
    is_archived?: boolean;
    search?: string;
    tags?: string;
    page?: number;
    ordering?: string;
  }): Promise<{
    results: Note[];
    count: number;
    next: string | null;
    previous: string | null;
  }> => {
    const response = await api.get("/notes/", { params });
    return response.data;
  },

  getById: async (id: number): Promise<Note> => {
    const response = await api.get(`/notes/${id}/`);
    return response.data;
  },

  create: async (data: CreateNoteData): Promise<Note> => {
    const response = await api.post("/notes/", data);
    return response.data;
  },

  update: async (id: number, data: UpdateNoteData): Promise<Note> => {
    const response = await api.patch(`/notes/${id}/`, data);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/notes/${id}/`);
  },

  togglePin: async (
    id: number
  ): Promise<{ id: number; is_pinned: boolean; message: string }> => {
    const response = await api.post(`/notes/${id}/toggle_pin/`);
    return response.data;
  },

  toggleArchive: async (
    id: number
  ): Promise<{ id: number; is_archived: boolean; message: string }> => {
    const response = await api.post(`/notes/${id}/toggle_archive/`);
    return response.data;
  },

  getArchived: async (): Promise<{ results: Note[]; count: number }> => {
    const response = await api.get("/notes/archived/");
    return response.data;
  },

  getPinned: async (): Promise<Note[]> => {
    const response = await api.get("/notes/pinned/");
    return response.data;
  },

  getStats: async (): Promise<NotesStats> => {
    const response = await api.get("/notes/stats/");
    return response.data;
  },
};

// Authentication API
export const authApi = {
  /**
   * Login with email and password
   * @returns JWT tokens (access and refresh)
   */
  login: async (email: string, password: string): Promise<LoginResponse> => {
    const response = await axios.post<LoginResponse>(
      `${API_BASE_URL}/api/auth/login/`,
      {
        username: email,
        password,
      }
    );
    return response.data;
  },

  /**
   * Sign up a new user
   * @returns JWT tokens and user information
   */
  signup: async (email: string, password: string): Promise<SignupResponse> => {
    const response = await axios.post<SignupResponse>(
      `${API_BASE_URL}/api/auth/signup/`,
      {
        email,
        password,
      }
    );
    return response.data;
  },

  /**
   * Refresh access token using refresh token
   * @param refreshToken - The refresh token
   * @returns New access token
   */
  refresh: async (refreshToken: string): Promise<RefreshTokenResponse> => {
    const response = await axios.post<RefreshTokenResponse>(
      `${API_BASE_URL}/api/auth/refresh/`,
      {
        refresh: refreshToken,
      }
    );
    return response.data;
  },

  /**
   * Get current user profile
   * @returns User profile information
   */
  getProfile: async (): Promise<ProfileResponse> => {
    const response = await api.get<ProfileResponse>("/auth/profile/");
    return response.data;
  },

  /**
   * Logout and clear stored tokens
   */
  logout: (): void => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  },
};

export default api;
