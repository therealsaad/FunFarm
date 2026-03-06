const SearchBar = ({ value, onChange, placeholder = "Search..." }) => {
  return (
    <div className="ff-search-wrap">
      <input
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="ff-search"
        aria-label="Search"
      />
    </div>
  );
};

export default SearchBar;
