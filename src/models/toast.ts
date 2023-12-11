export interface IToast {
    message: string;
    type: ToastType;
    id: number;
  }

export type ToastType = "error" | "success" | "info";
  