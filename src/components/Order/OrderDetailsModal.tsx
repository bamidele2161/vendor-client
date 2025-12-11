import type { Order } from "../../interfaces/Order";

interface OrderDetailsModalProps {
  open: boolean;
  order: Order | null;
  onClose: () => void;
}

export default function OrderDetailsModal({
  open,
  order,
  onClose,
}: OrderDetailsModalProps) {
  if (!open || !order) return null;

  const items = order.items || [];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-[90%] md:w-full max-w-3xl">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <div>
            <h3 className="text-lg font-semibold text-greyColr">
              Order Details
            </h3>
            <p className="text-xs text-lightGreyColor mt-1">
              Placed: {new Date(order.createdAt).toLocaleString()}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span
              className={`px-2 py-1 rounded-full text-xs ${
                order.status === "Pending"
                  ? "bg-processing text-white"
                  : order.status === "Paid"
                  ? "bg-pryColor text-white"
                  : order.status === "Shipped"
                  ? "bg-secColor text-white"
                  : order.status === "Delivered"
                  ? "bg-positive text-white"
                  : "bg-negative text-white"
              }`}
            >
              {order.status}
            </span>
            <button
              onClick={onClose}
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
            <p className="font-semibold">{order.User?.fullName}</p>
          </div>
          <div className="border rounded-md p-3">
            <p className="text-xs text-lightGreyColor mt-1">
              {order.User?.email || ""}
            </p>
            <p className="text-xs text-lightGreyColor mt-1">
              {order.User?.phoneNumber || ""}
            </p>
            <p className="text-xs text-lightGreyColor mt-1 line-clamp-2">
              {order.User?.address || ""}
            </p>
          </div>
        </div>

        {/* Items */}
        <div className="mb-6">
          <h4 className="text-md font-semibold mb-2">Items ({items.length})</h4>
          <div className="space-y-3">
            {items.map((item) => {
              const unitPrice = item.price || item.product?.price || 0;
              const lineTotal = unitPrice * (item.quantity || 0);
              const thumb = item.product?.thumbnails?.[0]
                ? String(item.product.thumbnails[0]).replace(/[`"\s]/g, "")
                : null;

              return (
                <div key={item.id} className="border rounded-md p-3">
                  <div className="flex items-start gap-3">
                    {thumb && (
                      <img
                        src={thumb}
                        alt={
                          item.product?.name || item.productName || "Product"
                        }
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

                      {/* Order-tied reviews */}
                      {(item.product?.reviews || [])
                        .filter((r) => r.orderId === order.id)
                        .map((rev) => (
                          <div
                            key={rev.id}
                            className="mt-3 bg-secColor-Light/30 rounded p-2"
                          >
                            <p className="text-sm font-semibold text-greyColr">
                              Review
                            </p>
                            <div className="text-sm text-lightGreyColor mt-1">
                              <p>Rating: {rev.rating}/5</p>
                              <p className="mt-1">{rev.review}</p>
                            </div>
                          </div>
                        ))}
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
              <span className="text-lightGreyColor">Order Subtotal</span>
              <span className="font-medium">
                {new Intl.NumberFormat("en-NG", {
                  style: "currency",
                  currency: "NGN",
                }).format(order.orderSubtotal || 0)}
              </span>
            </div>
            {/* <div className="flex justify-between">
              <span className="text-lightGreyColor">Service Fee</span>
              <span className="font-medium">
                {new Intl.NumberFormat("en-NG", {
                  style: "currency",
                  currency: "NGN",
                }).format(order.serviceFee || 0)}
              </span>
            </div> */}
            {/* <div className="flex justify-between">
              <span className="font-semibold">Total</span>
              <span className="font-bold">
                {new Intl.NumberFormat("en-NG", {
                  style: "currency",
                  currency: "NGN",
                }).format(order.totalAmount || 0)}
              </span>
            </div> */}
          </div>
        </div>

        {/* Actions */}
        <div className="mt-6 flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md text-lightGreyColor hover:bg-gray-100"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
