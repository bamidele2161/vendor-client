import type { Order } from "../../interfaces/Order";
import { X, User, Mail, Phone, MapPin, Receipt, Package2 } from "lucide-react";

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
  const formatCurrency = new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
  }).format;

  const statusStyles =
    order.status === "Pending"
      ? "bg-processing text-white"
      : order.status === "Paid"
      ? "bg-pryColor text-white"
      : order.status === "Shipped"
      ? "bg-secColor text-white"
      : order.status === "Delivered"
      ? "bg-positive text-white"
      : "bg-negative text-white";

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-xl w-full max-w-4xl shadow-lg">
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-pryColor-Light flex items-center justify-center">
              <Receipt className="h-5 w-5 text-pryColor" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-greyColr">
                Order Details
              </h3>
              <p className="text-xs text-lightGreyColor">
                Placed {new Date(order.createdAt).toLocaleString()}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span
              className={`inline-flex items-center gap-2 px-2 py-1 rounded-full text-xs ${statusStyles}`}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-white/80" />
              {order.status}
            </span>
            <button
              onClick={onClose}
              className="p-2 rounded hover:bg-gray-100"
              aria-label="Close"
              title="Close"
            >
              <X className="h-4 w-4 text-lightGreyColor" />
            </button>
          </div>
        </div>

        <div className="px-6 py-5">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="rounded-lg border p-4">
              <p className="text-xs text-lightGreyColor">Order</p>
              <div className="mt-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Package2 className="h-4 w-4 text-pryColor" />
                  <span className="text-sm text-lightGreyColor">ID</span>
                </div>
                <span className="font-semibold text-greyColr">{order.id}</span>
              </div>
              <div className="mt-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Receipt className="h-4 w-4 text-pryColor" />
                  <span className="text-sm text-lightGreyColor">Date</span>
                </div>
                <span className="text-sm font-medium text-greyColr">
                  {new Date(order.createdAt).toLocaleString()}
                </span>
              </div>
            </div>
            <div className="rounded-lg border p-4 md:col-span-2">
              <p className="text-xs text-lightGreyColor">Customer</p>
              <div className="flex justify-between">
                <div className="mt-2 flex flex-col gap-3">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-pryColor" />
                    <span className="font-semibold text-greyColr">
                      {order.User?.fullName || "—"}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 lg:col-span-1 sm:col-span-2">
                    <MapPin className="h-4 w-4 text-pryColor" />
                    <span className="text-sm text-lightGreyColor line-clamp-1">
                      {order.User?.address || "—"}
                    </span>
                  </div>
                </div>
                <div className="mt-2 flex flex-col gap-3">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-pryColor" />
                    <span className="text-sm text-lightGreyColor">
                      {order.User?.email || "—"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-pryColor" />
                    <span className="text-sm text-lightGreyColor">
                      {order.User?.phoneNumber || "—"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <h4 className="text-md font-semibold mb-3">
              Items ({items.length})
            </h4>
            <div className="space-y-3">
              {items.map((item) => {
                console.log(items, "Emmanuel");
                const unitPrice = item.price || item.product?.price || 0;
                const lineTotal = unitPrice * (item.quantity || 0);
                const thumb = item.product?.thumbnails?.[0];

                return (
                  <div key={item.id} className="rounded-lg border p-3">
                    <div className="flex items-start gap-4">
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
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <p className="font-medium text-greyColr">
                            {item.product?.name || item.productName}
                          </p>
                          <p className="font-semibold">
                            {formatCurrency(lineTotal)}
                          </p>
                        </div>
                        <div className="mt-2 flex flex-wrap gap-2">
                          <span className="inline-flex items-center rounded-full bg-pryColor-Light px-2 py-1 text-xs text-pryColor">
                            Qty: {item.quantity ?? 0}
                          </span>
                          {item.size && (
                            <span className="inline-flex items-center rounded-full bg-secColor-Light px-2 py-1 text-xs text-greyColr">
                              Size: {item.size}
                            </span>
                          )}
                          {item.color && (
                            <span className="inline-flex items-center rounded-full bg-pryColor-Lighter px-2 py-1 text-xs text-greyColr">
                              Color: {item.color}
                            </span>
                          )}
                          <span className="inline-flex items-center rounded-full bg-positive-Light px-2 py-1 text-xs text-greyColr">
                            Unit: {formatCurrency(unitPrice)}
                          </span>
                        </div>

                        {(item.product?.reviews || [])
                          .filter((r) => r.orderId === order.id)
                          .map((rev) => (
                            <div
                              key={rev.id}
                              className="mt-3 bg-secColor-Light/40 rounded p-2"
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

          <div className="mt-6 rounded-lg border p-4 flex justify-end">
            <div className="flex items-center justify-between gap-6">
              <span className="text-lightGreyColor">Subtotal</span>
              <span className="font-medium">
                {formatCurrency(order.orderSubtotal || 0)}
              </span>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 px-6 py-4 border-t">
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
