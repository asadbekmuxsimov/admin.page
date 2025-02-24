import { FolderAddOutlined, ProductOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

function Sidebar({ collapsed }) {
    const location = useLocation()
    const navigate = useNavigate()
    return (
        <Menu
            defaultSelectedKeys={[location.pathname]}
            defaultOpenKeys={["sub1"]}
            mode="inline"
            theme="dark"
            className="h-full"
            style={{
                padding: 4,
                maxWidth: 200,
            }}
            inlineCollapsed={collapsed}
            items={[
                {
                    key: "/",
                    label: <Link to={"/"}>Asosiy</Link>,
                    icon: <ProductOutlined />,
                },
                {
                    key: "/products",
                    label: "Mahsulotlar",
                    icon: <ProductOutlined />,
                    onClick: () => {
                        navigate("/products")
                    }
                },
                {
                    key: "/categories",
                    label: "Kategoriyalar",
                    icon: <FolderAddOutlined />,
                    onClick: () => {
                        navigate("/categories")
                    }
                },
            ]}
        />
    );
}

export default Sidebar;
