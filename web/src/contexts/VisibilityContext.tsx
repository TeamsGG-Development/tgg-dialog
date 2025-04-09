import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useNuiEvent } from '../utils/eventHandlers';
import { Receive } from '../types/events';

interface VisibilityContextType {
  visible: boolean;
  setVisible: (visible: boolean) => void;
}

const VisibilityContext = createContext<VisibilityContextType | undefined>(undefined);

export const useVisibility = () => {
  const context = useContext(VisibilityContext);
  if (!context) {
    throw new Error('useVisibility must be used within a VisibilityProvider');
  }
  return context;
};

interface VisibilityProviderProps {
  children: ReactNode;
}

export const VisibilityProvider: React.FC<VisibilityProviderProps> = ({ children }) => {
  const [visible, setVisible] = useState(false);
  
  // Listen for visibility changes from NUI
  useNuiEvent<boolean>(Receive.visible, (data) => {
    setVisible(data);
  });

  return (
    <VisibilityContext.Provider value={{ visible, setVisible }}>
      {children}
    </VisibilityContext.Provider>
  );
}; 