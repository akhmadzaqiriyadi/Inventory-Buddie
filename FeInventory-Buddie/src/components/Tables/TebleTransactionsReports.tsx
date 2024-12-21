"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';

interface TransactionDetail {
  id: number;
  trxId: number;
  productId: number;
  qty: number;
  totalPrice: number;
  product: {
    id: number;
    name: string;
    categoryId: number;
    rackId: number;
    stock: number;
    pricePurchase: number;
    priceSell: number;
  };
}

interface Transaction {
  id: number;
  trxType: string;
  date: string;
  notes: string;
  details: TransactionDetail[];
}

const TransactionsTable: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>("");

  const handleView = (transaction: Transaction) => {
    // Implementation for viewing transaction details
    console.log("Viewing transaction:", transaction);
  };

  const handleDelete = (transaction: Transaction) => {
    // Implementation for deleting transaction
    console.log("Deleting transaction:", transaction);
  };

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        // Fetch token from localStorage or cookies
        const token = localStorage.getItem("authToken") || 
          document.cookie
            .split("; ")
            .find((row) => row.startsWith("token="))
            ?.split("=")[1];

        if (!token) {
          throw new Error("Authentication token is missing. Please login again.");
        }

        // Send request to backend
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/transactions`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setTransactions(response.data);
        setFilteredTransactions(response.data);
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  const handleDateChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedDate = event.target.value;
    setSelectedDate(selectedDate);

    if (selectedDate) {
      const filtered = transactions.filter(transaction => 
        new Date(transaction.date).toLocaleDateString() === selectedDate
      );
      setFilteredTransactions(filtered);
    } else {
      setFilteredTransactions(transactions); // Reset to show all transactions
    }
  };

  // Extract unique dates for the dropdown
  const uniqueDates = Array.from(new Set(transactions.map(transaction =>
    new Date(transaction.date).toLocaleDateString()
  )));

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="rounded-[10px] border border-stroke bg-white p-4 shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card sm:p-7.5">
      <div className="mb-4 flex flex-row items-center justify-between">
        <div className="text-xl font-bold text-dark dark:text-white">
          Transaction History
        </div>
        {/* Dropdown for selecting date */}
        <select 
          value={selectedDate} 
          onChange={handleDateChange} 
          className="appearance-none rounded-[7px] border border-stroke bg-transparent py-3 pl-4 pr-4 outline-none transition focus:border-primary active:border-primary dark:border-dark-3 dark:bg-dark-2"
        >
          <option value="">Select Date</option>
          {uniqueDates.map((date, index) => (
            <option key={index} value={date}>
              {date}
            </option>
          ))}
        </select>
      </div>
      
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-[#F7F9FC] text-left dark:bg-dark-2">
              <th className="min-w-[220px] px-4 py-4 font-medium text-dark dark:text-white xl:pl-7.5">
                List Transaction ID
              </th>
              <th className="min-w-[150px] px-4 py-4 font-medium text-dark dark:text-white">
                Type
              </th>
              <th className="min-w-[120px] px-4 py-4 font-medium text-dark dark:text-white">
                Date
              </th>
              <th className="px-4 py-4 text-right font-medium text-dark dark:text-white xl:pr-7.5">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.map((transaction, index) => (
              <tr key={transaction.id}>
                <td
                  className={`border-[#eee] px-4 py-4 dark:border-dark-3 xl:pl-7.5 ${index === filteredTransactions.length - 1 ? "border-b-0" : "border-b"}`}
                >
                  <h5 className="text-dark dark:text-white">
                    Transaction {transaction.id}
                  </h5>
                </td>
                <td
                  className={`border-[#eee] px-4 py-4 dark:border-dark-3 ${index === filteredTransactions.length - 1 ? "border-b-0" : "border-b"}`}
                >
                  <p
                    className={`inline-flex rounded-full px-3.5 py-1 text-body-sm font-medium ${
                      transaction.trxType === "in"
                        ? "bg-[#219653]/[0.08] text-[#219653]"
                        : "bg-[#D34053]/[0.08] text-[#D34053]"
                    }`}
                  >
                    {transaction.trxType === "in" ? "Masuk" : "Keluar"}
                  </p>
                </td>
                <td
                  className={`border-[#eee] px-4 py-4 dark:border-dark-3 ${index === filteredTransactions.length - 1 ? "border-b-0" : "border-b"}`}
                >
                  <p className="text-dark dark:text-white">
                    {new Date(transaction.date).toLocaleDateString()}
                  </p>
                </td>
                <td
                  className={`border-[#eee] px-4 py-4 dark:border-dark-3 xl:pr-7.5 ${index === filteredTransactions.length - 1 ? "border-b-0" : "border-b"}`}
                >
                  <div className="flex items-center justify-end space-x-3.5">
                    <button 
                      className="hover:text-primary"
                    >
                      <Link href={`transactionsreports/${transaction.id}`}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="lucide lucide-eye"
                        >
                          <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
                          <circle cx="12" cy="12" r="3" />
                        </svg>
                      </Link>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionsTable;