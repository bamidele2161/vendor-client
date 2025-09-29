import { useState } from "react";
import Navbar from "../../../components/Navbar/Navbar";
import { ChevronDown } from "lucide-react";
import { tableCustomStyles } from "../../../util";
import DataTable from "react-data-table-component";
import { useGetTransactionsQuery } from "../../../service/product";

const Transaction = () => {
  const [dateFilter, setDateFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [searchTerm, setSearchTerm] = useState("");
  const { data } = useGetTransactionsQuery(1);

  console.log(data);
  const handleSearch = (e: any) => {
    setSearchTerm(e.target.value);
  };

  const columns = [
    {
      name: "Payment ID",
      selector: (row: any) => `PAY-${row.paymentReference}`,
      sortable: true,
    },

    {
      name: "Date",
      selector: (row: any) => row.createdAt.slice(0, 10),
      sortable: true,
    },
    {
      name: "Amount",
      selector: (row: any) => row.amount,
      format: (row: any) => `₦${row.amount?.toFixed(2)}`,
      sortable: true,
    },
    {
      name: "Credit Account",
      selector: (row: any) => row.account,
      format: (row: any) => row.account,
      sortable: true,
    },
    {
      name: "Status",
      selector: (row: any) => row.status,
      cell: (row: any) => (
        <span
          className={`px-2 py-1 rounded-full text-xs ${
            row.status === "Pending"
              ? "bg-processing text-white"
              : row.status === "Paid"
              ? "bg-pryColor text-white"
              : row.status === "Shipped"
              ? "bg-secColor text-white"
              : row.status === "Delivered"
              ? "bg-positive text-white"
              : "bg-negative text-white"
          }`}
        >
          {row.status}
        </span>
      ),
      sortable: true,
    },
  ];

  return (
    <div className="">
      <Navbar
        title="Transaction Management"
        subtitle="Manage your transactions here"
      />

      <div className="flex flex-col w-full">
        <div className="bg-white p-10 rounded-lg shadow">
          <div className="flex flex-col md:flex-row justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-greyColr mb-4 md:mb-0">
              Payout
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-pryColor-Light p-4 rounded-lg">
              <h3 className="text-sm font-medium text-greyColr">
                Total Payout Value
              </h3>
              <div className="text-2xl font-bold text-pryColor mt-2"> ₦1M</div>
            </div>

            <div className="bg-secColor-Light p-4 rounded-lg">
              <h3 className="text-sm font-medium text-greyColr">
                Total Sales Count
              </h3>
              <div className="text-2xl font-bold text-secColor mt-2">500</div>
            </div>

            <div className="bg-positive-Light p-4 rounded-lg">
              <h3 className="text-sm font-medium text-greyColr">
                Payout Completed
              </h3>
              <div className="text-2xl font-bold text-positive mt-2">
                ₦29,000.00
              </div>
            </div>

            <div className="bg-negative-Light p-4 rounded-lg">
              <h3 className="text-sm font-medium text-greyColr">
                Pending Payouts
              </h3>
              <div className="text-2xl font-bold text-negative mt-2">
                ₦500,000.00
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between mb-6">
            <div className="flex flex-wrap gap-4 mb-4 md:mb-0">
              <div className="w-full md:w-auto">
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pryColor"
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                >
                  <option value="all">All Time</option>
                  <option value="last30">Last 30 Days</option>
                  <option value="last90">Last 90 Days</option>
                </select>
              </div>

              <div className="w-full md:w-auto">
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pryColor"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="ALL">All Statuses</option>
                  <option value="Pending">Pending</option>
                  <option value="Paid">Paid</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Canceled">Canceled</option>
                </select>
              </div>
            </div>

            <div className="w-full md:w-64">
              <input
                type="text"
                placeholder="Search payments..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pryColor"
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
          </div>

          <div className="flex w-full flex-col rounded-md border">
            <DataTable
              columns={columns}
              data={data?.data || []}
              pagination
              customStyles={tableCustomStyles}
              highlightOnHover
              responsive
              sortIcon={<ChevronDown size={16} />}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transaction;
