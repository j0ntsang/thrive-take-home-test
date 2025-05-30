import { User } from "./generateFakeUsers";
import { getColumnData } from "./getColumnData";

export const sortUsers = (
  users: User[],
  sortColumn: string,
  sortDirection: "asc" | "desc"
): User[] => {
  const sorted = [...users].sort((a, b) => {
    const aVal = getColumnData(a, sortColumn);
    const bVal = getColumnData(b, sortColumn);

    if (typeof aVal === "number" && typeof bVal === "number") {
      return aVal - bVal;
    }

    const aStr = aVal.toString().toLowerCase();
    const bStr = bVal.toString().toLowerCase();

    if (aStr < bStr) return -1;
    if (aStr > bStr) return 1;
    return 0;
  });

  if (sortDirection === "desc") {
    sorted.reverse();
  }
  return sorted;
};
