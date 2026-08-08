import DataTable from "react-data-table-component";
import { useGetAllOrdersByVendorsQuery } from "../../service/product";
import { selectAuth } from "../../store/slice/authSlice";
import { useAppSelector } from "../../hooks";
import { tableCustomStyles } from "../../util";

const RecentOrders = () => {
  const { userInfo } = useAppSelector(selectAuth);
  const { data } = useGetAllOrdersByVendorsQuery(userInfo?.Vendor?.id, {
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
    refetchOnReconnect: true,
  });

  const recentOrders = data?.data?.slice(0, 5);

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
          className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-[.08em] ${
            row.status === "Paid"
              ? "bg-amber-100 text-amber-800"
              : row.status === "Shipped"
              ? "bg-[#DCE4E8] text-[#242B35]"
              : row.status === "Delivered"
              ? "bg-emerald-100 text-emerald-800"
              : "bg-red-100 text-red-700"
          }`}
        >
          {row.status}
        </span>
      ),
      sortable: true,
    },
  ];

  return (
    <div className="overflow-hidden rounded-[1.75rem] border border-[#151A22]/[0.07] bg-[#F8F7F3]">
      <div className="flex w-full flex-col overflow-hidden">
        <DataTable
          columns={columns}
          data={recentOrders}
          customStyles={tableCustomStyles}
          highlightOnHover
          responsive
        />
      </div>
    </div>
  );
};

export default RecentOrders;
