import searchIcon from '../assets/icons/search.svg';

const SearchBar = ({ searchQuery, setSearchQuery }) => {
  return (
    <div className="relative w-full md:w-64">
      <img
        src={searchIcon}
        alt="Search"
        className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 opacity-70"
      />
      <input
        type="text"
        placeholder="Search name..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full pl-10 pr-4 py-2 bg-[#374151] text-white border border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400 text-sm"
      />
    </div>
  );
};

export default SearchBar;
