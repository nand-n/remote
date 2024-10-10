"use client";
import { Layout, Menu, MenuProps, theme } from "antd";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import { CiSettings } from "react-icons/ci";
import { useMediaQuery } from "react-responsive";
import { Icon } from "./commons/icon";

const { Content, Sider } = Layout;
type MenuItems = Required<MenuProps>["items"][number];
const items: MenuItems[] = [
  {
    key: "/systems",
    label: "Systems",
    icon: <Icon src={"/icons/folder.svg"} alt="logo" width={20} height={20} />,
    className: "font-bold",
    children: [
      {
        key: "/system-code",
        label: "System Code",
        icon: (
          <Icon src={"/icons/submenu.svg"} alt="logo" width={20} height={20} />
        ),
        className: "font-bold",
      },
      {
        key: "/properties",
        label: "Properties",
        icon: (
          <Icon src={"/icons/submenu.svg"} alt="logo" width={20} height={20} />
        ),
        className: "font-bold",
      },
      {
        key: "/menues",
        label: "Menus",
        icon: (
          <Icon src={"/icons/submenu.svg"} alt="logo" width={20} height={20} />
        ),
        className: "font-bold",
      },
      {
        key: "/api-lists",
        label: "API Lists",
        icon: (
          <Icon src={"/icons/submenu.svg"} alt="logo" width={20} height={20} />
        ),
        className: "font-bold",
      },
    ],
  },

  {
    key: "/users-and-groups",
    label: "Users & Groups",
    icon: <CiSettings />,
    className: "font-bold",
  },
  {
    key: "/competition",
    label: "Competition",
    icon: <CiSettings />,
    className: "font-bold",
  },
];

interface SideBarComponentProps {
  children: ReactNode;
}

const SideBar: React.FC<SideBarComponentProps> = ({ children }) => {
  const { token } = theme.useToken();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileCollapsed, setMobileCollapsed] = useState(true);
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  const router = useRouter();

  const toggleCollapsed = () => setCollapsed(!collapsed);

  const handleMenuClick = (e: { key: string }) => {
    router.push(e.key);
    if (isMobile) {
      setMobileCollapsed(true);
    }
  };

  useEffect(() => {
    if (isMobile) {
      setMobileCollapsed(true);
    }
  }, [isMobile]);

  return (
    <Layout>
      <Sider
        theme="dark"
        width={280}
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
          zIndex: 1000,
          background: "primary",
          transform: isMobile && mobileCollapsed ? "translateX(-100%)" : "none",
          transition: "transform 0.3s ease",
        }}
        trigger={null}
        collapsible
        collapsed={collapsed}
        collapsedWidth={!isMobile ? 80 : 0}
      >
        <div className="flex justify-between p-4">
          <div className="flex items-center gap-2">
            {!collapsed && <Icon src={"/icons/logo.svg"} alt="logo" />}
          </div>

          <div
            onClick={toggleCollapsed}
            className="text-white text-xl cursor-pointer p-4 "
          >
            {collapsed ? (
              <Icon
                src={"/icons/expand.svg"}
                alt="logo"
                width={20}
                height={20}
              />
            ) : (
              <Icon
                src={"/icons/collapse.svg"}
                alt="logo"
                width={20}
                height={20}
                className="text-white"
              />
            )}
          </div>
        </div>
        <div className={`mt-28 text-black m-4 rounded-xl p-4 bg-blue_gray_800`}>
          <Menu
            mode="inline"
            defaultSelectedKeys={["/systems"]}
            items={items}
            theme="dark"
            defaultOpenKeys={["/systems"]}
            style={{
              background: "transparent",
            }}
            inlineCollapsed={collapsed}
            className="my-5"
            onClick={handleMenuClick}
          />
        </div>
      </Sider>

      <Layout style={{ marginLeft: collapsed ? 0 : 280 }}>
        <Content
          style={{
            padding: "24px",
            minHeight: "100vh",
            background: token.colorBgContainer,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default SideBar;
