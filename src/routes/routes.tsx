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

export { authRoutes, vendorRoutes };
