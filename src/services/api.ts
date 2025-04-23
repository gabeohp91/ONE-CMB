import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';

export class ApiError extends Error {
  code: number;
  details?: any;
  
  constructor(message: string, code: number, details?: any) {
    super(message);
    this.name = 'ApiError';
    this.code = code;
    this.details = details;
  }
}

export interface ApiClientConfig {
  baseURL: string;
  timeout?: number;
  headers?: Record<string, string>;
}

export class ApiClient {
  private instance: AxiosInstance;
  
  constructor(config: ApiClientConfig) {
    this.instance = axios.create({
      baseURL: config.baseURL,
      timeout: config.timeout || 30000,
      headers: {
        'Content-Type': 'application/json',
        ...config.headers,
      },
    });
    
    // Add response interceptor to handle errors
    this.instance.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          const status = error.response.status;
          const data = error.response.data as any;
          const message = data?.message || error.message || 'An unexpected error occurred';
          throw new ApiError(message, status, data);
        } else if (error.request) {
          // The request was made but no response was received
          throw new ApiError('No response received from server', 0);
        } else {
          // Something happened in setting up the request that triggered an Error
          throw new ApiError(error.message, 0);
        }
      }
    );
  }
  
  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.instance.get<T>(url, config);
    return response.data;
  }
  
  async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.instance.post<T>(url, data, config);
    return response.data;
  }
  
  async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.instance.put<T>(url, data, config);
    return response.data;
  }
  
  async patch<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.instance.patch<T>(url, data, config);
    return response.data;
  }
  
  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.instance.delete<T>(url, config);
    return response.data;
  }
  
  setAuthToken(token: string | null) {
    if (token) {
      this.instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete this.instance.defaults.headers.common['Authorization'];
    }
  }
}

// Create default API client
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.example.com';

export const apiClient = new ApiClient({
  baseURL: API_URL,
});