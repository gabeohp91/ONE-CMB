import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Define the UI store state shape
interface UIState {
  // Sidebar
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  toggleSidebar: () => void;
  
  // Theme
  theme: 'light' | 'dark' | 'system';
  setTheme: (theme: UIState['theme']) => void;
  
  // Chat/AI assistant
  chatOpen: boolean;
  setChatOpen: (open: boolean) => void;
  toggleChat: () => void;
  
  // Active tab/view
  activeTab: string;
  setActiveTab: (tab: string) => void;
  
  // Modal state
  modals: Record<string, boolean>;
  openModal: (modalId: string) => void;
  closeModal: (modalId: string) => void;
  
  // Notifications
  notificationsRead: Record<string, boolean>;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  
  // User preferences
  preferences: {
    language: string;
    compactMode: boolean;
    notificationsEnabled: boolean;
    [key: string]: any;
  };
  updatePreference: <K extends keyof UIState['preferences']>(
    key: K, 
    value: UIState['preferences'][K]
  ) => void;
}

/**
 * UI store for managing UI state
 */
export const useUIStore = create<UIState>()(
  persist(
    (set, get) => ({
      // Sidebar
      sidebarOpen: true,
      setSidebarOpen: (open) => set({ sidebarOpen: open }),
      toggleSidebar: () => set(state => ({ sidebarOpen: !state.sidebarOpen })),
      
      // Theme
      theme: 'system',
      setTheme: (theme) => set({ theme }),
      
      // Chat/AI assistant
      chatOpen: false,
      setChatOpen: (open) => set({ chatOpen: open }),
      toggleChat: () => set(state => ({ chatOpen: !state.chatOpen })),
      
      // Active tab/view
      activeTab: 'overview',
      setActiveTab: (tab) => set({ activeTab: tab }),
      
      // Modal state
      modals: {},
      openModal: (modalId) => set(state => ({ 
        modals: { ...state.modals, [modalId]: true } 
      })),
      closeModal: (modalId) => set(state => ({ 
        modals: { ...state.modals, [modalId]: false } 
      })),
      
      // Notifications
      notificationsRead: {},
      markNotificationRead: (id) => set(state => ({ 
        notificationsRead: { ...state.notificationsRead, [id]: true } 
      })),
      markAllNotificationsRead: () => set(state => {
        const allRead: Record<string, boolean> = {};
        // Hypothetically, you would get all notification IDs
        // and mark them all as read
        return { notificationsRead: allRead };
      }),
      
      // User preferences
      preferences: {
        language: 'vi',
        compactMode: false,
        notificationsEnabled: true,
      },
      updatePreference: (key, value) => set(state => ({
        preferences: {
          ...state.preferences,
          [key]: value
        }
      })),
    }),
    {
      // Persist options
      name: 'ui-storage', // localStorage key
      partialize: (state) => ({
        theme: state.theme,
        preferences: state.preferences,
        notificationsRead: state.notificationsRead,
      }),
    }
  )
);