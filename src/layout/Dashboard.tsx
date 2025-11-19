import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import { type DashboardLayoutProps } from "../interfaces/Global";

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [isSidebarOpenMobile, setIsSidebarOpenMobile] = useState(false);

  const toggleSidebar = () => {
    setCollapsed((prev) => !prev);
  };

  useEffect(() => {
    const handler = () => setIsSidebarOpenMobile((prev) => !prev);
    window.addEventListener("toggle-sidebar", handler as EventListener);
    return () =>
      window.removeEventListener("toggle-sidebar", handler as EventListener);
  }, []);

  return (
    <main className="w-full gap-8 flex flex-col bg-white">
      <div className="flex">
        {/* Mobile overlay */}
        {isSidebarOpenMobile && (
          <div
            className="fixed inset-0 bg-black/40 z-40 md:hidden"
            onClick={() => setIsSidebarOpenMobile(false)}
          />
        )}

        {/* Sidebar */}
        <section
          className={`
            fixed left-0 top-0 z-50 h-screen transition-transform duration-300
            bg-[#254A76] border-r
            ${
              isSidebarOpenMobile ? "translate-x-0" : "-translate-x-full"
            } md:translate-x-0
            ${collapsed ? "md:w-20" : "md:w-64"} w-64
          `}
        >
          <Sidebar collapsed={collapsed} toggleSidebar={toggleSidebar} />
        </section>

        {/* Content */}
        <aside
          className={`
            w-full overflow-y-auto bg-pryColor-Lighter transition-all duration-300
            ${collapsed ? "md:ml-20" : "md:ml-64"} ml-0
          `}
        >
          {children}
        </aside>
      </div>
    </main>
  );
};

export default DashboardLayout;
