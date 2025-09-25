import { type Route } from "../interfaces/Global";
import Customer from "../pages/Vendor/Customer/Customer";
import Order from "../pages/Vendor/Order/Order";
import Product from "../pages/Vendor/Product/Product";
import Settings from "../pages/Vendor/Settings/Settings";
import VendorDashboard from "../pages/Vendor/Home/VendorDashboard";
import AddProduct from "../pages/Vendor/Product/AddProduct";
import VendorSignup from "../pages/Auth/Vendor/VendorSignUp";
import VendorSignin from "../pages/Auth/Vendor/Login";
import Transaction from "../pages/Vendor/Transaction/Transaction";
import Discount from "../pages/Vendor/Discount/Discount";
import ProductManagement from "../pages/AdminPages/products/ProductManagement";
import OrderManagement from "../pages/AdminPages/orders/OrderManagement";
import UserManagement from "../pages/AdminPages/users/UserManagement";
import VendorManagement from "../pages/AdminPages/vendors/VendorManagement";
import ContentManagement from "../pages/AdminPages/content/ContentManagement";
import AdminDashboard from "../pages/AdminPages/Dashboard";
import AdminSettings from "../pages/AdminPages/Settings";
import AdminAuth from "../pages/AdminPages/Auth/Auth";
import EditProduct from "../pages/Vendor/Product/EditProduct";
import HomePage from "../pages/Home";

const authRoutes: Route[] = [
  {
    path: "/",
    name: "Vendor Welcome Page",
    element: <HomePage />,
  },
  {
    path: "/signup",
    name: "Vendor SignUp Page",
    element: <VendorSignup />,
  },
  {
    path: "/signin",
    name: "Vendor SignUp Page",
    element: <VendorSignin />,
  },
  {
    path: "/admin-signin",
    name: "Admin SignUp Page",
    element: <AdminAuth />,
  },
];

const vendorRoutes: Route[] = [
  { path: "/dashboard", name: "Home", element: <VendorDashboard /> },
  { path: "/product-management", name: "Home", element: <Product /> },
  {
    path: "/product-management/add-product",
    name: "Add Product",
    element: <AddProduct />,
  },
  {
    path: "/product-management/edit-product",
    name: "Edit Product",
    element: <EditProduct />,
  },
  { path: "/order-management", name: "Home", element: <Order /> },
  { path: "/customer-management", name: "Home", element: <Customer /> },
  { path: "/settings", name: "Home", element: <Settings /> },
  { path: "/transactions", name: "Transaction", element: <Transaction /> },
  { path: "/discount", name: "Discount", element: <Discount /> },
];

const adminRoutes: Route[] = [
  { path: "/admin-dashboard", name: "Home", element: <AdminDashboard /> },
  {
    path: "/admin-product-management",
    name: "Home",
    element: <ProductManagement />,
  },
  {
    path: "/admin-order-management",
    name: "Home",
    element: <OrderManagement />,
  },
  {
    path: "/admin-customer-management",
    name: "User",
    element: <UserManagement />,
  },
  { path: "/admin-vendor", name: "Home", element: <VendorManagement /> },

  { path: "/admin-content", name: "Discount", element: <ContentManagement /> },
  { path: "/admin-settings", name: "Settings", element: <AdminSettings /> },
];
export { authRoutes, vendorRoutes, adminRoutes };
