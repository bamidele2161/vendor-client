import OverviewCards from "../../../components/Cards/OverviewCards";
import SalesDonut from "../../../components/Chart/Donurt";
import SalesChart from "../../../components/Chart/SalesChart";
import QuickActions from "../../../components/Dashboard/QuickAction";
import RecentOrders from "../../../components/Dashboard/RecentOrder";
import Navbar from "../../../components/Navbar/Navbar";
import { useAppSelector } from "../../../hooks";
import { useGetVendorByIdQuery } from "../../../service/vendor";
import { selectAuth } from "../../../store/slice/authSlice";
import { AlertCircle, ArrowUpRight } from "@icons";
import { useNavigate } from "react-router-dom";

const VendorDashboard = () => {
  const navigate = useNavigate();
  const { userInfo } = useAppSelector(selectAuth);
  const { data: vendorData } = useGetVendorByIdQuery(
    userInfo?.Vendor?.id || "",
    {
      skip: !userInfo?.Vendor?.id,
      refetchOnFocus: true,
      refetchOnReconnect: true,
      refetchOnMountOrArgChange: true,
    }
  );

  const vendor = vendorData;

  const status = vendor?.status || userInfo?.Vendor?.status;

  return (
    <div className="min-h-screen">
      <Navbar
        title="Dashboard"
        subtitle={`Good morning, ${userInfo?.fullName}`}
      />

      <div className="mx-auto flex max-w-[1500px] flex-col gap-6 px-4 py-6 md:px-8 md:py-8 lg:px-10">
        {status === "PENDING" && (
          <div className="flex items-start rounded-[1.25rem] border border-amber-900/10 bg-amber-50 p-4">
            <AlertCircle
              className="text-yellow-500 mt-0.5 mr-3 flex-shrink-0"
              size={20}
            />
            <div>
              <h3 className="text-sm font-medium text-yellow-800">
                Account Pending Approval
              </h3>
              <p className="text-sm text-yellow-700 mt-1">
                Your vendor account is currently under review. Please wait while
                we review your account.
              </p>
            </div>
          </div>
        )}

        <section className="relative overflow-hidden rounded-[2rem] bg-[#151A22] px-5 py-7 text-white md:px-8 md:py-9">
          <div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full border border-white/10" />
          <div className="pointer-events-none absolute -right-8 -top-8 h-40 w-40 rounded-full bg-[#6F8294]/20 blur-2xl" />
          <div className="relative mb-7 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.22em] text-[#AEBCC7]">Business at a glance</p>
              <h2 className="max-w-xl font-spaceGrotesk text-3xl font-semibold leading-tight tracking-[-0.04em] md:text-4xl">Your storefront, in motion.</h2>
              <p className="mt-2 max-w-xl text-sm leading-6 text-white/55">Track orders, revenue and your live catalogue from one focused workspace.</p>
            </div>
            <button onClick={() => navigate("/product-management/add-product")} className="inline-flex h-11 items-center justify-center gap-2 self-start rounded-full bg-white px-5 text-sm font-semibold text-[#151A22] transition hover:-translate-y-0.5 md:self-auto">Add product <ArrowUpRight size={16} /></button>
          </div>
          <OverviewCards />
        </section>

        {/* Best Selling Products, Low Stock Alerts, Quick Actions */}
        <div className="flex flex-col">
          <div>
            <div className="mb-4"><p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#6F8294]">Shortcuts</p><h2 className="font-spaceGrotesk text-2xl font-semibold tracking-[-0.03em] text-[#151A22]">Keep things moving</h2></div>
            <QuickActions />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          <div className="w-full lg:w-2/3">
            <SalesChart />
          </div>

          <div className="w-full lg:w-1/3">
            <SalesDonut />
          </div>
        </div>
        {/* Recent Orders */}
        <div>
          <div className="mb-4"><p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#6F8294]">Latest activity</p><h2 className="font-spaceGrotesk text-2xl font-semibold tracking-[-0.03em] text-[#151A22]">Recent orders</h2></div>
          <RecentOrders />
        </div>
      </div>
    </div>
  );
};

export default VendorDashboard;
