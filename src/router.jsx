import { createBrowserRouter } from "react-router-dom";

// import from Auth
import LogIn from "./Pages/Auth/LogIn";
import SignUp from "./Pages/Auth/SignUp";
import ForgotPassword from "./Pages/Auth/ForgotPassword";
import DigitCode from "./Pages/Auth/DigitCode";
import ResetPassword from "./Pages/Auth/ResetPassword";

// import from Component/Admin
import AdminLayout from "./Components/Admin/AdminLayout";

// import from Pages/Admin
import DashboardPage from "./Pages/Admin/Dashboard/DashboardPage";
import ProductsPage from "./Pages/Admin/Products/ProductsPage";
import CustomersPage from "./Pages/Admin/Customers/CustomersPage";
import OrdersPage from "./Pages/Admin/Orders/OrdersPage";
import PaymentsPage from "./Pages/Admin/Payments/PaymentsPage";
import InventoryPage from "./Pages/Admin/Inventory/InventoryPage";
import HelpCenterPage from "./Pages/Admin/HelpCenter/HelpCenterPage";
import SettingPage from "./Pages/Admin/SettingPage/SettingPage";
import ProtectedRoute from "./Components/ProtectRoute";
import AddProduct from "./Pages/Admin/Products/components/addProduct";
import BrandForm from "./Pages/Admin/Products/components/BrandForm";
import CategoryForm from "./Pages/Admin/Products/components/CategoryForm";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "/",
        element: <DashboardPage />,
      },
      {
        path: "/products",
        element: <ProductsPage />,
      },
      {
        path: "/products/createProduct",
        element: <AddProduct />,
        children: [
          {
            path: "createBrand",
            element: <BrandForm />,
          },
          {
            path: "createCategory",
            element: <CategoryForm />,
          },
        ],
      },
      {
        path: "/products/:id",
        element: <AddProduct />,
      },
      {
        path: "/customers",
        element: <CustomersPage />,
      },
      {
        path: "/orders",
        element: <OrdersPage />,
      },
      {
        path: "/payments",
        element: <PaymentsPage />,
      },
      {
        path: "/inventories",
        element: <InventoryPage />,
      },
      {
        path: "/help",
        element: <HelpCenterPage />,
      },
      {
        path: "/settings",
        element: <SettingPage />,
      },
    ],
  },
  {
    path: "/login",
    element: <LogIn />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/forgotpassword",
    element: <ForgotPassword />,
  },
  {
    path: "/digitcode",
    element: <DigitCode />,
  },
  {
    path: "/resetpassword",
    element: <ResetPassword />,
  },
]);

export default router;
