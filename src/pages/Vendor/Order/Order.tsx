import DataTable from "react-data-table-component";
import { useState } from "react";
import { useGetAllOrdersByVendorsQuery } from "../../../service/product";
import { ChevronDown, MoreVertical } from "@icons";
import Navbar from "../../../components/Navbar/Navbar";
import { selectAuth } from "../../../store/slice/authSlice";
import { useAppSelector } from "../../../hooks";
import { toast } from "react-toastify";
import { useUpdateOrderStatusMutation } from "../../../service/admin";
import RowActionsMenu from "../../../components/ui/RowActionsMenu";
import OrderDetailsModal from "../../../components/Order/OrderDetailsModal";
import type { Order } from "../../../interfaces/Order";
import UpdateOrderStatusModal from "../../../components/Order/UpdateOrderStatusModal";
import { Input } from "../../../components/ui/input";
import { tableCustomStyles } from "../../../util";

// Remove the inline modal block and keep export clean
function OrderPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [dateFilter, setDateFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [showModal, setShowModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
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
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleViewOrder = (order: Order) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

  const handleUpdateOrder = (order: Order) => {
    setSelectedOrder(order);
    setUpdateModal(true);
  };

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

  const filteredOrders: Order[] | undefined = data?.data?.filter(
    (order: Order) => {
      const matchesSearch = order?.id; // keep your current rule
      const dateRange = getDateRange();
      const orderDate = new Date(order.date || order.createdAt);
      const matchesDate = !dateRange || orderDate >= dateRange;
      const matchesStatus =
        statusFilter === "ALL" || order.status === statusFilter;
      return matchesSearch && matchesDate && matchesStatus;
    }
  );

  // Row actions dropdown state
  const [showActionMenu, setShowActionMenu] = useState(false);
  const [actionAnchorRect, setActionAnchorRect] = useState<{
    top: number;
    left: number;
    width: number;
    height: number;
  } | null>(null);

  // Calculate order statistics
  const totalOrders = filteredOrders?.length;
  const totalRevenue = (filteredOrders ?? []).reduce(
    (sum: number, order: Order) => sum + (order?.orderSubtotal ?? 0),
    0
  );
  const deliveredOrders = (filteredOrders ?? []).filter(
    (order: Order) => order.status === "Delivered"
  ).length;
  const canceledOrders = (filteredOrders ?? []).filter(
    (order: Order) => order.status === "Canceled"
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
      cell: (row: Order) => (
        <div className="relative flex justify-center items-center">
          <button
            onClick={(e) => {
              setSelectedOrder(row);
              const rect = (
                e.currentTarget as HTMLElement
              ).getBoundingClientRect();
              setActionAnchorRect({
                top: rect.bottom,
                left: rect.left,
                width: rect.width,
                height: rect.height,
              });
              setShowActionMenu(true);
            }}
            className="p-1 rounded hover:bg-gray-100"
            aria-label="More actions"
            title="More actions"
          >
            <MoreVertical size={18} className="text-greyColr" />
          </button>
        </div>
      ),
    },
  ];

  const handleOrderUpdate = async () => {
    if (!selectedOrder) return;
    try {
      const response = await updateOrderStatus({
        id: Number(selectedOrder.id),
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
  return (
    <div className="">
      <Navbar title="Order Management" subtitle="Manage your order here" />
      <div className="mx-auto flex max-w-[1500px] flex-col p-4 md:p-8 lg:p-10">
        <div>
          <div className="mb-5"><p className="text-[10px] font-bold uppercase tracking-[.2em] text-[#6F8294]">Fulfilment overview</p><h2 className="font-spaceGrotesk text-2xl font-semibold tracking-[-.03em]">Orders at a glance</h2></div>
          <div className="mb-6 grid grid-cols-2 gap-px overflow-hidden rounded-[1.5rem] border border-[#151A22]/[.07] bg-[#151A22]/[.07] lg:grid-cols-4">
            <div className="bg-[#F8F7F3] p-5 md:p-6">
              <h3 className="text-sm font-medium text-greyColr">
                Total Orders
              </h3>
              <div className="mt-3 font-spaceGrotesk text-2xl font-semibold text-[#151A22]">
                {totalOrders}
              </div>
            </div>

            <div className="bg-[#DCE4E8] p-5 md:p-6">
              <h3 className="text-sm font-medium text-greyColr">
                Total Revenue
              </h3>
              <div className="mt-3 font-spaceGrotesk text-2xl font-semibold text-[#151A22]">
                {/* ₦{totalRevenue?.toFixed(2)} */}

                {new Intl.NumberFormat("en-NG", {
                  style: "currency",
                  currency: "NGN",
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }).format(totalRevenue)}
              </div>
            </div>

            <div className="bg-[#F8F7F3] p-5 md:p-6">
              <h3 className="text-sm font-medium text-greyColr">
                Delivered Orders
              </h3>
              <div className="mt-3 font-spaceGrotesk text-2xl font-semibold text-[#151A22]">
                {deliveredOrders}
              </div>
            </div>

            <div className="bg-[#F8F7F3] p-5 md:p-6">
              <h3 className="text-sm font-medium text-greyColr">
                Canceled Orders
              </h3>
              <div className="mt-3 font-spaceGrotesk text-2xl font-semibold text-[#151A22]">
                {canceledOrders}
              </div>
            </div>
          </div>
          <div className="mb-4 flex flex-col justify-between gap-3 rounded-[1.25rem] border border-[#151A22]/[.07] bg-[#F8F7F3] p-3 md:flex-row">
            <div className="flex flex-wrap gap-4 mb-4 md:mb-0">
              <div className="w-full md:w-auto">
                <select
                  className="h-11 w-full rounded-xl border border-[#151A22]/10 bg-white px-3 text-sm outline-none focus:border-[#6F8294] focus:ring-4 focus:ring-[#6F8294]/10"
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
                  className="h-11 w-full rounded-xl border border-[#151A22]/10 bg-white px-3 text-sm outline-none focus:border-[#6F8294] focus:ring-4 focus:ring-[#6F8294]/10"
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
              <Input
                type="text"
                placeholder="Search orders..."
                className="h-11"
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
          </div>

          <div className="flex w-full flex-col overflow-hidden rounded-[1.5rem] border border-[#151A22]/[.07] bg-[#F8F7F3]">
            <DataTable
              columns={columns}
              data={filteredOrders ?? []}
              pagination
              customStyles={tableCustomStyles}
              highlightOnHover
              responsive
              sortIcon={<ChevronDown size={16} />}
            />
          </div>
          {showActionMenu && selectedOrder && (
            <RowActionsMenu
              anchorRect={actionAnchorRect}
              onClose={() => setShowActionMenu(false)}
              onView={() => {
                setShowActionMenu(false);
                handleViewOrder(selectedOrder);
              }}
              onEdit={() => {
                setShowActionMenu(false);
                handleUpdateOrder(selectedOrder);
              }}
            />
          )}
          <OrderDetailsModal
            open={showModal}
            order={selectedOrder}
            onClose={() => setShowModal(false)}
          />
          <UpdateOrderStatusModal
            open={updateModal}
            order={selectedOrder}
            status={statusOrderStatus}
            onStatusChange={setStatusOrderStatus}
            isLoading={isLoading}
            onConfirm={handleOrderUpdate}
            onClose={() => setUpdateModal(false)}
          />
        </div>
      </div>
    </div>
  );
}

export default OrderPage;
