"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import DefaultLayout from "@/components/Layouts/DefaultLaout";

interface TransactionDetail {
  id: number;
  trxId: number;
  productId: number;
  qty: number;
  totalPrice: number;
  product: {
    id: number;
    name: string;
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

const TransactionDetailPage: React.FC = () => {
  const { id } = useParams();
  const [transaction, setTransaction] = useState<Transaction | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTransaction = async () => {
      try {
        // Ambil token dari localStorage atau cookies
        const token =
          localStorage.getItem("authToken") ||
          document.cookie
            .split("; ")
            .find((row) => row.startsWith("token="))
            ?.split("=")[1];

        if (!token) {
          throw new Error("Authentication token is missing. Please login again.");
        }

        // Fetch detail transaksi berdasarkan ID
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/transactions/${id}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setTransaction(response.data);
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
        setLoading(false);
      }
    };

    fetchTransaction();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <DefaultLayout>
      <div className="p-4 sm:p-7.5 bg-white rounded-lg shadow-md dark:bg-gray-dark">
        <h1 className="text-2xl font-bold mb-6 text-dark dark:text-white">
          Detail Transaksi #{transaction?.id}
        </h1>

        {/* Informasi Transaksi */}
        <div className="mb-6">
          <p className="mb-2">
            <strong>Type:</strong>{" "}
            <span
              className={`inline-flex rounded-full px-3.5 py-1 text-body-sm font-medium ${
                transaction?.trxType === "in"
                  ? "bg-[#219653]/[0.08] text-[#219653]"
                  : "bg-[#D34053]/[0.08] text-[#D34053]"
              }`}
            >
              {transaction?.trxType === "in" ? "Masuk" : "Keluar"}
            </span>
          </p>
          <p className="mb-2">
            <strong>Date:</strong>{" "}
            {new Date(transaction?.date || "").toLocaleDateString()}
          </p>
          <p className="mb-2">
            <strong>Notes:</strong> {transaction?.notes || "No Notes"}
          </p>
        </div>

        {/* Table Detail Produk */}
        <div className="max-w-full overflow-x-auto">
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="bg-[#F7F9FC] text-left dark:bg-dark-2">
                <th className="px-4 py-4 text-dark dark:text-white">Product Name</th>
                <th className="px-4 py-4 text-dark dark:text-white">Quantity</th>
                <th className="px-4 py-4 text-dark dark:text-white">Price</th>
                <th className="px-4 py-4 text-dark dark:text-white">Total</th>
              </tr>
            </thead>
            <tbody>
              {transaction?.details.map((detail, index) => (
                <tr
                  key={detail.id}
                  className={`${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  } dark:bg-dark-3`}
                >
                  <td className="px-4 py-4 text-dark dark:text-white">
                    {detail.product.name}
                  </td>
                  <td className="px-4 py-4 text-dark dark:text-white">
                    {detail.qty}
                  </td>
                  <td className="px-4 py-4 text-dark dark:text-white">
                    Rp.{detail.product.priceSell.toFixed(2)}
                  </td>
                  <td className="px-4 py-4 text-dark dark:text-white">
                    Rp.{detail.totalPrice.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default TransactionDetailPage;
