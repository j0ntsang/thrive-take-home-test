interface SearchFiltersProps {
  columns: string[];
  selectedColumns: string[];
  toggleColumn: (cols: string) => void;
}

const SearchFilters: React.FC<SearchFiltersProps> = ({
  columns,
  selectedColumns,
  toggleColumn,
}) => {
  return (
    <details className="relative">
      <summary className="mr-2 font-mono text-3xl marker:content-none cursor-pointer">
        &#x2699;
      </summary>
      <fieldset
        className="bg-white border border-gray-300 w-[150px] flex flex-col flex-wrap gap-2 mt-2 p-4 sm:mt-0 absolute top-full right-0 z-50"
        aria-label="Searchable columns selection">
        {columns.map((col) => (
          <label
            key={col}
            className="inline-flex items-center space-x-1 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={selectedColumns.includes(col)}
              onChange={() => toggleColumn(col)}
              className="form-checkbox h-4 w-4 text-blue-600 mr-1"
              aria-checked={selectedColumns.includes(col)}
            />
            <span className="text-gray-700 text-sm text-nowrap">{col}</span>
          </label>
        ))}
      </fieldset>
    </details>
  );
};

export default SearchFilters;
