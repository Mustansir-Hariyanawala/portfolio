import "./SearchBar.css";

function SearchBar({ value, onChange }) {
  return (
    <div className="search-bar">

      <input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search projects..."
        aria-label="Search projects"
      />

    </div>
  );
}

export default SearchBar;