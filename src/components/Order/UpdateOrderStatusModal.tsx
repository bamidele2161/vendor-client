import type { Order } from "../../interfaces/Order";
import Spinner from "../Spinner/Spinner";

interface UpdateOrderStatusModalProps {
  open: boolean;
  order: Order | null;
  status: string;
  onStatusChange: (v: string) => void;
  isLoading?: boolean;
  onConfirm: () => void;
  onClose: () => void;
}

export default function UpdateOrderStatusModal({
  open,
  order,
  status,
  onStatusChange,
  isLoading,
  onConfirm,
  onClose,
}: UpdateOrderStatusModalProps) {
  if (!open || !order) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-80">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-greyColr">
            Update Order Status
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <div className="mb-4">
          <p className="text-sm text-lightGreyColor">Order</p>
          <p className="font-medium">ORD-{order.id}</p>
        </div>

        <label className="block text-sm font-medium text-lightGreyColor mb-1">
          New Status
        </label>
        <select
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pryColor"
          value={status}
          onChange={(e) => onStatusChange(e.target.value)}
        >
          <option value="">Select status</option>
          {/* <option value="Pending">Pending</option>
          <option value="Paid">Paid</option> */}
          <option value="Shipped">Shipped</option>
          {/* <option value="Delivered">Delivered</option>
          <option value="Canceled">Canceled</option> */}
        </select>

        <div className="mt-6 flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md text-lightGreyColor hover:bg-gray-100"
          >
            Close
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-pryColor text-white rounded-md hover:bg-opacity-90 disabled:opacity-50"
            disabled={!status || isLoading}
          >
            {isLoading ? <Spinner /> : "Update"}
          </button>
        </div>
      </div>
    </div>
  );
}
