import { ApexOptions } from "apexcharts";
import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import DefaultSelectOption from "./DefaultSelectOption";
import axios from "axios";

interface SelectOption {
  value: string;
  label: string;
}

interface SummaryResponse {
  totalSales: number;
  totalPurchases: number;
  profitLoss: number;
}

const TIME_RANGE_OPTIONS: SelectOption[] = [
  { value: 'year', label: 'Yearly' },
  { value: 'month', label: 'Monthly' },
  { value: 'week', label: 'Weekly' },
];

// Helper function to format numbers to IDR
const formatToIDR = (value: number): string => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

const ChartOne: React.FC = () => {
  const [timeRange, setTimeRange] = useState<string>("year");
  const [totalSales, setTotalSales] = useState<number>(0);
  const [totalPurchases, setTotalPurchases] = useState<number>(0);
  const [series, setSeries] = useState<any[]>([
    {
      name: "Penjualan",
      data: Array(12).fill(0),
    },
    {
      name: "Pembelian",
      data: Array(12).fill(0),
    },
  ]);

  useEffect(() => {
    fetchSummaryData();
  }, [timeRange]);

  const fetchSummaryData = async (): Promise<void> => {
    try {
      const token = localStorage.getItem("authToken") || document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        ?.split("=")[1];

      if (!token) {
        alert("Authentication token is missing. Please login again.");
        return;
      }

      const endDate = new Date();
      const startDate = new Date();
      if (timeRange === "year") {
        startDate.setFullYear(endDate.getFullYear() - 1);
      } else if (timeRange === "month") {
        startDate.setMonth(endDate.getMonth() - 1);
      } else {
        startDate.setDate(endDate.getDate() - 7);
      }

      const response = await axios.get<SummaryResponse>(
        `${process.env.NEXT_PUBLIC_API_URL}/reports/summary`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            startDate: startDate.toISOString(),
            endDate: endDate.toISOString(),
          },
        }
      );

      const { totalSales, totalPurchases } = response.data;
      setTotalSales(totalSales);
      setTotalPurchases(totalPurchases);

      // For demonstration, distribute the totals across months
      const monthlyAvgSales = totalSales / 12;
      const monthlyAvgPurchases = totalPurchases / 12;

      setSeries([
        {
          name: "Penjualan",
          data: Array(12).fill(monthlyAvgSales),
        },
        {
          name: "Pembelian",
          data: Array(12).fill(monthlyAvgPurchases),
        },
      ]);
    } catch (error) {
      console.error("Error fetching summary data:", error);
    }
  };

  const handleTimeRangeChange = (value: string): void => {
    setTimeRange(value);
  };

  const options: ApexOptions = {
    legend: {
      show: false,
      position: "top",
      horizontalAlign: "left",
    },
    colors: ["#5750F1", "#0ABEF9"],
    chart: {
      fontFamily: "Satoshi, sans-serif",
      height: 310,
      type: "area",
      toolbar: {
        show: false,
      },
    },
    fill: {
      type: 'gradient',
      gradient: {
        opacityFrom: 0.55,
        opacityTo: 0,
      },
    },
    responsive: [
      {
        breakpoint: 1024,
        options: {
          chart: {
            height: 300,
          },
        },
      },
      {
        breakpoint: 1366,
        options: {
          chart: {
            height: 320,
          },
        },
      },
    ],
    stroke: {
      width: 2,
      curve: "smooth",
    },
    markers: {
      size: 0,
    },
    grid: {
      strokeDashArray: 5,
      xaxis: {
        lines: {
          show: false,
        },
      },
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: (value: number) => {
          return formatToIDR(value);
        },
      },
    },
    xaxis: {
      type: "category",
      categories: [
        "Sep", "Oct", "Nov", "Dec", "Jan", "Feb",
        "Mar", "Apr", "May", "Jun", "Jul", "Aug",
      ],
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      labels: {
        formatter: (value: number) => {
          // Abbreviate large numbers for y-axis labels
          if (value >= 1000000000) {
            return formatToIDR(value / 1000000000) + ' M';
          } else if (value >= 1000000) {
            return formatToIDR(value / 1000000) + ' Jt';
          }
          return formatToIDR(value);
        },
      },
    },
  };

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-dark-3 dark:bg-gray-dark dark:shadow-card sm:px-7.5">
      <div className="flex flex-wrap items-start justify-between gap-3 sm:flex-nowrap">
        <div className="flex w-full flex-wrap gap-3 sm:gap-5">
          <div className="flex min-w-47.5">
            <span className="mt-1 mr-2 flex h-4 w-full max-w-4 items-center justify-center rounded-full border-2 border-primary">
              <span className="block h-2.5 w-full max-w-2.5 rounded-full bg-primary"></span>
            </span>
            <div className="w-full">
              <p className="font-semibold text-primary">Ringkasan Keuangan</p>
            </div>
          </div>
        </div>
        <div className="flex w-full max-w-45 justify-end">
          <DefaultSelectOption 
            options={TIME_RANGE_OPTIONS}
            value={timeRange}
            onChange={handleTimeRangeChange}
          />
        </div>
      </div>

      <div className="mb-2">
        <div id="chartOne" className="-ml-5">
          <ReactApexChart
            options={options}
            series={series}
            type="area"
            height={350}
          />
        </div>
      </div>

      <div className="flex flex-wrap items-start justify-between gap-3 sm:flex-nowrap">
        <div className="flex w-full flex-wrap gap-3 sm:gap-5">
          <div className="flex min-w-47.5">
            <span className="mt-1 mr-2 flex h-4 w-full max-w-4 items-center justify-center rounded-full border-2 border-primary">
              <span className="block h-2.5 w-full max-w-2.5 rounded-full bg-primary"></span>
            </span>
            <div className="w-full">
              <p className="font-semibold text-primary">Total Penjualan</p>
              <p className="text-sm font-medium">{formatToIDR(totalSales)}</p>
            </div>
          </div>
          <div className="flex min-w-47.5">
            <span className="mt-1 mr-2 flex h-4 w-full max-w-4 items-center justify-center rounded-full border-2 border-secondary">
              <span className="block h-2.5 w-full max-w-2.5 rounded-full bg-secondary"></span>
            </span>
            <div className="w-full">
              <p className="font-semibold text-secondary">Total Pembelian</p>
              <p className="text-sm font-medium">{formatToIDR(totalPurchases)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChartOne;