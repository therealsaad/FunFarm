const Loader = ({ text = "Loading..." }) => {
  return (
    <div className="ff-loader-wrap" role="status" aria-live="polite">
      <span className="ff-loader" />
      <span>{text}</span>
    </div>
  );
};

export default Loader;
