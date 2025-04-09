export interface Button {
  label: string;
  id?: string | number;
}

export interface DialogData {
  job: string;
  name: string;
  text: string;
  buttons: Button[];
  textSpeed?: number;
}

export interface DialogUpdateData {
  type: string;
  value: string | Button[];
}

export interface ButtonClickData {
  index: number;
  id?: string | number;
} 