import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import { User, generateFakeUsers } from "../utils/generateFakeUsers";
import { useMemo, useRef, useState } from "react";

import ColumnHeader from "./ColumnHeader/ColumnHeader";
import SearchBar from "./SearchBar/SearchBar";
import TableRow from "./TableRow";
import { filterUsers } from "../utils/filterUsers";
import { sortUsers } from "../utils/sortUsers";
import { useLocalStorage } from "usehooks-ts";
import { useVirtualizer } from "@tanstack/react-virtual";

const defaultColumns = [
  "ID",
  "First Name",
  "Last Name",
  "Full Name",
  "Email",
  "City",
  "Registered Date",
  "DSR",
];

const TableApp = () => {
  const [users] = useLocalStorage<User[]>("users", generateFakeUsers);
  const [columns, setColumns] = useState(defaultColumns);
  const [searchText, setSearchText] = useState("");
  const [searchColumns, setSearchColumns] = useState(defaultColumns);
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const parentRef = useRef<HTMLDivElement | null>(null);

  const filteredUsers = useMemo(
    () => filterUsers(users, searchText, searchColumns),
    [users, searchText, searchColumns]
  );

  const sortedUsers = useMemo(() => {
    if (!sortColumn) return filteredUsers;
    return sortUsers(filteredUsers, sortColumn, sortDirection);
  }, [filteredUsers, sortColumn, sortDirection]);

  const rowVirtualizer = useVirtualizer({
    count: sortedUsers.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 40,
    overscan: 10,
  });

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      const oldIndex = columns.indexOf(active.id);
      const newIndex = columns.indexOf(over.id);
      setColumns((cols) => arrayMove(cols, oldIndex, newIndex));
    }
  };

  const handleSort = (col: string) => {
    if (sortColumn === col) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(col);
      setSortDirection("asc");
    }
  };

  return (
    <div className="max-w-full">
      <SearchBar
        columns={defaultColumns}
        selectedColumns={searchColumns}
        onChangeSelectedColumns={setSearchColumns}
        searchText={searchText}
        onSearchTextChange={setSearchText}
      />

      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext
          items={columns}
          strategy={horizontalListSortingStrategy}>
          <div className="flex border border-gray-300 rounded-t-md overflow-hidden select-none">
            {columns.map((col) => (
              <ColumnHeader
                key={col}
                id={col}
                onSort={() => handleSort(col)}
                isSorted={sortColumn === col}
                sortDirection={sortDirection}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>

      <div
        ref={parentRef}
        className="h-[600px] overflow-auto border border-t-0 border-gray-300 relative rounded-b-md bg-white">
        <div
          style={{
            height: rowVirtualizer.getTotalSize(),
            position: "relative",
          }}>
          {rowVirtualizer.getVirtualItems().map((virtualRow) => (
            <TableRow
              key={virtualRow.key}
              index={virtualRow.index}
              user={sortedUsers[virtualRow.index]}
              columns={columns}
              top={virtualRow.start}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TableApp;
