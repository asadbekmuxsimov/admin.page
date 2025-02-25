import {
  LeftCircleOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, Button } from "antd";
import React from "react";
import useAuthStore from "../myStore";
import Dropdown from "antd/es/dropdown/dropdown";
import LoginPage from "../pages/LoginPage";

function Navbar({ setCollapsed, collapsed }) {
  const stateAuth = useAuthStore();
  return (
    <nav className="bg-slate-800 h-16 text-white text-2xl flex justify-between items-center p-2 px-20">
      <div className="flex gap-4 items-center justify-center ">
        <Button
          type="primary"
          onClick={() => {
            setCollapsed(!collapsed);
          }}
        >
          {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </Button>
        <p>Logo</p>
      </div>
      <Dropdown
        menu={{
          items: [
            {
              key: 1,
              label: "Sozlamalar",
              icon: <LeftCircleOutlined />,
            },
            {
              key: 2,
              label: "Profilim",
              icon: <LeftCircleOutlined />,
            },
            {
              key: 3,
              label: "Chiqish",
              icon: <LeftCircleOutlined />,
              danger: true,
              onClick: () => {
                localStorage.removeItem("auth");
                stateAuth.setAuth({
                  token: "",
                  user: null,
                });
              },
            },
          ],
        }}
      >
        <div className="flex gap-3 items-center">
          <Avatar size="large" icon={<UserOutlined />} />
          <div className="flex flex-col">
            <div>
              {stateAuth.user?.firstName} {stateAuth.user?.lastName}{" "}
            </div>
            <div>@{stateAuth.user?.username}</div>
          </div>
        </div>
      </Dropdown>
    </nav>
  );
}

export default Navbar;
