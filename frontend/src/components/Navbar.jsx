import { ControlOutlined, HomeOutlined } from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
import { useState } from "react";
import { Outlet } from "react-router";
import { Link } from "react-router-dom";
const { Header, Content, Sider } = Layout;
function getItem(label, key, icon, to) {
    return {
        label,
        key,
        icon,
        to,
    };
}
const items = [
    getItem("Home", "1", <HomeOutlined />, "/products"),
    getItem("Admin Panel", "2", <ControlOutlined />, "/adminpanel"),
];

const Navbar = () => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    return (
        <Layout
            style={{
                minHeight: "100vh",
            }}
        >
            <Sider
                collapsible
                collapsed={collapsed}
                onCollapse={(value) => setCollapsed(value)}
            >
                <div className="demo-logo-vertical" />
                <Menu
                    theme="dark"
                    defaultSelectedKeys={
                        window.location.pathname === "/adminpanel"
                            ? ["2"]
                            : ["1"]
                    }
                    mode="inline"
                >
                    {items.map((item) => (
                        <Menu.Item key={item.key} icon={item.icon}>
                            <Link to={item.to}>{item.label}</Link>
                        </Menu.Item>
                    ))}
                </Menu>
            </Sider>
            <Layout>
                <Header
                    style={{
                        padding: 0,
                        background: colorBgContainer,
                    }}
                />
                <Content
                    style={{
                        margin: "0 16px",
                    }}
                >
                    <div
                        style={{
                            padding: 24,
                            minHeight: 360,
                            background: colorBgContainer,
                        }}
                    >
                        <Outlet />
                    </div>
                </Content>
            </Layout>
        </Layout>
    );
};
export default Navbar;
