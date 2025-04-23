// src/shared/services/api.ts

interface RequestOptions {
  params?: Record<string, any>;
  headers?: Record<string, string>;
  body?: any;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api';

const buildUrl = (endpoint: string, params?: Record<string, any>): string => {
  const url = new URL(endpoint.startsWith('http') ? endpoint : `${API_BASE_URL}${endpoint}`);
  
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        url.searchParams.append(key, String(value));
      }
    });
  }
  
  return url.toString();
};

const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || `API Error: ${response.status}`);
  }
  
  return response.json();
};

export const get = async (endpoint: string, options?: RequestOptions) => {
  const url = buildUrl(endpoint, options?.params);
  
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  });
  
  return handleResponse(response);
};

export const post = async (endpoint: string, data?: any, options?: RequestOptions) => {
  const url = buildUrl(endpoint, options?.params);
  
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    body: data ? JSON.stringify(data) : undefined,
  });
  
  return handleResponse(response);
};

export const put = async (endpoint: string, data?: any, options?: RequestOptions) => {
  const url = buildUrl(endpoint, options?.params);
  
  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    body: data ? JSON.stringify(data) : undefined,
  });
  
  return handleResponse(response);
};

export const del = async (endpoint: string, options?: RequestOptions) => {
  const url = buildUrl(endpoint, options?.params);
  
  const response = await fetch(url, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  });
  
  return handleResponse(response);
};
