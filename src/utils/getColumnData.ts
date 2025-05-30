import { formatDistanceToNow, parseISO } from "date-fns";

import { User } from "./generateFakeUsers";

export const getColumnData = (user: User, col: string): string | number => {
  switch (col) {
    case "ID":
      return user.id;
    case "First Name":
      return user.firstName;
    case "Last Name":
      return user.lastName;
    case "Full Name":
      return `${user.firstName} ${user.lastName}`;
    case "Email":
      return user.email;
    case "City":
      return user.city;
    case "Registered Date":
      return new Date(user.registeredDate).toLocaleDateString();
    case "DSR":
      return formatDistanceToNow(parseISO(user.registeredDate), {
        addSuffix: false,
      });
    default:
      return "";
  }
};
