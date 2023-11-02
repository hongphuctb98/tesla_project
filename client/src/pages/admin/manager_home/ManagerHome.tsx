import {
  BellOutlined,
  CarOutlined,
  HomeOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Avatar, Input, Layout, Menu } from "antd";
import React, { useState } from "react";
import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";

const { Header, Content, Footer, Sider } = Layout;
type MenuItem = Required<MenuProps>["items"][number];
function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}
const ManagerHome: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const items: MenuItem[] = [
    getItem("Dashboad", "dashboard", <HomeOutlined />),
    getItem("User", "users", <UserOutlined />),
    getItem("Product", "product", <CarOutlined />),
    getItem("Order", "order", <ShoppingCartOutlined />),
    getItem("Team", "team", <TeamOutlined />, [
      getItem("Team 1", "6"),
      getItem("Team 2", "8"),
    ]),
  ];

  const handleMenuClick = (key: React.Key) => {
    navigate(`/admin/${key}`);
  };

  const toggleDropdown = () => {
    setIsOpen(true);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };
  const handleSignOut = () => {
    navigate("/admin/login");
  };
  return (
    <>
      <Layout hasSider className="admin-page">
        <Sider
          className="top-0 left-0 min-h-screen max-h-screen "
          style={{ position: "sticky" }}
        >
          <Link className="flex tems-center p-2 justify-center " to={"/"}>
            <img
              className="w-[60px]"
              src="https://www.carlogos.org/car-logos/tesla-logo-2007.png"
              alt="Your Company"
            />
          </Link>

          <Menu
            defaultSelectedKeys={[`${location.pathname.split("/")[2]}`]}
            // defaultOpenKeys={["sub1"]}
            className="mt-4"
            mode="inline"
            theme="dark"
            inlineCollapsed={collapsed}
            items={items}
            onClick={({ key }) => handleMenuClick(key)}
          />
        </Sider>
        <Layout className="site-layout min-h-screen ">
          <Header className="bg-white flex justify-between sticky top-0 z-20">
            <div className="w-2/5">
              <Input
                size="large"
                placeholder="Search"
                prefix={<SearchOutlined />}
              />
            </div>
            <div className="flex gap-4 ">
              <div>
                <BellOutlined className="text-xl " />
              </div>
              <div className="flex items-center">
                <Avatar
                  src={
                    <img
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      alt="avatar"
                    />
                  }
                />
                <div
                  className="relative inline-block ml-2"
                  onMouseEnter={toggleDropdown}
                  onMouseLeave={closeDropdown}
                >
                  <div className="cursor-pointer font-semibold text-[18px]">
                    Admin Account
                  </div>

                  {isOpen && (
                    <div
                      className="absolute right-0 z-10 mt-[-5px] origin-top-right bg-white border border-gray-300 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none w-[170px]"
                      onMouseEnter={toggleDropdown}
                      onMouseLeave={closeDropdown}
                    >
                      <ul>
                        <li
                          className="leading-9 hover:bg-gray-100 cursor-pointer px-2 text-[14px] rounded-md flex items-center
                        text-gray-600"
                        >
                          <i className="fa-solid fa-circle-user mr-1 text-[18px] "></i>
                          Profile
                        </li>
                        <li
                          className="leading-9 hover:bg-gray-100 cursor-pointer px-2 text-[14px] rounded-md flex items-center
                        text-gray-600"
                        >
                          <i className="fa-solid fa-gear  mr-1 text-[18px] "></i>
                          Profile
                        </li>
                        <li
                          className="leading-9 hover:bg-gray-100 cursor-pointer px-2 text-[14px] rounded-md flex items-center text-rose-400"
                          onClick={handleSignOut}
                        >
                          <i className="fa-solid fa-arrow-right-from-bracket mr-1 text-[18px] "></i>
                          Profile
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Header>
          <Content
            style={{ margin: "24px 16px 0", overflow: "initial" }}
            className="bg-white"
          >
            <div className="site-layout-background " style={{ padding: 24 }}>
              <Outlet />
            </div>
          </Content>
          <Footer style={{ textAlign: "center" }}>
            Ant Design ©2018 Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
    </>
  );
};

export default ManagerHome;
