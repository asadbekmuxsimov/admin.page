import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React from "react";
import useAuthStore from "../myStore";

function Navbar({ setCollapsed, collapsed }) {
    const stateAuth = useAuthStore()
    return (
        <nav className="bg-slate-800 h-16 text-white text-2xl flex justify-between items-center p-2 px-20">
            <div className="flex gap-4 items-center">
                <Button
                    type="primary"
                    onClick={() => {
                        setCollapsed(!collapsed);
                    }}
                    style={{
                        marginBottom: 16,
                    }}
                >
                    {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                </Button>
                <p>Logo</p>
            </div>
            <p>{stateAuth.user.username}</p>
        </nav>
    );
}

export default Navbar;
