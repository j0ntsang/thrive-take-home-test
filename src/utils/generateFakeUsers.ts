import { faker } from "@faker-js/faker";

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  city: string;
  registeredDate: string;
}

export const generateFakeUsers = (): User[] => {
  return Array.from({ length: 500 }, (_, i) => ({
    id: i + 1,
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    city: faker.location.city(),
    registeredDate: faker.date.past({ years: 2 }).toISOString(),
  }));
};
