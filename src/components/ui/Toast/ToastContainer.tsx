import { Toast } from "../";
import { IToast } from "../../../models";

export interface ToastContainerProps {
  toasts: IToast[];
  onCloseToast: (id: number) => void;
}

export default function ToastContainer({
  toasts,
  onCloseToast,
}: ToastContainerProps) {
  return (
    <div className="toast-container">
      {toasts.map((toast) => {
        return (
          <Toast
            key={toast.id}
            onClose={() => {
              onCloseToast(toast.id);
            }}
            toast={toast}
          />
        );
      })}
    </div>
  );
}
