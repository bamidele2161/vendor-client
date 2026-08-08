import { ShoppingBag, WalletCards, Package } from "lucide-react";
import { Card } from "./Cards";

import {
  useGetAllOrdersByVendorsQuery,
  useGetAllVendorProductsQuery,
} from "../../service/product";
import { selectAuth } from "../../store/slice/authSlice";
import { useAppSelector } from "../../hooks";

export default function OverviewCards() {
  const { userInfo } = useAppSelector(selectAuth);
  const { data } = useGetAllVendorProductsQuery(userInfo?.Vendor?.id, {
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
    refetchOnReconnect: true,
  });
  const { data: orders } = useGetAllOrdersByVendorsQuery(userInfo?.Vendor?.id, {
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
    refetchOnReconnect: true,
  });

  const subtotal =
    orders?.data?.reduce(
      (acc: any, item: any) => acc + item.orderSubtotal,
      0
    ) || 0;

  const stats = [
    {
      title: "Total Orders",
      value: orders?.data?.length || 0,
      icon: ShoppingBag,
    },
    {
      title: "Total Revenue",
      value: `${new Intl.NumberFormat("en-NG", {
        style: "currency",
        currency: "NGN",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(subtotal)}`,
      icon: WalletCards,
    },
    {
      title: "Products Listed",
      value: data?.data?.length || 0,
      icon: Package,
    },
    // {
    //   title: "Average Rating",
    //   value: "4.8",
    //   icon: <Star size={28} className="text-yellow-500" />,
    //   bgColor: "bg-yellow-50",
    // },
  ];
  return (
    <div className="grid grid-cols-1 gap-px overflow-hidden rounded-[1.35rem] border border-white/10 bg-white/10 sm:grid-cols-3">
      {stats.map((stat, index) => (
        <Card
          key={index}
          className="rounded-none bg-white/[0.045] p-5 backdrop-blur-sm md:p-6"
        >
          <div className="flex items-start justify-between gap-4">
            <div><p className="text-xs font-semibold text-white/50">{stat.title}</p><p className="mt-3 font-spaceGrotesk text-2xl font-semibold tracking-[-0.04em] text-white md:text-3xl">{stat.value}</p></div>
            <div className="rounded-full border border-white/10 bg-white/10 p-2.5"><stat.icon size={18} className="text-[#DCE4E8]" /></div>
          </div>
        </Card>
      ))}
    </div>
  );
}
