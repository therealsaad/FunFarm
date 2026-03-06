import { useEffect } from "react";

const Toast = ({ isOpen, message, type = "success", onClose, duration = 2200 }) => {
  useEffect(() => {
    if (!isOpen) return undefined;
    const timeoutId = setTimeout(onClose, duration);
    return () => clearTimeout(timeoutId);
  }, [duration, isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className={`ff-toast ff-toast-${type}`} role="alert" aria-live="assertive">
      <span>{message}</span>
      <button type="button" className="ff-icon-btn" onClick={onClose} aria-label="Close toast">
        x
      </button>
    </div>
  );
};

export default Toast;
