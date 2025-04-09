import { useEffect, useRef } from 'react';
import { NuiMessage, DebugEvent } from '../types/events';

const RESOURCE_NAME = 'tgg-dialog';

const debugEventListeners: { [key: string]: any } = {};

/**
 * Check if we're in a browser environment
 */
export const IsEnvBrowser = (): boolean => !(window as any).invokeNative;
const isBrowser = IsEnvBrowser();

/**
 * Send an event to the Client
 * @param eventName The name of the event to send
 * @param data The data to send with the event
 * @returns {Promise<T>} The callback response from the Client
 **/
export async function SendEvent<T = any, P = any>(
  eventName: string,
  data: T = {} as T,
): Promise<P> {
  if (isBrowser) {
    const debugReturn = await DebugEventCallback<T>(eventName, data);
    return Promise.resolve(debugReturn as P);
  }
  
  const options = {
    method: 'post',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify(data),
  };

  const resp: Response = await fetch(
    `https://${RESOURCE_NAME}/${eventName}`,
    options,
  );
  
  return await resp.json();
}

/**
 * Hook for listening to NUI events
 */
export const useNuiEvent = <T = any>(action: string, callback: (data: T) => void) => {
  const savedCallback = useRef<(data: T) => void>(callback);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    const eventListener = (event: MessageEvent) => {
      const { action: eventAction, data } = event.data as NuiMessage<T>;

      if (eventAction === action) {
        savedCallback.current(data);
      }
    };

    window.addEventListener('message', eventListener);
    
    return () => window.removeEventListener('message', eventListener);
  }, [action]);
};

/**
 * Get the current resource name 
 */
export const GetParentResourceName = () => {
  return (window as any).GetParentResourceName?.() || 'tgg-dialog';
};

/**
 * Emulate an event sent from the Client (for browser debugging)
 * @param action The name of the event to send
 * @param data The data to send with the event
 * @param timer The time to wait before sending the event (in ms)
 **/
export async function DebugEventSend<P>(action: string, data?: P, timer = 0) {
  if (!isBrowser) return;
  
  setTimeout(() => {
    const event = new MessageEvent('message', {
      data: { action, data },
    });
    window.dispatchEvent(event);
  }, timer);
}

/**
 * Emulate an NUICallback in the Client (for browser debugging)
 * @param action The name of the event to listen for
 * @param handler The callback to run when the event is received
 **/
export async function DebugEventReceive<T>(
  action: string,
  handler?: (data: T) => unknown,
) {
  if (!isBrowser) return;

  if (debugEventListeners[action] !== undefined) {
    console.log(
      `%c[DEBUG] %c${action} %cevent already has a debug receiver.`,
      'color: red; font-weight: bold;',
      'color: green',
      '', // Empty CSS style string to reset the color
    );
    return;
  }

  debugEventListeners[action] = handler;
}

/**
 * Emulate an NUICallback in the Client (for browser debugging)
 * @private
 * @param action The name of the event to listen for
 * @param data The data to send with the event
 * @returns {Promise<T>} The callback response from the Client
 */
export async function DebugEventCallback<T>(action: string, data?: T): Promise<unknown> {
  if (!isBrowser) return {};

  const handler = debugEventListeners[action];
  if (handler === undefined) {
    console.log(`[DEBUG] ${action} event does not have a debugger.`);
    return {};
  }

  return await handler(data);
} 