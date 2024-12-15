import { DashboardLayout } from "@/components/shared/DashboardLayout";
import RootLayout from "@/components/shared/RootLayout";
import { paths } from "@/constants/paths";
import { DetailsPage } from "@/pages/(business)/details";
import HomePage from "@/pages/(business)/home";
import { RentListPage } from "@/pages/(business)/list";
import { PaymentPage } from "@/pages/(business)/payment";
import { DashboardMainPage } from "@/pages/(dashboard)/main";
import { DashboardRentListPage } from "@/pages/(dashboard)/rents/list";
import { DashboardRentCreatePage } from "@/pages/(dashboard)/rents/create";
import { createBrowserRouter } from "react-router-dom";
import EditPage from "@/pages/(dashboard)/rents/edit";

export const router = createBrowserRouter([
  {
    path: "",
    element: <RootLayout />,
    children: [
      {
        path: paths.HOME,
        element: <HomePage />,
      },
      {
        path: paths.LIST,
        element: <RentListPage />,
      },
      {
        path: paths.DETAIL(),
        element: <DetailsPage />,
      },
      {
        path: paths.PAYMENT(),
        element: <PaymentPage />,
      },
      {
        path: "",
        element: <DashboardLayout />,
        children: [
          {
            path: paths.DASHBOARD.MAIN,
            element: <DashboardMainPage />,
          },
          {
            path: paths.DASHBOARD.RENTS.LIST,
            element: <DashboardRentListPage />,
          },
          {
            path: paths.DASHBOARD.RENTS.CREATE,
            element: <DashboardRentCreatePage />,
          },
          {
            path: paths.DASHBOARD.RENTS.EDIT(),
            element: <EditPage />,
          },
        ],
      },
    ],
  },
]);
