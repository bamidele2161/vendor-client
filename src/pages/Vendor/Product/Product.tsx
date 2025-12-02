// Function Product()
import { useState } from "react";

import Navbar from "../../../components/Navbar/Navbar";
import { useNavigate } from "react-router-dom";
import DataTable, { type TableColumn } from "react-data-table-component";
import {
  useArchiveProductMutation,
  useGetAllProductCategoryQuery,
  useGetAllVendorProductsQuery,
} from "../../../service/product";

import { ChevronDown, MoreVertical } from "lucide-react";
import { useAppSelector } from "../../../hooks";
import { selectAuth } from "../../../store/slice/authSlice";
import { toast } from "react-toastify";
import RowActionsMenu from "../../../components/ui/RowActionsMenu";
import ProductDetailsModal from "../../../components/Product/ProductDetailsModal";
import type { Product } from "../../../interfaces/Product";

const ProductPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("ALL");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [modalAction, setModalAction] = useState<"view" | "approve" | "reject">(
    "view"
  );
  const [rejectionReason, setRejectionReason] = useState("");
  const { userInfo } = useAppSelector(selectAuth);
  const [archive] = useArchiveProductMutation();
  const { data } = useGetAllVendorProductsQuery(userInfo?.Vendor?.id, {
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
    refetchOnReconnect: true,
  });
  const { data: categories } = useGetAllProductCategoryQuery(undefined, {
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
    refetchOnReconnect: true,
  });
  const navigate = useNavigate();
  const handleSearch = (e: any) => {
    setSearchTerm(e.target.value);
  };

  const handleView = (product: any) => {
    setSelectedProduct(product);
    setModalAction("view");
    setShowModal(true);
  };

  const handleModalAction = () => {
    // In a real app, you would call your API/Redux action here
    if (modalAction === "approve") {
      console.log(`Approving product:`, selectedProduct);
    } else if (modalAction === "reject") {
      console.log(
        `Rejecting product:`,
        selectedProduct,
        "Reason:",
        rejectionReason
      );
    }
    setShowModal(false);
  };

  const filteredProducts: Product[] | undefined = data?.data?.filter(
    (product: Product) => {
      const matchesSearch = product?.name
        ?.toLowerCase()
        ?.includes(searchTerm.toLowerCase());
      const matchesCategory =
        categoryFilter === "ALL" ||
        product?.subCategoryItemName === categoryFilter;
      return matchesSearch && matchesCategory;
    }
  );

  const handleDelete = async (row: Product) => {
    try {
      const response = (await archive({
        id: row.id as number,
        vendorId: row.vendorId as number,
      }).unwrap()) as { message?: string };
      toast.success(response?.message);
    } catch (error: unknown) {
      const err = error as { data?: { message?: string } };
      toast.error(err?.data?.message || "Failed to delist product");
    }
  };

  // Row actions dropdown state
  const [showActionMenu, setShowActionMenu] = useState(false);
  const [actionAnchorRect, setActionAnchorRect] = useState<{
    top: number;
    left: number;
    width: number;
    height: number;
  } | null>(null);
  // Function Product() -> columns definition
  const columns: TableColumn<Product>[] = [
    {
      name: "Image",
      selector: (row: any) => row.thumbnails[0],
      cell: (row: any) => (
        <img
          src={row.thumbnails[0]}
          alt="Product Image"
          className="w-16 h-16 object-cover rounded"
        />
      ),
    },
    {
      name: "Product Name",
      selector: (row: any) => row.name,
      sortable: true,
    },
    {
      name: "Price",
      selector: (row: any) => row.price,
      format: (row: any) =>
        `${new Intl.NumberFormat("en-NG", {
          style: "currency",
          currency: "NGN",
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }).format(row?.price)}`,
      sortable: true,
    },
    {
      name: "Category",
      selector: (row: any) => row.subCategoryItemName,
      sortable: true,
    },
    {
      name: "Status",
      cell: (row: Product) => (
        <span
          className={`px-2 py-1 rounded text-sm ${
            row.status === "Approved"
              ? "bg-green-100 text-green-800"
              : "bg-yellow-100 text-yellow-800"
          }`}
        >
          {row.status === "Approved" ? "Approved" : "Pending Approval"}
        </span>
      ),
      sortable: true,
    },
    {
      name: "Date Created",
      selector: (row: any) => row.createdAt.slice(0, 10),
      sortable: true,
    },

    {
      name: "Actions",
      cell: (row: Product) => (
        <div className="relative flex justify-center items-center">
          <button
            onClick={(e) => {
              setSelectedProduct(row);
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

  const subcategoryItems = categories?.data
    .flatMap((category: any) => category.subCategories)
    .flatMap((subCategory: any) => subCategory.items)
    .map((item: any) => ({ id: item.id, name: item.name }));

  return (
    <div className="">
      <Navbar title="Product Management" subtitle="Manage your products here" />
      <div className="flex flex-col w-full">
        <div className="flex justify-end px-4 md:px-10">
          <button
            className="px-4 bg-pryColor text-white py-3 mt-4 rounded-lg hover:bg-pryColor"
            onClick={() => navigate("/product-management/add-product")}
          >
            + Add Product
          </button>
        </div>

        <div className="flex px-4 py-6 md:px-6 lg:px-10">
          <div className="bg-white p-6 rounded-lg shadow w-full">
            <div className="flex flex-col md:flex-row justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-greyColr mb-4 md:mb-0">
                Products
              </h2>

              <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 w-full md:w-auto">
                <div className="w-full md:w-48">
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pryColor"
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                  >
                    <option value="ALL">All Categories</option>
                    {subcategoryItems?.map((item: any) => (
                      <option value={item.name}>{item.name}</option>
                    ))}
                  </select>
                </div>

                <div className="w-full md:w-64">
                  <input
                    type="text"
                    placeholder="Search products..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pryColor"
                    value={searchTerm}
                    onChange={handleSearch}
                  />
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <DataTable
                columns={columns}
                data={filteredProducts as Product[]}
                pagination
                customStyles={customStyles}
                highlightOnHover
                responsive
                sortIcon={<ChevronDown size={16} />}
              />
            </div>

            {/* Row actions dropdown menu */}
            {showActionMenu && selectedProduct && (
              <RowActionsMenu
                anchorRect={actionAnchorRect}
                onClose={() => setShowActionMenu(false)}
                onView={() => {
                  setShowActionMenu(false);
                  handleView(selectedProduct);
                }}
                onEdit={() => {
                  setShowActionMenu(false);
                  navigate("/product-management/edit-product", {
                    state: { product: selectedProduct },
                  });
                }}
                onDelist={() => {
                  setShowActionMenu(false);
                  handleDelete(selectedProduct);
                }}
              />
            )}

            {/* Product details modal */}
            <ProductDetailsModal
              open={showModal}
              product={selectedProduct}
              action={modalAction}
              rejectionReason={rejectionReason}
              onClose={() => setShowModal(false)}
              onEdit={(p) =>
                navigate("/product-management/edit-product", {
                  state: { product: p },
                })
              }
              onSubmitAction={handleModalAction}
              onChangeRejectionReason={(val) => setRejectionReason(val)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
