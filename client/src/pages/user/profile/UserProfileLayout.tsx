import type { MenuProps } from "antd";
import { Menu } from "antd";

import React, { useState } from "react";
import NavbarCom from "../../../components/user/NavbarCom";
import {
  SettingOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import BreadCrumb from "../../../helper/BreadCrumb";

type MenuItem = Required<MenuProps>["items"][number];
function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group"
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}
const UserProfileLayout = () => {
  const items: MenuItem[] = [
    getItem("Prodfile", "profile", <UserOutlined />),
    getItem("Order", "order", <ShoppingCartOutlined />),
    getItem("Setting", "setting", <SettingOutlined />),
  ];
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const params = useParams();
  const endpoint = window.location.pathname.split("/")[3];

  const handleMenuClick = (key: React.Key) => {
    navigate(`/user/${params.id}/${key}`);
  };
  return (
    <div>
      <NavbarCom />
      <div className="pt-20 mx-auto w-10/12 ">
        <BreadCrumb />

        <div className="flex gap-8 mt-8">
          <div className="w-2/12 relative ">
            <Menu
              defaultSelectedKeys={[`${endpoint}`]}
              defaultOpenKeys={["sub1"]}
              mode="inline"
              theme="dark"
              inlineCollapsed={collapsed}
              items={items}
              className="rounded-md p-4 sticky top-20  mt-12 min-h-[50vh]"
              onClick={({ key }) => handleMenuClick(key)}
            />
          </div>
          <div className="w-10/12">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileLayout;
