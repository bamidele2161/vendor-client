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
    <div className="flex justify-between items-center px-6 md:px-10 py-5 bg-white shadow-default">
      {/* Mobile/Tablet Hamburger */}
      <div className="md:hidden mr-3">
        <button
          aria-label="Toggle sidebar"
          onClick={() =>
            window.dispatchEvent(new CustomEvent("toggle-sidebar"))
          }
          className="p-2 rounded-md border border-gray-200 hover:bg-gray-100 active:scale-[0.98]"
        >
          <Menu size={20} className="text-greyColr" />
        </button>
      </div>

      <div className="flex flex-col gap-4">
        <h3 className="text-pryColor font-semibold text-[24px] md:text-[32px] font-bricolage leading-6">
          {title}
        </h3>
        <p className="text-lightGreyColor font-inter leading-4 font-normal text-sm">
          {subtitle}
        </p>
      </div>
      <div className="flex flex-col-reverse md:flex-row items-center gap-4">
        {userInfo?.role === "VENDOR" && status === "APPROVED" && (
          <span
            className={`
         px-3 py-1 rounded-full text-xs font-semibold
         bg-green-50 text-green-700
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
                className="w-12 h-12 rounded-full mr-4"
              />
            ) : (
              <div className="flex items-center justify-center w-[48px] h-[48px] bg-[#f1f2f3] p-4 rounded-full">
                <h3 className="text-pryColor font-semibold text-base md:text-xl font-bricolage leading-6">
                  {businessName?.charAt(0) || fullName?.charAt(0)}
                </h3>
              </div>
            )}
          </div>
          <div className="flex flex-col">
            <p className=" font-semibold text-xs md:text-sm font-inter text-greyColr">
              {fullName}
            </p>
            <div className="flex gap-1 items-center">
              <p className="text-lightGreyColor font-medium font-inter text-xs">
                {businessName}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
