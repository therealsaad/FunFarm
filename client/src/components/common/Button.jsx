const Button = ({
  children,
  onClick,
  variant = "primary",
  disabled = false,
  type = "button",
}) => {
  return (
    <button
      type={type}
      className={`ff-btn ff-btn-${variant} ${disabled ? "ff-btn-disabled" : ""}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
