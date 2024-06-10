const SearchBar = ({ searchTerm, handleSearch, style }) => {
  return (
    <div className={`search-bar ${style}`}>
      <h1 className={`title ${style}`}>Search All Groups</h1>
      <div className={`field ${style}`}>
        <div className="control">
          <input
            className="input"
            type="text"
            placeholder="Search by name or subject"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
      </div>
    </div>
  );
};

export default SearchBar;