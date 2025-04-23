import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '../types/models';
import apiClient from '../services/apiClient';

// Define the user store state shape
interface UserState {
  currentUser: User | null;
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  
  // Actions
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  
  // Async actions
  fetchCurrentUser: () => Promise<User | null>;
  login: (email: string, password: string) => Promise<User | null>;
  logout: () => Promise<void>;
  updateProfile: (updates: Partial<User>) => Promise<User | null>;
}

/**
 * User store for managing auth state and user data
 */
export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      // State
      currentUser: null,
      isLoading: false,
      error: null,
      isAuthenticated: false,
      
      // Actions
      setUser: (user) => set({ 
        currentUser: user,
        isAuthenticated: !!user,
        error: null
      }),
      
      setLoading: (loading) => set({ isLoading: loading }),
      
      setError: (error) => set({ error }),
      
      // Async actions
      fetchCurrentUser: async () => {
        const { setLoading, setUser, setError } = get();
        
        setLoading(true);
        try {
          // In a real app, you'd call your API
          const response = await apiClient.get('/users/me');
          const user = response.data;
          setUser(user);
          return user;
        } catch (error) {
          console.error('Failed to fetch user:', error);
          setError(error instanceof Error ? error.message : 'Failed to fetch user');
          setUser(null);
          return null;
        } finally {
          setLoading(false);
        }
      },
      
      login: async (email, password) => {
        const { setLoading, setUser, setError } = get();
        
        setLoading(true);
        try {
          // In a real app, you'd call your API
          const response = await apiClient.post('/auth/login', { email, password });
          const { user, token } = response.data;
          
          // Save token to localStorage
          if (typeof window !== 'undefined') {
            localStorage.setItem('token', token);
          }
          
          setUser(user);
          return user;
        } catch (error) {
          console.error('Login failed:', error);
          setError(error instanceof Error ? error.message : 'Login failed');
          return null;
        } finally {
          setLoading(false);
        }
      },
      
      logout: async () => {
        const { setUser } = get();
        
        try {
          // In a real app, you might call your API to invalidate the token
          // await apiClient.post('/auth/logout');
          
          // Remove token from localStorage
          if (typeof window !== 'undefined') {
            localStorage.removeItem('token');
          }
          
          setUser(null);
        } catch (error) {
          console.error('Logout failed:', error);
          // Still clear the user regardless of API errors
          setUser(null);
        }
      },
      
      updateProfile: async (updates) => {
        const { setLoading, setUser, setError, currentUser } = get();
        
        if (!currentUser) {
          setError('No user logged in');
          return null;
        }
        
        setLoading(true);
        try {
          // In a real app, you'd call your API
          const response = await apiClient.patch(`/users/${currentUser.id}`, updates);
          const updatedUser = response.data;
          setUser(updatedUser);
          return updatedUser;
        } catch (error) {
          console.error('Profile update failed:', error);
          setError(error instanceof Error ? error.message : 'Profile update failed');
          return null;
        } finally {
          setLoading(false);
        }
      },
    }),
    {
      // Persist options
      name: 'user-storage', // localStorage key
      partialize: (state) => ({ 
        currentUser: state.currentUser,
        isAuthenticated: state.isAuthenticated
      }),
    }
  )
);