import OverviewCards from "../../../components/Cards/OverviewCards";
import SalesDonut from "../../../components/Chart/Donurt";
import SalesChart from "../../../components/Chart/SalesChart";
import QuickActions from "../../../components/Dashboard/QuickAction";
import RecentOrders from "../../../components/Dashboard/RecentOrder";
import Navbar from "../../../components/Navbar/Navbar";
import { useAppSelector } from "../../../hooks";
import { selectAuth } from "../../../store/slice/authSlice";

const VendorDashboard = () => {
  const { userInfo } = useAppSelector(selectAuth);

  return (
    <div className="min-h-screen">
      <Navbar
        title="Dashboard"
        subtitle={`Good morning, ${userInfo?.fullName}`}
      />

      <div className="px-4 py-6 md:px-6 lg:px-10 flex flex-col gap-6 md:gap-8">
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
