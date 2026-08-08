import React from "react";
import { Edit2, Trash2 } from "lucide-react";
import DataTable from "react-data-table-component";
import { tableCustomStyles } from "../../util";

interface Coupon {
  id: string;
  code: string;
  type: string;
  value: number;
  minPurchase: number;
  startDate: string;
  endDate: string;
  usageLimit: number;
  usedCount: number;
  status: string;
  products: string[];
  description: string;
}

interface CouponListProps {
  coupons: Coupon[];
  onEdit: (coupon: Coupon) => void;
  onDelete: (id: string) => void;
}

const CouponList: React.FC<CouponListProps> = ({
  coupons,
  onEdit,
  onDelete,
}) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const columns = [
    {
      name: "Code",
      grow: 1.8,
      selector: (row: Coupon) => row.code,
      sortable: true,
      cell: (row: Coupon) => (
        <div>
          <div className="font-semibold text-[#151A22]">{row.code}</div>
          <div className="text-xs text-[#6F8294]">{row.description}</div>
        </div>
      ),
    },
    {
      name: "Discount",
      selector: (row: Coupon) => row.value,
      sortable: true,
      cell: (row: Coupon) => (
        <div>
          <div>
            {row.type === "percentage" ? `${row.value}%` : `#${row.value}`}
          </div>
          <div className="text-xs text-gray-500">
            {row.type === "percentage" ? "Percentage" : "Fixed"}
          </div>
        </div>
      ),
    },
    {
      name: "Min Purchase",
      selector: (row: Coupon) => row.minPurchase,
      sortable: true,
      cell: (row: Coupon) => `#${row.minPurchase}`,
    },
    {
      name: "Validity",
      grow: 1.8,
      selector: (row: Coupon) => row.startDate,
      sortable: true,
      cell: (row: Coupon) => (
        <div className="text-sm">
          {formatDate(row.startDate)} - {formatDate(row.endDate)}
        </div>
      ),
    },
    {
      name: "Usage",
      selector: (row: Coupon) => row.usedCount,
      sortable: true,
      cell: (row: Coupon) => (
        <div className="text-sm text-gray-500">
          {row.usedCount} / {row.usageLimit}
        </div>
      ),
    },
    {
      name: "Status",
      selector: (row: Coupon) => row.status,
      sortable: true,
      cell: (row: Coupon) => (
        <span
          className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-[.08em] ${
            row.status === "active"
              ? "bg-emerald-100 text-emerald-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {row.status.charAt(0).toUpperCase() + row.status.slice(1)}
        </span>
      ),
    },
    {
      name: "Actions",
      cell: (row: Coupon) => (
        <div className="flex gap-1">
          <button
            onClick={() => onEdit(row)}
            className="flex h-8 w-8 items-center justify-center rounded-full text-[#566170] hover:bg-[#EEF1F3] hover:text-[#151A22]"
          >
            <Edit2 size={16} />
          </button>
          <button
            onClick={() => onDelete(row.id)}
            className="flex h-8 w-8 items-center justify-center rounded-full text-red-600 hover:bg-red-50"
          >
            <Trash2 size={16} />
          </button>
        </div>
      ),
      right: true,
    },
  ];

  if (coupons.length === 0) {
    return (
      <div className="rounded-[1.5rem] border border-[#151A22]/[.07] bg-[#F8F7F3] p-10 text-center">
        <p className="text-gray-500">
          No coupons found. Create your first coupon to get started.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-[1.5rem] border border-[#151A22]/[.07] bg-[#F8F7F3]">
      <DataTable
        columns={columns}
        data={coupons}
        customStyles={tableCustomStyles}
        pagination
        responsive
        highlightOnHover
        pointerOnHover
      />
    </div>
  );
};

export default CouponList;
