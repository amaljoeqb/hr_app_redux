import { IToast } from "../../../models";

export interface ToastProps {
  toast: IToast;
  onClose: () => void;
}

export default function Toast({ toast, onClose }: ToastProps) {
  function getClassName() {
    let className = "toast show";
    switch (toast.type) {
      case "success": {
        className += " success";
        break;
      }
      case "error": {
        className += " error";
        break;
      }
      default: {
        className += " info";
      }
    }
    return className;
  }
  return (
    <div className={getClassName()}>
      <p className="toast-message">{toast.message}</p>
      <span className="material-symbols-outlined close-toast" onClick={onClose}>
        close
      </span>
    </div>
  );
}
