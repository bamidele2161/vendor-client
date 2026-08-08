import { NavLink, useNavigate } from "react-router-dom";
import { adminSidebarData, SidebarData } from "./SidebarData";
import { LogoutIcon } from "../../assets/svg/CustomSVGs";
import { type SidebarDataProps } from "../../interfaces/Global";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { VendorBrandIcon } from "../../assets/svg/Product";
import { LogoutAdmin, LogoutUser } from "../../util";
import { useAppSelector } from "../../hooks";
import { selectAuth } from "../../store/slice/authSlice";

interface SidebarProps {
  collapsed: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed, toggleSidebar }) => {
  const navigate = useNavigate();
  const { userInfo } = useAppSelector(selectAuth);

  const features = userInfo?.role === "VENDOR" ? SidebarData : adminSidebarData;
  return (
    <main
      className={`sidebar-container relative h-full flex flex-col transition-all duration-300 ease-in-out ${
        collapsed ? "md:w-20" : "md:w-64"
      } w-64 bg-[#151A22] text-white`}
    >
      {/* Desktop-only collapse toggle */}
      <div
        className="absolute -right-3 top-16 rounded-full border border-white/10 bg-[#DCE4E8] p-1 text-[#151A22] shadow-lg cursor-pointer hover:scale-105 transition-transform z-10 hidden md:block"
        onClick={toggleSidebar}
      >
        {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
      </div>

      <div className="flex flex-col gap-4 p-5">
        <div
          className={`flex items-center gap-3 ${
            collapsed ? "justify-center" : ""
          }`}
        >
          <VendorBrandIcon className="w-14" />
          {!collapsed && <div><h1 className="font-spaceGrotesk font-semibold text-xl tracking-tight text-white">ashobox</h1><p className="mt-0.5 text-[10px] font-bold uppercase tracking-[0.2em] text-white/45">Vendor studio</p></div>}
        </div>

        <div
          className={`mt-8 border-t border-white/10 pt-6 ${
            collapsed ? "px-0" : "px-2"
          }`}
        >
          <ul className="flex flex-col gap-2">
            {features.map((item: SidebarDataProps) => (
              <li key={item.id}>
                <NavLink
                  to={item.url}
                  className={({ isActive }) =>
                    `flex items-center rounded-full transition-all duration-300 ease-in-out px-3 py-2.5 hover:bg-white/10 ${
                      isActive
                        ? "bg-[#DCE4E8] text-[#151A22] font-semibold"
                        : "text-white/70 font-medium"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <div
                      className={`flex items-center ${
                        collapsed ? "justify-center" : "justify-between w-full"
                      }`}
                    >
                      <div
                        className={`flex items-center ${
                          collapsed ? "justify-center" : "gap-3"
                        }`}
                      >
                        <div className="flex-shrink-0">
                          <item.icon
                            fillColor={isActive ? "#151A22" : "white"}
                          />
                        </div>

                        {!collapsed && (
                          <span
                            className={`text-sm transition-all ${
                              isActive ? "opacity-100" : "opacity-90"
                            }`}
                          >
                            {item.title}
                          </span>
                        )}
                      </div>

                      {!collapsed && isActive && (
                        <div className="h-1.5 w-1.5 rounded-full bg-[#6F8294]"></div>
                      )}
                    </div>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div
        className="mt-auto p-5 border-t border-white/10 cursor-pointer text-white/65 hover:text-white transition-colors"
        onClick={() =>
          userInfo?.role === "VENDOR"
            ? LogoutUser(navigate)
            : LogoutAdmin(navigate)
        }
      >
        <div
          className={`flex items-center ${
            collapsed ? "justify-center" : "gap-3"
          }`}
        >
          <div className="flex-shrink-0">
            <LogoutIcon />
          </div>

          {!collapsed && <span className="text-sm font-medium">Logout</span>}
        </div>
      </div>
    </main>
  );
};

export default Sidebar;
