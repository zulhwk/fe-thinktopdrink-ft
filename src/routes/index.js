import { Navigate } from "react-router-dom";
import OuterLayouts from "../components/layouts/OuterLayout";
import DashboardLayouts from "../components/layouts";
import { Login, Dashboard } from "../pages";
import produkRoute from "./produk";
import akunRoute from "./akun";
import pembelianRoute from "./pembelian";
import laporanRoute from "./laporan";
import biayaRoute from "./biaya";
import karyawanRoute from "./karyawan";

const routes = (isLoggedIn) => [
  {
    path: "app",
    element: isLoggedIn ? <DashboardLayouts /> : <Navigate to="/login" />,
    children: [
      {path: 'dashboard', element: <Dashboard />},
      ...produkRoute,
      ...akunRoute,
      ...pembelianRoute,
      ...laporanRoute,
      ...biayaRoute,
      ...karyawanRoute
    ]
  },
  {
    path: "/",
    element: isLoggedIn ? <Navigate to="/app/dashboard" /> : <OuterLayouts />,
    children: [
      {path: 'login', element: <Login />},
      {path: '/', element: <Navigate to="/app/dashboard" />},
      {path: '*', element: <Navigate to="/404" />},
    ],
  },
  {
    path: "",
    element: <>NOT FOUNDS</>
  }
];

export default routes;