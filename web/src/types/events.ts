export enum Receive {
  visible = 'resource:visible',
  showDialogue = 'dialog:show',
  updateDialogue = 'dialog:update',
}

export enum Send {
  close = 'resource:close',
  dialogClick = 'dialog:click',
}

export interface NuiMessage<T = unknown> {
  action: string;
  data: T;
}

export interface DebugEvent {
  [key: string]: any;
} 