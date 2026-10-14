import "../../styles/SearchInput.css";

const SearchInput = ({
  value,
  onChange,
  placeholder = "Search posts by title...",
  onReload,
  reloading = false,
}) => {
  return (
    <div className="input">
      <label htmlFor="search" className="search-label">
        Search your posts
      </label>

      <div className="search-controls">
        <div className="search-field">
          <svg
            className="search-icon"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <circle
              cx="10.8"
              cy="10.8"
              r="6.8"
              stroke="currentColor"
              strokeWidth="1.8"
            />
            <path
              d="m16 16 4 4"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>

          <input
            id="search"
            type="search"
            className="search-input"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            aria-label="Search posts by title"
          />
        </div>

        <button
          type="button"
          className="reload-button"
          onClick={onReload}
          disabled={reloading}
          aria-label="Reload posts"
          title="Reload posts"
        >
          <svg
            className={`reload-icon ${reloading ? "is-spinning" : ""}`}
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M20 7v5h-5M4 17v-5h5"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M5.6 9A7 7 0 0 1 18 6l2 6M4 12l2 6a7 7 0 0 0 12.4-3"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          <span>{reloading ? "Refreshing..." : "Refresh"}</span>
        </button>
      </div>
    </div>
  );
};

export default SearchInput;
