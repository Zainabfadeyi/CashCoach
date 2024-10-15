// import { faker } from "@faker-js/faker";

// // Function to create a random transaction
// export function createRandomTransaction() {
//   return {
//     transactionDate: faker.date.recent().toLocaleDateString(),
//     transactionId: faker.datatype.uuid(),
//     description: faker.lorem.sentence(),
//     amount: parseFloat(faker.finance.amount(10, 1000, 2)),
//     category: faker.helpers.arrayElement([
//       "Groceries",
//       "Utilities",
//       "Entertainment",
//       "Travel",
//       "Miscellaneous",
//     ]),
//     actions: "Actions",
//   };
// }

// // Create an array of fake transactions
// export const TRANSACTIONS = Array.from(
//   { length: 30 },
//   createRandomTransaction
// );

import { faker } from "@faker-js/faker";

// Function to create a random transaction
export function createRandomTransaction() {
  return {
    transaction_date: faker.date.recent().toLocaleDateString(),
    transaction_id: faker.datatype.uuid(),
    description: faker.lorem.sentence(),
    amount: parseFloat(faker.finance.amount(10, 1000, 2)),
    category: faker.helpers.arrayElement([
      "Groceries",
      "Utilities",
      "Entertainment",
      "Travel",
      "Miscellaneous",
    ]),
    category_type: faker.helpers.arrayElement(["Income", "Expense"]), // Add this line for category type
    actions: "Actions",
  };
}

// Create an array of fake transactions
export const TRANSACTIONS = Array.from({ length: 30 }, createRandomTransaction);
