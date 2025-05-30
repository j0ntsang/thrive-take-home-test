import React from "react";

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
      <details>
        <summary className="mr-2 font-mono text-3xl marker:content-none cursor-pointer">
          &#x2699;
        </summary>
        <fieldset
          className="flex flex-wrap gap-2 mt-2 sm:mt-0"
          aria-label="Searchable columns selection">
          {columns.map((col) => (
            <label
              key={col}
              className="inline-flex items-center space-x-1 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={selectedColumns.includes(col)}
                onChange={() => toggleColumn(col)}
                className="form-checkbox h-4 w-4 text-blue-600"
                aria-checked={selectedColumns.includes(col)}
              />
              <span className="text-gray-700 text-sm">{col}</span>
            </label>
          ))}
        </fieldset>
      </details>
    </div>
  );
};

export default SearchBar;
