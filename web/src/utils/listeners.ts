import { DebugEventReceive } from './eventHandlers';
import { Receive } from '../types/events';
import { DialogData, DialogUpdateData } from '../types/dialog';
import { SendEvent } from './eventHandlers';
import { Send } from '../types/events';

export const initializeListeners = () => {
  // For debugging in browser
  if (import.meta.env.DEV) {
    // Debug visibility toggle
    DebugEventReceive<boolean>(Receive.visible, (data) => {
      return data;
    });

    // Debug dialog show
    DebugEventReceive<DialogData>(Receive.showDialogue, (data) => {
      return data;
    });

    // Debug dialog update
    DebugEventReceive<DialogUpdateData>(Receive.updateDialogue, (data) => {
      return data;
    });
  }

  // Close on ESC key press
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      SendEvent(Send.close);
    }
  });
  
  // Prevent browser's default behaviors
  document.addEventListener('contextmenu', (event) => {
    event.preventDefault();
  });
};