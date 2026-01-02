import OverviewCards from "../../../components/Cards/OverviewCards";
import SalesDonut from "../../../components/Chart/Donurt";
import SalesChart from "../../../components/Chart/SalesChart";
import QuickActions from "../../../components/Dashboard/QuickAction";
import RecentOrders from "../../../components/Dashboard/RecentOrder";
import Navbar from "../../../components/Navbar/Navbar";
import { useAppSelector } from "../../../hooks";
import { useGetVendorByIdQuery } from "../../../service/vendor";
import { selectAuth } from "../../../store/slice/authSlice";
import { AlertCircle } from "lucide-react";

const VendorDashboard = () => {
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

      <div className="px-4 py-6 md:px-6 lg:px-10 flex flex-col gap-6 md:gap-8">
        {status === "PENDING" && (
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-md flex items-start shadow-sm">
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

        {/* Overview Cards */}
        <div>
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Overview</h2>
          <OverviewCards />
        </div>

        {/* Best Selling Products, Low Stock Alerts, Quick Actions */}
        <div className="flex flex-col">
          <div>
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              Quick Actions
            </h2>
            <QuickActions />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          <div className="w-full lg:w-2/3">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              Sales Performance
            </h2>
            <SalesChart />
          </div>

          <div className="w-full lg:w-1/3">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Sales</h2>
            <SalesDonut />
          </div>
        </div>
        {/* Recent Orders */}
        <div>
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Recent Orders
          </h2>
          <RecentOrders />
        </div>
      </div>
    </div>
  );
};

export default VendorDashboard;
