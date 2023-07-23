import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import InventoryRoundedIcon from '@mui/icons-material/InventoryRounded';
import AccountBalanceWalletRoundedIcon from '@mui/icons-material/AccountBalanceWalletRounded';
import ShoppingBagRoundedIcon from '@mui/icons-material/ShoppingBagRounded';
import PaymentsRoundedIcon from '@mui/icons-material/PaymentsRounded';
import ReceiptLongRoundedIcon from '@mui/icons-material/ReceiptLongRounded';
import PeopleRoundedIcon from '@mui/icons-material/PeopleRounded';

const Menu = [
  {
    path: "/app/dashboard",
    parent: "dashboard",
    title: "Beranda",
    icon: <DashboardRoundedIcon />,
    children: null,
    isAdmin: false,
  },
  {
    path: "/app/produk",
    parent: "produk",
    title: "Produk",
    icon: <InventoryRoundedIcon />,
    children: null,
    isAdmin: false,
  },
  {
    path: "/app/akun",
    parent: "akun",
    title: "Akun",
    icon: <AccountBalanceWalletRoundedIcon />,
    children: null,
    isAdmin: true,
  },
  {
    path: "/app/pembelian",
    parent: "pembelian",
    title: "Pembelian",
    icon: <ShoppingBagRoundedIcon />,
    children: null,
    isAdmin: false,
  },
  {
    path: "/app/biaya",
    parent: "biaya",
    title: "Biaya",
    icon: <PaymentsRoundedIcon />,
    children: null,
    isAdmin: true,
  },
  {
    path: "/app/laporan",
    parent: "laporan",
    title: "Laporan",
    icon: <ReceiptLongRoundedIcon />,
    children: null,
    isAdmin: true,
  },
  {
    path: "/app/karyawan",
    parent: "karyawan",
    title: "Karyawan",
    icon: <PeopleRoundedIcon />,
    children: null,
    isAdmin: true,
  },
];

export default Menu;
