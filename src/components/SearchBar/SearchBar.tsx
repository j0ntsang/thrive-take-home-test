import React from "react";
import SearchFilters from "./SearchFilters";

interface SearchBarProps {
  columns: string[];
  selectedColumns: string[];
  onChangeSelectedColumns: (cols: string[]) => void;
  searchText: string;
  onSearchTextChange: (text: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  columns,
  selectedColumns,
  onChangeSelectedColumns,
  searchText,
  onSearchTextChange,
}) => {
  const toggleColumn = (col: string) => {
    if (selectedColumns.includes(col)) {
      onChangeSelectedColumns(selectedColumns.filter((c) => c !== col));
    } else {
      onChangeSelectedColumns([...selectedColumns, col]);
    }
  };

  return (
    <div className="mb-4 p-2 border border-gray-300 rounded-md bg-white flex flex-col sm:flex-row sm:items-center sm:space-x-4">
      <input
        type="text"
        placeholder="Search..."
        value={searchText}
        onChange={(e) => onSearchTextChange(e.target.value)}
        className="flex-grow px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-label="Global Search Text"
      />
      <SearchFilters
        columns={columns}
        selectedColumns={selectedColumns}
        toggleColumn={toggleColumn}
      />
    </div>
  );
};

export default SearchBar;
