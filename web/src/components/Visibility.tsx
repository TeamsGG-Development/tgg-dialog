import React from 'react';
import { useVisibility } from '../contexts/VisibilityContext';

interface VisibilityProps {
  children: React.ReactNode;
}

const Visibility: React.FC<VisibilityProps> = ({ children }) => {
  const { visible } = useVisibility();

  // If not visible, don't render anything at all
  if (!visible) return null;

  // When visible, render without any container that might add backgrounds
  return <>{children}</>;
};

export default Visibility; 