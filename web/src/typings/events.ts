export interface DebugAction {
  label: string;
  action: () => void;
  delay?: number;
}

export interface DebugEventCallback {
  action: string;
  handler: (data: any) => any;
}

export interface DebugActionItem {
  label: string;
  action: (value?: any) => void;
  value?: any;
  type?: 'slider' | 'checkbox' | 'text';
  placeholder?: string;
}

export interface DebugItem {
  label: string;
  actions: DebugActionItem[];
} 