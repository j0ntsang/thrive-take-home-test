import { User } from "./generateFakeUsers";
import { getColumnData } from "./getColumnData";

export const filterUsers = (
  users: User[],
  searchText: string,
  searchColumns: string[]
): User[] => {
  if (!searchText.trim()) return users;

  const lowerSearch = searchText.toLowerCase();

  return users.filter((user) =>
    searchColumns.some((col) => {
      const val = getColumnData(user, col);
      if (val === undefined || val === null) return false;
      return val.toString().toLowerCase().includes(lowerSearch);
    })
  );
};
