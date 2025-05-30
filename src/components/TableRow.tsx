import React from "react";
import { User } from "../utils/generateFakeUsers";
import { getColumnData } from "../utils/getColumnData";

interface TableRowProps {
  index: number;
  user: User;
  columns: string[];
  top: number;
}

const TableRow: React.FC<TableRowProps> = ({ user, columns, top }) => {
  return (
    <div
      className="flex border-b border-gray-200 bg-white hover:bg-gray-50 select-none"
      style={{ position: "absolute", top, height: 40, width: "100%" }}
      role="row">
      {columns.map((col, i) => (
        <div
          key={i}
          className="flex-1 px-4 py-2 text-sm text-gray-700 truncate"
          role="cell">
          {getColumnData(user, col)}
        </div>
      ))}
    </div>
  );
};

export default TableRow;
