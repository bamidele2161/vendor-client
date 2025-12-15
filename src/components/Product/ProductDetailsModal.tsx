import type { Product } from "../../interfaces/Product";

interface ProductDetailsModalProps {
  open: boolean;
  product: Product | null;
  action: "view" | "approve" | "reject";
  rejectionReason: string;
  onClose: () => void;
  onEdit: (product: Product) => void;
  onSubmitAction: () => void;
  onChangeRejectionReason: (value: string) => void;
}

export default function ProductDetailsModal({
  open,
  product,
  action,
  rejectionReason,
  onClose,
  onEdit,
  onSubmitAction,
  onChangeRejectionReason,
}: ProductDetailsModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-[90%] md:w-full max-w-2xl">
        <h3 className="text-lg font-semibold mb-4 text-greyColr">
          {action === "view"
            ? "Product Details"
            : action === "approve"
            ? "Approve Product"
            : "Reject Product"}
        </h3>

        <div className="mb-4">
          <div className="flex justify-center items-center w-full mb-4">
            {product?.thumbnails?.[0] && (
              <img
                src={product.thumbnails[0]}
                alt="Product Image"
                className="w-32 h-32 object-cover rounded"
              />
            )}
          </div>

          <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="mb-2">
                <span className="font-semibold">Product:</span> {product?.name}
              </p>
            </div>
            <div>
              <p className="mb-2">
                <span className="font-semibold">Price:</span> {product?.price}
              </p>
            </div>
            <div>
              <p className="mb-2">
                <span className="font-semibold">Category:</span>{" "}
                {product?.subCategoryItemName}
              </p>
            </div>
            <div>
              <p className="mb-2">
                <span className="font-semibold">Stock:</span> {product?.stock}
              </p>
            </div>

            <div className="md:col-span-2">
              <p className="mb-2">
                <span className="font-semibold">Description:</span>{" "}
                {product?.description}
              </p>
            </div>
            <div>
              <p className="mb-2">
                <span className="font-semibold">Views:</span> {product?.views}
              </p>
            </div>
            <div>
              <p className="mb-2 flex gap-2">
                <span className="font-semibold">Status:</span>{" "}
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold w-20 md:w-32 ${
                    product?.status === "Active"
                      ? "bg-green-100 text-green-700"
                      : "bg-orange-100 text-orange-700"
                  }`}
                >
                  {product?.status === "Active"
                    ? "Pending Approval"
                    : product?.status}
                </span>
              </p>
            </div>
            <div>
              <p className="mb-2">
                <span className="font-semibold">Material:</span>{" "}
                {product?.material}
              </p>
            </div>
            <div>
              <p className="mb-2">
                <span className="font-semibold">Posted On :</span>{" "}
                {product?.createdAt?.slice(0, 10)}
              </p>
            </div>
          </div>
        </div>

        {action === "reject" && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-lightGreyColor mb-1">
              Rejection Reason
            </label>
            <textarea
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pryColor"
              rows={3}
              value={rejectionReason}
              onChange={(e) => onChangeRejectionReason(e.target.value)}
              placeholder="Please provide a reason for rejection..."
            />
          </div>
        )}

        {action !== "view" && (
          <p className="mb-6 text-sm text-lightGreyColor">
            {action === "approve"
              ? "Approving this product will make it visible to customers on the marketplace."
              : "The rejection reason will be sent to the vendor via email."}
          </p>
        )}

        <div className="flex justify-end space-x-3">
          <button
            onClick={() => product && onEdit(product)}
            className="px-4 py-2 border rounded-md text-white hover:bg-secColor bg-pryColor"
          >
            {action === "view" ? "Edit" : "Cancel"}
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md text-lightGreyColor hover:bg-gray-100"
          >
            {action === "view" ? "Close" : "Cancel"}
          </button>
          {action !== "view" && (
            <button
              onClick={onSubmitAction}
              className={`px-4 py-2 rounded-md text-white ${
                action === "approve"
                  ? "bg-positive hover:bg-opacity-90"
                  : "bg-negative hover:bg-opacity-90"
              }`}
              disabled={action === "reject" && !rejectionReason.trim()}
            >
              {action === "approve" ? "Approve Product" : "Reject Product"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
