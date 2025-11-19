import { useMemo } from "react";
// import type { ChangeEvent } from "react";
import Navbar from "../../../components/Navbar/Navbar";
import { ChevronDown } from "lucide-react";
import { tableCustomStyles } from "../../../util";
import DataTable from "react-data-table-component";
import {
  useGetVendorPayoutsQuery,
  useGetVendorReportsQuery,
  type PayoutData,
  type VendorReportData,
} from "../../../service/vendor";
import { useAppSelector } from "../../../hooks";
import { selectAuth } from "../../../store/slice/authSlice";
import Spinner from "../../../components/Spinner/Spinner";
import { useGetAllOrdersByVendorsQuery } from "../../../service/product";

const Transaction = () => {
  // const [dateFilter, setDateFilter] = useState("all");
  // const [statusFilter, setStatusFilter] = useState("ALL");
  // const [searchTerm, setSearchTerm] = useState("");

  // Get vendor info from auth state
  const { userInfo } = useAppSelector(selectAuth);
  const vendorId = userInfo?.Vendor?.id;

  // API calls
  const {
    data: payoutData,
    isLoading: isLoadingPayouts,
    error: payoutError,
  } = useGetVendorPayoutsQuery(
    { vendorId: vendorId || "" },
    {
      skip: !vendorId,
      refetchOnMountOrArgChange: true,
      refetchOnFocus: true,
      refetchOnReconnect: true,
    }
  );

  const {
    data: reportsData,
    isLoading: isLoadingReports,
    error: reportsError,
  } = useGetVendorReportsQuery(
    {},
    {
      refetchOnMountOrArgChange: true,
      refetchOnFocus: true,
      refetchOnReconnect: true,
    }
  );
  const { data } = useGetAllOrdersByVendorsQuery(userInfo?.Vendor?.id, {
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
    refetchOnReconnect: true,
  });
  // Filter vendor reports to match current vendor's business name
  const currentVendorReport = useMemo(() => {
    if (!reportsData?.data?.vendors || !userInfo?.Vendor?.businessName)
      return null;

    return reportsData.data.vendors.find(
      (vendor: VendorReportData) =>
        vendor.businessName === userInfo?.Vendor?.businessName
    );
  }, [reportsData, userInfo?.Vendor?.businessName]);

  // const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
  //   setSearchTerm(e.target.value);
  // };

  // Filter payouts based on search term and status
  // const filteredPayouts = useMemo(() => {
  //   if (!payoutData?.data) return [];

  //   return payoutData.data.filter((payout: PayoutData) => {
  //     const matchesSearch =
  //       searchTerm === "" ||
  //       payout.reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //       payout.amount.toString().includes(searchTerm);

  //     const matchesStatus =
  //       statusFilter === "ALL" || payout.status === statusFilter;

  //     return matchesSearch && matchesStatus;
  //   });
  // }, [payoutData?.data, searchTerm, statusFilter]);

  const columns = [
    {
      name: "Payment ID",
      selector: (row: PayoutData) => row.reference,
      sortable: true,
    },
    {
      name: "Date",
      selector: (row: PayoutData) => row.createdAt.slice(0, 10),
      sortable: true,
    },
    {
      name: "Amount",
      selector: (row: PayoutData) => row.amount,
      format: (row: PayoutData) =>
        `${new Intl.NumberFormat("en-NG", {
          style: "currency",
          currency: "NGN",
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }).format(row?.amount)}`,
      sortable: true,
    },
    {
      name: "View Receipt",
      cell: (row: PayoutData) => (
        <a
          href={row.receiptUrl as string}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-1 text-sm text-pryColor hover:text-secColor underline cursor-pointer"
        >
          View Receipt
        </a>
      ),
      sortable: false,
    },
    {
      name: "Status",
      selector: (row: PayoutData) => row.status,
      cell: (row: PayoutData) => (
        <span
          className={`px-2 py-1 rounded-full text-xs ${
            row.status === "PENDING"
              ? "bg-processing text-white"
              : row.status === "PAID"
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

  const totalRevenue = data?.data?.reduce(
    (sum: number, order: any) => sum + order?.orderSubtotal,
    0
  );
  const totalSalesCount = currentVendorReport?.totalOrders || 0;
  const dailyPayout = currentVendorReport?.totalEarnings || 0;
  const payoutCompleted = payoutData?.data
    ?.filter((payout: PayoutData) => payout.status === "PAID")
    .reduce((sum: number, payout: PayoutData) => sum + payout.amount, 0);

  if (isLoadingPayouts || isLoadingReports) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner />
      </div>
    );
  }

  if (payoutError || reportsError) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-red-500">
          Error loading data. Please try again later.
        </div>
      </div>
    );
  }

  return (
    <div className="">
      <Navbar
        title="Payout Management"
        subtitle="Manage your transactions here"
      />
      <div className="flex flex-col w-full">
        <div className="bg-white p-4 md:p-6 lg:p-10 rounded-lg shadow">
          <div className="flex flex-col md:flex-row justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-greyColr mb-4 md:mb-0">
              Payout
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-pryColor-Light p-4 rounded-lg">
              <h3 className="text-sm font-medium text-greyColr">
                Total Revenue Value
              </h3>
              <div className="text-2xl font-bold text-pryColor mt-2">
                {new Intl.NumberFormat("en-NG", {
                  style: "currency",
                  currency: "NGN",
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }).format(totalRevenue)}
              </div>
            </div>

            <div className="bg-secColor-Light p-4 rounded-lg">
              <h3 className="text-sm font-medium text-greyColr">
                Total Sales Count
              </h3>
              <div className="text-2xl font-bold text-secColor mt-2">
                {totalSalesCount?.toString()}
              </div>
            </div>

            <div className="bg-positive-Light p-4 rounded-lg">
              <h3 className="text-sm font-medium text-greyColr">
                Payout Completed
              </h3>
              <div className="text-2xl font-bold text-positive mt-2">
                {new Intl.NumberFormat("en-NG", {
                  style: "currency",
                  currency: "NGN",
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }).format(payoutCompleted as number)}
              </div>
            </div>

            <div className="bg-negative-Light p-4 rounded-lg">
              <h3 className="text-sm font-medium text-greyColr">
                Pending Payouts
              </h3>
              <div className="text-2xl font-bold text-negative mt-2">
                {new Intl.NumberFormat("en-NG", {
                  style: "currency",
                  currency: "NGN",
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }).format(dailyPayout as number)}
              </div>
            </div>
          </div>

          {/* <div className="flex flex-col md:flex-row justify-between mb-6">
            {/* <div className="flex flex-wrap gap-4 mb-4 md:mb-0">
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
            </div> */}

          {/* <div className="w-full md:w-64">
              <input
                type="text"
                placeholder="Search payments..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pryColor"
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
          </div> */}

          <div className="flex w-full flex-col rounded-md border">
            <DataTable
              columns={columns}
              data={payoutData?.data as PayoutData[]}
              pagination
              customStyles={tableCustomStyles}
              highlightOnHover
              responsive
              sortIcon={<ChevronDown size={16} />}
              noDataComponent={
                <div className="text-center py-4 text-gray-500">
                  No payout data available
                </div>
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transaction;
