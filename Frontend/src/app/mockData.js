import { faker } from "@faker-js/faker";

// Generate transactions for the past 12 days
export function createRandomTransaction() {
  const currentDate = new Date();
  const dayOffset = Math.floor(Math.random() * 12); // Only for the last 12 days
  const transactionDate = new Date(currentDate);
  transactionDate.setDate(currentDate.getDate() - dayOffset);

  const isIncome = Math.random() > 0.5;
  return {
    transactionDate: transactionDate.toLocaleDateString('en-US', { day: 'numeric', month: 'short'}), // Ensure consistent formatting
    transactionId: faker.string.uuid(),
    description: faker.lorem.sentence(),
    amount: parseFloat((Math.random() * (9000) + 100).toFixed(2)) * (isIncome ? 1 : -1),
    category: faker.helpers.arrayElement([
      "Income",
      "Groceries",
      "Utilities",
      "Entertainment",
      "Travel",
      "Miscellaneous",
    ]),
    status: "Completed",
    actions: "Actions",
  };
}

// Generate a random set of transactions for the past 12 days
export const TRANSACTIONS = Array.from(
  { length: 50 }, // 50 transactions within the last 12 days
  createRandomTransaction
);
