// import { NotificationIcon } from "../../assets/svg/CustomSVGs";
import { useAppSelector } from "../../hooks";
import { type NavbarProps } from "../../interfaces/Global";
import { selectAuth } from "../../store/slice/authSlice";
import { Menu } from "lucide-react";
import { useGetVendorByIdQuery } from "../../service/vendor";

const Navbar: React.FC<NavbarProps> = ({ title, subtitle }) => {
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
  const businessName =
    vendor?.businessName ||
    userInfo?.Vendor?.businessName ||
    userInfo?.businessName;
  const fullName = vendor?.User?.fullName || userInfo?.fullName;
  const businessLogo = vendor?.businessLogo || userInfo?.Vendor?.businessLogo;

  return (
    <header className="sticky top-0 z-30 flex min-h-[92px] items-center justify-between border-b border-[#151A22]/[0.07] bg-[#ECE9E1]/90 px-4 py-4 backdrop-blur-xl md:px-8 lg:px-10">
      {/* Mobile/Tablet Hamburger */}
      <div className="md:hidden mr-3">
        <button
          aria-label="Toggle sidebar"
          onClick={() =>
            window.dispatchEvent(new CustomEvent("toggle-sidebar"))
          }
          className="p-2.5 rounded-full border border-[#151A22]/10 bg-white/50 hover:bg-white active:scale-[0.98]"
        >
          <Menu size={20} className="text-greyColr" />
        </button>
      </div>

      <div className="flex min-w-0 flex-col gap-1">
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#6F8294]">Vendor workspace</p>
        <h3 className="truncate font-spaceGrotesk text-[26px] font-semibold leading-tight tracking-[-0.035em] text-[#151A22] md:text-[32px]">
          {title}
        </h3>
        <p className="hidden text-sm leading-5 text-[#566170] sm:block">
          {subtitle}
        </p>
      </div>
      <div className="flex items-center gap-3 md:gap-4">
        {userInfo?.role === "VENDOR" && status === "APPROVED" && (
          <span
            className={`
         hidden px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-[0.12em]
         bg-emerald-50 text-emerald-700 sm:inline-flex
       `}
          >
            {status}
          </span>
        )}

        <div className="flex gap-4 items-center">
          <div className="image">
            {businessLogo ? (
              <img
                src={businessLogo}
                alt="Uploaded Preview"
                className="h-11 w-11 rounded-full border border-[#151A22]/10 object-cover"
              />
            ) : (
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#DCE4E8]">
                <h3 className="font-spaceGrotesk text-base font-semibold text-[#151A22]">
                  {businessName?.charAt(0) || fullName?.charAt(0)}
                </h3>
              </div>
            )}
          </div>
          <div className="hidden flex-col sm:flex">
            <p className="text-sm font-semibold text-[#242B35]">
              {fullName}
            </p>
            <div className="flex gap-1 items-center">
              <p className="text-xs font-medium text-[#6F8294]">
                {businessName}
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
