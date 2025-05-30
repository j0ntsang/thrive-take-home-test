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

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex items-center justify-between flex-1 px-4 py-2 text-sm font-semibold text-gray-900 bg-gray-100 border-r border-gray-300 select-none"
      role="columnheader"
      aria-label={ariaLabels[id] || `Column: ${id}`}
      title={ariaLabels[id] || `Column: ${id}`}
      tabIndex={0}
      onClick={(e) => {
        e.preventDefault();
        onSort();
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSort();
        }
      }}>
      <button
        {...attributes}
        {...listeners}
        onClick={(e) => e.stopPropagation()}
        className="cursor-grab px-1 py-1 mr-2 rounded hover:bg-gray-200 active:cursor-grabbing"
        aria-label={`Drag to reorder ${id}`}>
        <div className="flex flex-col items-center space-y-0.5">
          <span className="w-1 h-1 bg-gray-500 rounded-full" />
          <span className="w-1 h-1 bg-gray-500 rounded-full" />
          <span className="w-1 h-1 bg-gray-500 rounded-full" />
        </div>
      </button>
      <span className="flex-1 text-left truncate">{id}</span>
      {isSorted && (
        <span aria-hidden="true" className="ml-2">
          {sortDirection === "asc" ? "▲" : "▼"}
        </span>
      )}
    </div>
  );
};

export default TableHeader;
