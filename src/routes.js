import { Navigate, useRoutes } from "react-router-dom";
// layouts
import DashboardLayout from "./layouts/dashboard";
import SimpleLayout from "./layouts/simple";
//
import UserPage from "./pages/UserPage";
import LoginPage from "./pages/LoginPage";
import Page404 from "./pages/Page404";
import DashboardAppPage from "./pages/DashboardAppPage";
import AdminDashboard from "./pages/admin/adminDashboard";
import Dashboard from "./pages/dashboard/dashboard";
import Links from "./pages/links/links";
import Appointment from "./pages/appointments/appointment";
import Faq from "./pages/faq";

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      path: "/",
      element: <SimpleLayout />, // Wrap the login page in a layout if necessary
      children: [
        { path: "/", element: <LoginPage /> }, // Set the login page as the default route
        { path: "404", element: <Page404 /> },
        { path: "*", element: <Navigate to="/404" /> },
      ],
    },
    {
      path: "/admin",
      element: <SimpleLayout />, // Wrap the login page in a layout if necessary
      children: [
        { element: <Navigate to="/admin/dashboard" />, index: true },
        { path: "/admin/dashboard", element: <AdminDashboard /> }, // Set the login page as the default route
        { path: "404", element: <Page404 /> },
        { path: "*", element: <Navigate to="/404" /> },
      ],
    },
    {
      path: "/dashboard",
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        // { path: "app", element: <DashboardAppPage /> },
        { path: "app", element: <UserPage /> },
        { path: "edit", element: <Dashboard /> },
        { path: "links", element: <Links isAdmin={false} /> },
      ],
    },
    {
      path: '/appointments',
      element: <Appointment />
    },
    {
      path: "*",
      element: <Navigate to="/404" replace />,
    },
    {
      path: "/faq",
      element: <Faq />,
    }
  ]);

  return routes;
}
