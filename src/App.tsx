import { ToastContainer } from "react-toastify";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { adminRoutes, authRoutes, vendorRoutes } from "./routes/routes";
import DashboardLayout from "./layout/Dashboard";
import Livechat from "./components/Chatwoot";
import Guard from "./routes/Guard";

function App() {
  return (
    <main className="App">
      <ToastContainer position="top-right" autoClose={2000} />

      <Routes>
        {authRoutes.map((route, idx: number) => (
          <Route key={idx} path={route.path} element={route.element} />
        ))}
        {vendorRoutes.map((route, idx: number) => (
          <Route
            key={idx}
            path={route.path}
            element={
              <Guard>
                <DashboardLayout>{route.element}</DashboardLayout>
              </Guard>
            }
          />
        ))}

        {adminRoutes.map((route, idx: number) => (
          <Route
            key={idx}
            path={route.path}
            element={<DashboardLayout>{route.element}</DashboardLayout>}
          />
        ))}
      </Routes>
      <Livechat />
    </main>
  );
}

export default App;
