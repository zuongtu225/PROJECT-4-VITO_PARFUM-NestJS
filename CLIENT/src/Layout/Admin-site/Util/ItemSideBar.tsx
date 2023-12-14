import {
  PiCubeBold,
  PiScrollBold,
  PiStackBold,
  PiStackOverflowLogoBold,
  PiShootingStarBold,
  PiSlideshowBold,
  PiSignatureBold,
  PiWalletBold,
} from "react-icons/pi";
import { FiUsers } from "react-icons/fi";
import { SlLogout } from "react-icons/sl";

export const MenuItem = [
  {
    id: 1,
    path: "/admin/product",
    title: "Sản phẩm",
    icon: <PiCubeBold />,
  },
  { id: 2, path: "/admin/user", title: "Người dùng", icon: <FiUsers /> },
  { id: 3, path: "/admin/order", title: "Đơn hàng", icon: <PiScrollBold /> },
  { id: 4, path: "/admin/category", title: "Loại", icon: <PiStackBold /> },
  {
    id: 7,
    path: "/admin/brand",
    title: "Thương Hiệu",
    icon: <PiSignatureBold />,
  },
  { id: 10, path: "/admin/payment", title: "Payments", icon: <PiWalletBold /> },
  {
    id: 11,
    path: "/auth/login",
    title: "Đăng Xuất",
    icon: <SlLogout />,
  },
];
