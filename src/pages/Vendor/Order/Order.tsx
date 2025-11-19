import DataTable from "react-data-table-component";
import { useState } from "react";
import { useGetAllOrdersByVendorsQuery } from "../../../service/product";
import { Eye, ChevronDown, Edit } from "lucide-react";
import Navbar from "../../../components/Navbar/Navbar";
import { selectAuth } from "../../../store/slice/authSlice";
import { useAppSelector } from "../../../hooks";
import { toast } from "react-toastify";
import { useUpdateOrderStatusMutation } from "../../../service/admin";
import Spinner from "../../../components/Spinner/Spinner";
const Order = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [dateFilter, setDateFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [showModal, setShowModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<any>();
  const [updateModal, setUpdateModal] = useState(false);
  const { userInfo } = useAppSelector(selectAuth);
  const [updateOrderStatus, { isLoading }] = useUpdateOrderStatusMutation();
  const [statusOrderStatus, setStatusOrderStatus] = useState("");
  const { data, refetch } = useGetAllOrdersByVendorsQuery(
    userInfo?.Vendor?.id,
    {
      refetchOnMountOrArgChange: true,
      refetchOnFocus: true,
      refetchOnReconnect: true,
    }
  );
  const handleSearch = (e: any) => {
    setSearchTerm(e.target.value);
  };

  const handleViewOrder = (order: any) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

  const handleUpdateOrder = (order: any) => {
    setSelectedOrder(order);
    setUpdateModal(true);
  };

  console.log(data);
  // const handleExportData = () => {
  //   console.log("Exporting order data...");
  //   // In a real application, this would generate a CSV/Excel file with the orders
  //   alert("Orders exported successfully!");
  // };

  // Get date range for filtering
  const getDateRange = () => {
    const today = new Date();
    const thirtyDaysAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
    const ninetyDaysAgo = new Date(today.getTime() - 90 * 24 * 60 * 60 * 1000);

    switch (dateFilter) {
      case "last30":
        return thirtyDaysAgo;
      case "last90":
        return ninetyDaysAgo;
      default:
        return null;
    }
  };

  const filteredOrders = data?.data?.filter((order: any) => {
    const matchesSearch =
      // order?.id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order?.id;
    // Date filtering
    const dateRange = getDateRange();
    const orderDate = new Date(order.date);
    const matchesDate = !dateRange || orderDate >= dateRange;

    // Status filtering
    const matchesStatus =
      statusFilter === "ALL" || order.status === statusFilter;

    return matchesSearch && matchesDate && matchesStatus;
  });

  // Calculate order statistics
  const totalOrders = filteredOrders?.length;
  const totalRevenue = filteredOrders?.reduce(
    (sum: number, order: any) => sum + order?.orderSubtotal,
    0
  );

  const deliveredOrders = filteredOrders?.filter(
    (order: any) => order.status === "Delivered"
  ).length;
  const canceledOrders = filteredOrders?.filter(
    (order: any) => order.status === "Canceled"
  ).length;

  const columns = [
    {
      name: "Order ID",
      selector: (row: any) => `ORD-${row.id}`,
      sortable: true,
    },

    {
      name: "Date",
      selector: (row: any) => row.createdAt.slice(0, 10),
      sortable: true,
    },
    {
      name: "Total",
      selector: (row: any) => row.orderSubtotal,
      format: (row: any) =>
        `${new Intl.NumberFormat("en-NG", {
          style: "currency",
          currency: "NGN",
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }).format(row?.orderSubtotal)}`,
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
    {
      name: "Actions",
      cell: (row: any) => (
        <div className="flex gap-2">
          <button
            onClick={() => handleViewOrder(row)}
            className="px-3 py-1 bg-pryColor-Light text-pryColor rounded-md flex items-center hover:bg-pryColor hover:text-white"
          >
            <Eye size={16} className="mr-1" />
            {/* <span>View</span> */}
          </button>
          <button
            onClick={() => handleUpdateOrder(row)}
            className="px-3 py-1 bg-pryColor-Light text-pryColor rounded-md flex items-center hover:bg-pryColor hover:text-white"
          >
            <Edit size={16} />
            {/* <span>Update</span> */}
          </button>
        </div>
      ),
    },
  ];

  const customStyles = {
    rows: {
      style: {
        minHeight: "60px",
      },
    },
    headCells: {
      style: {
        paddingLeft: "8px",
        paddingRight: "8px",
        fontWeight: "bold",
        fontSize: "0.9rem",
        color: "#352F36",
      },
    },
    cells: {
      style: {
        paddingLeft: "8px",
        paddingRight: "8px",
      },
    },
  };

  const handleOrderUpdate = async () => {
    try {
      const response = await updateOrderStatus({
        id: selectedOrder.id,
        body: { status: statusOrderStatus },
      });
      toast.success(response?.data?.message);
      refetch();
      setUpdateModal(false);
    } catch (error: any) {
      console.log(error);
      toast.error(error?.data?.message);
    }
  };
  console.log(data);
  console.log(selectedOrder, "checking order");
  return (
    <div className="">
      <Navbar title="Product Management" subtitle="Manage your products here" />
      <div className="flex flex-col w-full">
        <div className="bg-white p-4 md:p-6 lg:p-10 rounded-lg shadow">
          <div className="flex flex-col md:flex-row justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-greyColr mb-4 md:mb-0">
              Order Overview
            </h2>

            {/* <div className="flex items-center">
              <button
                onClick={handleExportData}
                className="px-4 py-2 bg-pryColor text-white rounded-md flex items-center hover:bg-opacity-90 mr-4"
              >
                <FileDown size={16} className="mr-2" />
                <span>Export Data</span>
              </button>

              <a
                href="#"
                className="px-4 py-2 bg-secColor text-white rounded-md flex items-center hover:bg-opacity-90"
              >
                <TrendingUp size={16} className="mr-2" />
                <span>Sales Report</span>
              </a>
            </div> */}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-pryColor-Light p-4 rounded-lg">
              <h3 className="text-sm font-medium text-greyColr">
                Total Orders
              </h3>
              <div className="text-2xl font-bold text-pryColor mt-2">
                {totalOrders}
              </div>
            </div>

            <div className="bg-secColor-Light p-4 rounded-lg">
              <h3 className="text-sm font-medium text-greyColr">
                Total Revenue
              </h3>
              <div className="text-2xl font-bold text-secColor mt-2">
                {/* ₦{totalRevenue?.toFixed(2)} */}

                {new Intl.NumberFormat("en-NG", {
                  style: "currency",
                  currency: "NGN",
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }).format(totalRevenue)}
              </div>
            </div>

            <div className="bg-positive-Light p-4 rounded-lg">
              <h3 className="text-sm font-medium text-greyColr">
                Delivered Orders
              </h3>
              <div className="text-2xl font-bold text-positive mt-2">
                {deliveredOrders}
              </div>
            </div>

            <div className="bg-negative-Light p-4 rounded-lg">
              <h3 className="text-sm font-medium text-greyColr">
                Canceled Orders
              </h3>
              <div className="text-2xl font-bold text-negative mt-2">
                {canceledOrders}
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
                placeholder="Search orders..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pryColor"
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
          </div>

          <div className="flex w-full flex-col rounded-md border">
            <DataTable
              columns={columns}
              data={filteredOrders}
              pagination
              customStyles={customStyles}
              highlightOnHover
              responsive
              sortIcon={<ChevronDown size={16} />}
            />
          </div>

          {/* Order Detail Modal */}
          {showModal && selectedOrder && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded-lg w-[90%] md:w-full max-w-3xl">
                {/* Header */}
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-greyColr">
                      Order Details
                    </h3>
                    <p className="text-xs text-lightGreyColor mt-1">
                      Placed:{" "}
                      {new Date(selectedOrder.createdAt).toLocaleString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        selectedOrder.status === "Pending"
                          ? "bg-processing text-white"
                          : selectedOrder.status === "Paid"
                          ? "bg-pryColor text-white"
                          : selectedOrder.status === "Shipped"
                          ? "bg-secColor text-white"
                          : selectedOrder.status === "Delivered"
                          ? "bg-positive text-white"
                          : "bg-negative text-white"
                      }`}
                    >
                      {selectedOrder.status}
                    </span>
                    <button
                      onClick={() => setShowModal(false)}
                      className="text-gray-400 hover:text-gray-600"
                      aria-label="Close"
                    >
                      ✕
                    </button>
                  </div>
                </div>

                {/* Overview */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="border rounded-md p-3">
                    <p className="text-xs text-lightGreyColor">Customer</p>
                    <p className="font-semibold">
                      {selectedOrder.User?.fullName ||
                        selectedOrder.userFullName}
                    </p>
                  </div>
                  <div className="border rounded-md p-3">
                    <p className="text-xs text-lightGreyColor mt-1">
                      {selectedOrder.User?.email || ""}
                    </p>
                    <p className="text-xs text-lightGreyColor mt-1">
                      {selectedOrder.User?.phoneNumber || ""}
                    </p>
                    <p className="text-xs text-lightGreyColor mt-1 line-clamp-2">
                      {selectedOrder.User?.address || ""}
                    </p>
                  </div>
                </div>

                {/* Items */}
                <div className="mb-6">
                  <h4 className="text-md font-semibold mb-2">
                    Items ({selectedOrder.items?.length || 0})
                  </h4>
                  <div className="space-y-3">
                    {selectedOrder.items?.map((item: any) => {
                      const unitPrice = item.price || item.product?.price || 0;
                      const lineTotal = unitPrice * (item.quantity || 0);
                      const thumb = item.product?.thumbnails?.[0]
                        ? String(item.product.thumbnails[0]).replace(
                            /[`"\s]/g,
                            ""
                          )
                        : null;
                      const itemReviews = (item.product?.reviews || []).filter(
                        (r: any) => r.orderId === selectedOrder.id
                      );
                      return (
                        <div key={item.id} className="border rounded-md p-3">
                          <div className="flex items-start gap-3">
                            {thumb && (
                              <img
                                src={thumb}
                                alt={item.product?.name || item.productName}
                                className="w-16 h-16 rounded object-cover border"
                              />
                            )}
                            <div className="flex-1">
                              <div className="flex justify-between">
                                <p className="font-medium text-greyColr">
                                  {item.product?.name || item.productName}
                                </p>
                                <p className="font-semibold">
                                  {new Intl.NumberFormat("en-NG", {
                                    style: "currency",
                                    currency: "NGN",
                                  }).format(lineTotal)}
                                </p>
                              </div>
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm text-lightGreyColor mt-1">
                                {/* Product ID hidden as requested */}
                                <span>Qty: {item.quantity}</span>
                                <span>Size: {item.size}</span>
                                <span>Color: {item.color}</span>
                                <span className="col-span-2">
                                  Unit Price:{" "}
                                  {new Intl.NumberFormat("en-NG", {
                                    style: "currency",
                                    currency: "NGN",
                                  }).format(unitPrice)}
                                </span>
                              </div>

                              {/* Reviews tied to this order */}
                              {itemReviews.length > 0 && (
                                <div className="mt-3 bg-secColor-Light/30 rounded p-2">
                                  <p className="text-sm font-semibold text-greyColr">
                                    Review
                                  </p>
                                  {itemReviews.map((rev: any) => (
                                    <div
                                      key={rev.id}
                                      className="text-sm text-lightGreyColor mt-1"
                                    >
                                      <p>Rating: {rev.rating}/5</p>
                                      <p className="mt-1">{rev.review}</p>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Financial Summary */}
                <div className="border-t border-gray-200 pt-4">
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-lightGreyColor">
                        Order Subtotal
                      </span>
                      <span className="font-medium">
                        {new Intl.NumberFormat("en-NG", {
                          style: "currency",
                          currency: "NGN",
                        }).format(selectedOrder.orderSubtotal || 0)}
                      </span>
                    </div>
                    {/* Delivery Fee hidden as requested */}
                    <div className="flex justify-between">
                      <span className="text-lightGreyColor">Service Fee</span>
                      <span className="font-medium">
                        {new Intl.NumberFormat("en-NG", {
                          style: "currency",
                          currency: "NGN",
                        }).format(selectedOrder.serviceFee || 0)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-semibold">Total</span>
                      <span className="font-bold">
                        {new Intl.NumberFormat("en-NG", {
                          style: "currency",
                          currency: "NGN",
                        }).format(selectedOrder.totalAmount || 0)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-6 flex justify-end space-x-3">
                  <button
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md text-lightGreyColor hover:bg-gray-100"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => {
                      console.log("Print order", selectedOrder);
                      alert(`Printing order ${selectedOrder.id}`);
                    }}
                    className="px-4 py-2 bg-pryColor text-white rounded-md hover:bg-opacity-90"
                  >
                    Print Order
                  </button>
                </div>
              </div>
            </div>
          )}

          {updateModal && selectedOrder && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded-lg w-full max-w-80">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-greyColr">
                    Update Order Status
                  </h3>
                  <button
                    onClick={() => setUpdateModal(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    ✕
                  </button>
                </div>

                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pryColor"
                  value={statusOrderStatus}
                  onChange={(e) => setStatusOrderStatus(e.target.value)}
                >
                  <option value="" disabled>
                    Select Status
                  </option>
                  <option value="Shipped">Shipped</option>
                  <option value="Canceled">Canceled</option>
                </select>

                <div className="mt-6 flex justify-end space-x-3">
                  <button
                    onClick={() => setUpdateModal(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md text-lightGreyColor hover:bg-gray-100"
                  >
                    Close
                  </button>
                  <button
                    onClick={handleOrderUpdate}
                    className="px-4 py-2 bg-pryColor text-white rounded-md hover:bg-opacity-90"
                  >
                    {isLoading ? <Spinner /> : "Update"}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Order;
