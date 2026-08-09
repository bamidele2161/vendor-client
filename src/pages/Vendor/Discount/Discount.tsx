import { useState } from "react";
import { Search, Plus, X } from "@icons";
import CouponForm from "../../../components/Vendor/CouponForm";
import CouponList from "../../../components/Vendor/CouponList";

import Navbar from "../../../components/Navbar/Navbar";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";

const initialCoupons = [
  {
    id: "1",
    code: "SUMMER25",
    type: "percentage",
    value: 25,
    minPurchase: 1000,
    startDate: "2025-06-01",
    endDate: "2025-08-31",
    usageLimit: 100,
    usedCount: 23,
    status: "active",
    products: ["all"],
    description: "Summer sale discount",
  },
  {
    id: "2",
    code: "WELCOME10",
    type: "percentage",
    value: 10,
    minPurchase: 500,
    startDate: "2025-01-01",
    endDate: "2025-12-31",
    usageLimit: 500,
    usedCount: 127,
    status: "active",
    products: ["all"],
    description: "New customer discount",
  },
  {
    id: "3",
    code: "FLAT100",
    type: "fixed",
    value: 100,
    minPurchase: 1500,
    startDate: "2025-05-01",
    endDate: "2025-05-15",
    usageLimit: 50,
    usedCount: 50,
    status: "expired",
    products: ["electronics"],
    description: "Electronics sale discount",
  },
];

const Discount = () => {
  const [coupons, setCoupons] = useState(initialCoupons);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingCoupon, setEditingCoupon] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const activeCoupons = coupons.filter(
    (coupon) => coupon.status === "active"
  ).length;
  const expiredCoupons = coupons.filter(
    (coupon) => coupon.status === "expired"
  ).length;

  const handleAddCoupon = () => {
    setEditingCoupon(null);
    setIsFormOpen(true);
  };

  const handleEditCoupon = (coupon: any) => {
    setEditingCoupon(coupon);
    setIsFormOpen(true);
  };

  const handleDeleteCoupon = (id: string) => {
    if (window.confirm("Are you sure you want to delete this coupon?")) {
      setCoupons(coupons.filter((coupon) => coupon.id !== id));
    }
  };

  const handleSaveCoupon = (coupon: any) => {
    if (coupon.id) {
      // Update existing coupon
      setCoupons(coupons.map((c) => (c.id === coupon.id ? coupon : c)));
    } else {
      // Add new coupon
      const newCoupon = {
        ...coupon,
        id: Date.now().toString(),
        usedCount: 0,
        status: new Date(coupon.endDate) < new Date() ? "expired" : "active",
      };
      setCoupons([...coupons, newCoupon]);
    }
    setIsFormOpen(false);
  };

  const filteredCoupons = coupons
    .filter(
      (coupon) =>
        coupon.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        coupon.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(
      (coupon) => statusFilter === "all" || coupon.status === statusFilter
    );

  return (
    <div className="">
      <Navbar
        title="Discount Management"
        subtitle="Manage special offers for your customers"
      />
      <div className="min-h-screen px-4 py-6 md:px-8 md:py-8 lg:px-10">
        <div className="mx-auto max-w-[1500px]">
          <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[.2em] text-[#6F8294]">Promotion workspace</p>
              <h1 className="font-spaceGrotesk text-3xl font-semibold tracking-[-.04em] text-[#151A22]">Coupons & discounts</h1>
              {/* <p className="text-sm text-gray-600 mt-1">
                Manage special offers for your customers
              </p> */}
            </div>
            <Button
              onClick={handleAddCoupon}
            >
              <Plus size={16} /> Create coupon
            </Button>
          </div>

          {/* Dashboard cards */}
          <div className="mb-6 grid grid-cols-3 gap-px overflow-hidden rounded-[1.5rem] border border-[#151A22]/[.07] bg-[#151A22]/[.07]">
            <div className="bg-[#151A22] p-5 text-white md:p-6">
              <div>
                <div>
                  <p className="text-xs font-medium text-white/55">
                    Total Coupons
                  </p>
                  <p className="mt-3 font-spaceGrotesk text-2xl font-semibold">{coupons.length}</p>
                </div>
              </div>
            </div>
            <div className="bg-[#DCE4E8] p-5 md:p-6">
              <div>
                <div>
                  <p className="text-xs font-medium text-[#566170]">
                    Active Coupons
                  </p>
                  <p className="mt-3 font-spaceGrotesk text-2xl font-semibold">{activeCoupons}</p>
                </div>
              </div>
            </div>
            <div className="bg-[#F8F7F3] p-5 md:p-6">
              <div>
                <div>
                  <p className="text-xs font-medium text-[#566170]">
                    Expired Coupons
                  </p>
                  <p className="mt-3 font-spaceGrotesk text-2xl font-semibold">{expiredCoupons}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Search and filter */}
          <div className="mb-4 rounded-[1.25rem] border border-[#151A22]/[.07] bg-[#F8F7F3] p-3">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search size={18} className="text-gray-400" />
                </div>
                <Input
                  type="text"
                  placeholder="Search coupons..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-500">Status:</span>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="h-12 rounded-xl border border-[#151A22]/10 bg-white px-4 text-sm outline-none focus:border-[#6F8294] focus:ring-4 focus:ring-[#6F8294]/10"
                >
                  <option value="all">All</option>
                  <option value="active">Active</option>
                  <option value="expired">Expired</option>
                </select>
              </div>
            </div>
          </div>

          {/* Coupon list */}
          <CouponList
            coupons={filteredCoupons}
            onEdit={handleEditCoupon}
            onDelete={handleDeleteCoupon}
          />

          {/* Coupon form modal */}
          {isFormOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#151A22]/65 p-4 backdrop-blur-sm">
              <div className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-[1.75rem] bg-[#F8F7F3] p-5 shadow-2xl md:p-7">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="font-spaceGrotesk text-2xl font-semibold tracking-tight">
                    {editingCoupon ? "Edit Coupon" : "Create New Coupon"}
                  </h2>
                  <button
                    onClick={() => setIsFormOpen(false)}
                    className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-[#EEF1F3]"
                  >
                    <X size={24} />
                  </button>
                </div>
                <CouponForm
                  coupon={editingCoupon}
                  onSave={handleSaveCoupon}
                  onCancel={() => setIsFormOpen(false)}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Discount;
