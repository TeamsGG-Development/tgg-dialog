import React, { useEffect } from 'react';
import { DialogProvider } from './contexts/DialogContext';
import { VisibilityProvider } from './contexts/VisibilityContext';
import Visibility from './components/Visibility';
import Dialogue from './components/Dialogue';
import { initializeListeners } from './utils/listeners';

const App: React.FC = () => {
  useEffect(() => {
    // Initialize listeners
    initializeListeners();
  }, []);

  return (
    <VisibilityProvider>
      <DialogProvider>
        <Visibility>
          <Dialogue />
        </Visibility>
      </DialogProvider>
    </VisibilityProvider>
  );
};

export default App; 