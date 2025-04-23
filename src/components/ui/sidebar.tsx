import React, { createContext, useState, useContext, ReactNode } from 'react';

type SidebarContextType = {
  expanded: boolean;
  toggleSidebar: () => void;
  setExpanded: (value: boolean) => void;
};

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export function useSidebar() {
  const context = useContext(SidebarContext);
  if (context === undefined) {
    throw new Error('useSidebar must be used within a SidebarProvider');
  }
  return context;
}

type SidebarProviderProps = {
  children: ReactNode;
  defaultExpanded?: boolean;
};

export function SidebarProvider({ 
  children, 
  defaultExpanded = true 
}: SidebarProviderProps) {
  const [expanded, setExpanded] = useState(defaultExpanded);

  const toggleSidebar = () => {
    setExpanded(!expanded);
  };

  return (
    <SidebarContext.Provider value={{ expanded, toggleSidebar, setExpanded }}>
      {children}
    </SidebarContext.Provider>
  );
}

export default SidebarContext;