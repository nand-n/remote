"use client";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useState } from "react";
import { CiSettings } from "react-icons/ci";
import { useMediaQuery } from "react-responsive";
import { Icon } from "./common/icon";
import ToastMessage from "./common/toastMessage";
import useAuthStore from "@/lib/store/uistate/auth/login/useAuth";
import {
  AiOutlineClose,
  AiOutlineMenu,
  AiOutlineMenuFold,
  AiOutlineMenuUnfold,
  AiOutlineUser,
} from "react-icons/ai";
import { MdAnnouncement, MdDraw } from "react-icons/md";
import { FaFolder, FaUserFriends } from "react-icons/fa";
import { HiOutlineDocument } from "react-icons/hi";
import { BsPeopleFill } from "react-icons/bs";

interface MenuItem {
  key: string;
  label: string;
  icon: React.ReactNode;
  children?: MenuItem[]; // Optional array for submenu items
}
interface SideBarComponentProps {
  children: ReactNode;
}

const SideBar: React.FC<SideBarComponentProps> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileCollapsed, setMobileCollapsed] = useState(true);
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const { user } = useAuthStore();
  const [isUserMenuOpen, setUserMenuOpen] = useState(false);

  const router = useRouter();
  const pathName = usePathname();

  const toggleCollapsed = () => setCollapsed(!collapsed);

  const handleMenuClick = (e: string) => {
    router.push(e);
    if (isMobile) {
      setMobileCollapsed(true);
    }
  };

  const items: MenuItem[] = [
    {
      key: "/announcments",
      icon: <MdAnnouncement />,
      label: "Announcement",
    },
  ];

  if (user?.role === "admin" || user?.role === "super-admin") {
    items.push({
      key: "/tickets",
      label: "Tickets",
      icon: <FaFolder />,
      children: [
        {
          key: "/manage-announcment",
          label: "Manage Announcements",
          icon: <HiOutlineDocument />,
        },
        {
          key: "/draw",
          label: "Draw",
          icon: <MdDraw />,
        },
      ],
    });
  }

  if (user?.role === "super-admin") {
    items.push({
      key: "/users",
      label: "Users & Groups",
      icon: <BsPeopleFill />,
      children: [
        {
          key: "/users/user-list",
          label: "User List",
          icon: <FaUserFriends />,
        },
        {
          key: "/users/assign-admin",
          label: "Assign Admins",
          icon: <FaUserFriends />,
        },
      ],
    });
  }
  return (
    <div className="flex h-screen">
      <ToastMessage />
      <aside
        className={`bg-blue_gray text-white h-full transition-all duration-300 z-50 rounded-r-xl ${
          collapsed ? "w-20" : "w-80"
        } ${isMobile && mobileCollapsed ? "hidden" : "block"}`}
      >
        <div className="flex justify-between items-center mt-4 p-4">
          {!collapsed && <Icon src="/icons/logo.svg" alt="Logo" />}
          <button onClick={toggleCollapsed} className="p-2">
            {collapsed ? (
              <AiOutlineMenuUnfold size={20} />
            ) : (
              <AiOutlineMenuFold size={20} />
            )}
          </button>
        </div>

        <nav className="mt-8 mx-4">
          <ul>
            {items?.map((item) => (
              <li key={item.key}>
                {item?.children ? (
                  <>
                    <div className={`flex items-center p-3 `}>
                      <span>{item.icon}</span>
                      {!collapsed && <span className="ml-4">{item.label}</span>}
                    </div>
                  </>
                ) : (
                  <>
                    {" "}
                    <div
                      className={`flex items-center p-3 rounded-xl cursor-pointer ${
                        pathName.startsWith(item.key)
                          ? "bg-lime_green text-black font-semibold"
                          : "hover:bg-blue_gray_800"
                      }`}
                      onClick={() => handleMenuClick(item.key)}
                    >
                      <span>{item.icon}</span>
                      {!collapsed && <span className="ml-4">{item.label}</span>}
                    </div>
                  </>
                )}

                {item?.children && (
                  <ul className="bg-blue_gray_800 rounded-xl pb-3">
                    {item.children.map((subItem) => (
                      <li
                        key={subItem.key}
                        onClick={() => handleMenuClick(subItem.key)}
                        className={`flex items-center p-2 cursor-pointer py-4 rounded-2xl ${
                          pathName === subItem.key
                            ? "bg-lime_green text-black font-semibold"
                            : "hover:bg-blackBg"
                        }`}
                      >
                        <span>{subItem.icon}</span>
                        {!collapsed && (
                          <span className="ml-4">{subItem.label}</span>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      <main
        className={`transition-all duration-300 flex-1 p-6 h-full overflow-y-auto ${
          isMobile && "mt-4"
        }`}
      >
        {isMobile && (
          <button
            onClick={() => setMobileCollapsed(!mobileCollapsed)}
            className="p-2 bg-blue-500 text-black fixed top-2 left-4 z-50"
          >
            {mobileCollapsed && <AiOutlineMenu size={20} />}
            {!mobileCollapsed && collapsed && (
              <div className="text-white">
                <AiOutlineClose size={20} />
              </div>
            )}
          </button>
        )}
        <div className="fixed top-2 right-4 z-50">
          <button
            className="p-1 bg-gray-200 rounded-full "
            onClick={() => setUserMenuOpen(!isUserMenuOpen)}
          >
            <AiOutlineUser size={16} className="text-black" />
          </button>
          {isUserMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg">
              <ul className="p-2">
                <li className="py-2 px-4 hover:bg-gray-100 cursor-pointer">
                  Profile
                </li>
                <li className="py-2 px-4 hover:bg-gray-100 cursor-pointer">
                  Settings
                </li>
                <li className="py-2 px-4 hover:bg-gray-100 cursor-pointer">
                  Notifications
                </li>
                <li className="py-2 px-4 hover:bg-gray-100 cursor-pointer">
                  Logout
                </li>
              </ul>
            </div>
          )}
        </div>
        {children}
      </main>
    </div>
  );
};

export default SideBar;
