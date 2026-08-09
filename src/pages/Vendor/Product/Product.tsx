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

import { ChevronDown, MoreVertical, Plus, Search } from "@icons";
import { useAppSelector } from "../../../hooks";
import { selectAuth } from "../../../store/slice/authSlice";
import { toast } from "react-toastify";
import RowActionsMenu from "../../../components/ui/RowActionsMenu";
import ProductDetailsModal from "../../../components/Product/ProductDetailsModal";
import type { Product } from "../../../interfaces/Product";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { tableCustomStyles } from "../../../util";

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
          className="h-14 w-12 rounded-xl object-cover"
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
      name: "Stock",
      selector: (row: any) => row.stock,
      sortable: true,
      width: "80px",
    },
    {
      name: "Status",
      cell: (row: Product) => (
        <span
          className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-[.08em] ${
            row.status === "Approved"
              ? "bg-green-100 text-green-800"
              : "bg-yellow-100 text-yellow-800"
          }`}
        >
          {row.status === "Approved" ? "Approved" : "Pending"}
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

  const subcategoryItems = categories?.data
    .flatMap((category: any) => category.subCategories)
    .flatMap((subCategory: any) => subCategory.items)
    .map((item: any) => ({ id: item.id, name: item.name }));

  return (
    <div className="">
      <Navbar title="Product Management" subtitle="Manage your products here" />
      <div className="mx-auto max-w-[1500px] px-4 py-6 md:px-8 md:py-8 lg:px-10">
          <div className="w-full">
            <div className="mb-5 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div><p className="text-[10px] font-bold uppercase tracking-[.2em] text-[#6F8294]">Live catalogue</p><h2 className="font-spaceGrotesk text-3xl font-semibold tracking-[-.04em]">Your products</h2><p className="mt-1 text-sm text-[#566170]">Review inventory and manage every item in your storefront.</p></div>
              <Button onClick={() => navigate("/product-management/add-product")}><Plus size={16}/> Add product</Button>
            </div>

              <div className="mb-4 flex w-full flex-col gap-3 rounded-[1.25rem] border border-[#151A22]/[.07] bg-[#F8F7F3] p-3 md:flex-row md:justify-end">
                <div className="w-full md:w-48">
                  <select
                    className="h-12 w-full rounded-xl border border-[#151A22]/10 bg-white px-4 text-sm outline-none focus:border-[#6F8294] focus:ring-4 focus:ring-[#6F8294]/10"
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                  >
                    <option value="ALL">All Categories</option>
                    {subcategoryItems?.map((item: any) => (
                      <option value={item.name}>{item.name}</option>
                    ))}
                  </select>
                </div>

                <div className="relative w-full md:w-72"><Search className="pointer-events-none absolute left-4 top-1/2 z-10 h-4 w-4 -translate-y-1/2 text-[#6F8294]"/>
                  <Input
                    type="text"
                    placeholder="Search products..."
                    className="pl-10"
                    value={searchTerm}
                    onChange={handleSearch}
                  />
                </div>
              </div>
            <div className="overflow-hidden rounded-[1.5rem] border border-[#151A22]/[.07] bg-[#F8F7F3]">
              <DataTable
                columns={columns}
                data={filteredProducts as Product[]}
                pagination
                customStyles={tableCustomStyles}
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
                product
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
  );
};

export default ProductPage;
