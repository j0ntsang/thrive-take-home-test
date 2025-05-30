import { CSS } from "@dnd-kit/utilities";
import React from "react";
import { useSortable } from "@dnd-kit/sortable";

interface TableHeaderProps {
  id: string;
  onSort: () => void;
  isSorted: boolean;
  sortDirection: "asc" | "desc";
}

const ariaLabels: Record<string, string> = {
  ID: "Identifier column",
  "First Name": "First Name column",
  "Last Name": "Last Name column",
  "Full Name": "Full Name column",
  Email: "Email column",
  City: "City column",
  "Registered Date": "Registered Date column",
  DSR: "Days Since Registered column",
};

const TableHeader: React.FC<TableHeaderProps> = ({
  id,
  onSort,
  isSorted,
  sortDirection,
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    onSort();
  };

  const handleOnKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onSort();
    }
  };

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      className="flex-1 px-4 py-2 text-sm font-semibold text-gray-900 bg-gray-100 border-r border-gray-300 cursor-move truncate select-none flex items-center justify-between"
      role="columnheader"
      aria-label={ariaLabels[id] || `Column: ${id}`}
      title={ariaLabels[id] || `Column: ${id}`}
      onClick={(e) => handleClick(e)}
      tabIndex={0}
      onKeyDown={(e) => handleOnKeyDown(e)}>
      <span>{id}</span>
      {isSorted && (
        <span aria-hidden="true" className="ml-2">
          {sortDirection === "asc" ? "▲" : "▼"}
        </span>
      )}
    </div>
  );
};

export default TableHeader;
