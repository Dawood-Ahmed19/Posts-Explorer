const SearchInput = ({ value, onChange, placeholder }) => {
  return (
    <div className="input">
      <label htmlFor="search">Search your Post Here: </label>
      <input
        type="search"
        className="search-input"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label="Search post by title"
      />
    </div>
  );
};

export default SearchInput;
