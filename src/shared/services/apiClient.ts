import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

/**
 * Custom API error class
 */
export class ApiError extends Error {
  status: number;
  data?: any;
  
  constructor(message: string, status: number, data?: any) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.data = data;
  }
}

/**
 * API configuration
 */
const API_URL = process.env.NEXT_PUBLIC_API_URL || '/api';
const API_TIMEOUT = 30000; // 30 seconds

/**
 * Base API client configuration
 * This is the consolidated API client that should be used across the application
 */
const apiClient: AxiosInstance = axios.create({
  baseURL: API_URL,
  timeout: API_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Request interceptor for API calls
apiClient.interceptors.request.use(
  (config) => {
    // Get the auth token from localStorage (if in browser environment)
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    
    // If token exists, add to headers
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for API calls
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };
    
    // Handle 401 Unauthorized errors (token expired)
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        // Try to refresh the token
        // For now, this is commented out until we implement a refresh token flow
        // const refreshToken = localStorage.getItem('refreshToken');
        // const authService = await import('../../services/authService');
        // const response = await authService.refreshToken(refreshToken);
        // localStorage.setItem('token', response.data.token);
        
        // After token refresh, retry the original request
        // return apiClient(originalRequest);
        
        // For now, just reject and let the auth flow handle redirection
        return Promise.reject(error);
      } catch (refreshError) {
        // Handle failed refresh - usually redirect to login
        if (typeof window !== 'undefined') {
          localStorage.removeItem('token');
          // window.location.href = '/login'; 
        }
        return Promise.reject(refreshError);
      }
    }
    
    // Convert to ApiError for consistent error handling
    const status = error.response?.status || 0;
    const message = error.response?.data?.message || error.message || 'Unknown error occurred';
    const data = error.response?.data;
    
    return Promise.reject(new ApiError(message, status, data));
  }
);

/**
 * Enhanced API client with typed methods
 * This provides type-safe API calls
 */
export const api = {
  /**
   * Make a GET request
   */
  get: async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    const response = await apiClient.get<T>(url, config);
    return response.data;
  },
  
  /**
   * Make a POST request
   */
  post: async <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> => {
    const response = await apiClient.post<T>(url, data, config);
    return response.data;
  },
  
  /**
   * Make a PUT request
   */
  put: async <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> => {
    const response = await apiClient.put<T>(url, data, config);
    return response.data;
  },
  
  /**
   * Make a PATCH request
   */
  patch: async <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> => {
    const response = await apiClient.patch<T>(url, data, config);
    return response.data;
  },
  
  /**
   * Make a DELETE request
   */
  delete: async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    const response = await apiClient.delete<T>(url, config);
    return response.data;
  },
};

// Export the base client for advanced usage
export default apiClient;