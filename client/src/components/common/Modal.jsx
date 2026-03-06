const Modal = ({ isOpen, title, children, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="ff-modal-overlay" onClick={onClose}>
      <div
        className="ff-modal"
        role="dialog"
        aria-modal="true"
        aria-label={title}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="ff-modal-head">
          <h3>{title}</h3>
          <button
            type="button"
            className="ff-icon-btn"
            onClick={onClose}
            aria-label="Close modal"
          >
            x
          </button>
        </div>
        <div className="ff-modal-body">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
