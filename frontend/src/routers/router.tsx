import { Navigate, RouteObject } from "react-router-dom";
import BaseLayout from "../layouts/BaseLayout";
import SidebarLayout from "../layouts/SidebarLayout";
// import LoginPage from "../content/login/LoginPage";
import ProtectedRoute from "./ProtectedRoute";
import {
  ComingSoon,
  Crypto,
  Customer,
  KhoCNCN,
  KhoCNDH,
  KhoCoTy,
} from "./LoaderList";
import TestDialog from "../content/managements/Customer/dialog/TestDialog";
// import Home from "../content/home";
import RegisterPage from "../content/register/RegisterPage";
import UserProfile from "../content/home/Components/UserProfile";
import FeedBack from "../content/managements/Customer/feedback/FeedBack";
import { Home } from "./LoaderList";
import { LoginPage } from "./LoaderList";

const router: RouteObject[] = [
  {
    path: "",
    element: <BaseLayout />,
    children: [
      {
        path: "",
        element: <Navigate to="/home" />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/register",
        element: <RegisterPage />,
      },
    ],
  },
  {
    path: "home",
    element: <Home />,
    children: [
      {
        path: "",
        element: <Navigate to={"/home"} />,
      },
    ],
  },
  { path: "profile/:id", element: <UserProfile /> },
  {
    path: "dash",
    element: (
      <ProtectedRoute>
        <SidebarLayout />,
      </ProtectedRoute>
    ),
    children: [
      {
        path: "",
        element: <Navigate to="crypto" replace />,
      },
      {
        path: "crypto",
        element: <Crypto />,
      },
    ],
  },
  {
    path: "managements",
    element: (
      <ProtectedRoute>
        <SidebarLayout />,
      </ProtectedRoute>
    ),
    children: [
      {
        path: "",
        element: <Navigate to="customer" replace />,
      },
      {
        path: "customer",
        element: <Customer />,
        children: [
          {
            path: "edit/:id",
            element: <TestDialog />,
          },
        ],
      },
      {
        path: "feedback",
        element: <FeedBack />,
      },
      {
        path: "khocty",
        element: <KhoCoTy />,
      },
      {
        path: "khocndh",
        element: <KhoCNDH />,
      },
      {
        path: "khochcn",
        element: <KhoCNCN />,
      },
      {
        path: "*",
        element: <ComingSoon />,
      },
    ],
  },
];

export default router;
