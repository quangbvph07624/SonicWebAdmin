import React from "react";
import "../assets/less/App.less";
import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";
import {
  AppstoreOutlined,
  MobileOutlined,
  ApiOutlined,
  LaptopOutlined,
  AppstoreAddOutlined,
  AuditOutlined,
  LineChartOutlined,
  LogoutOutlined,
  ShoppingOutlined,
} from "@ant-design/icons";
import history from "../services/history";
const { Sider } = Layout;
const { SubMenu } = Menu;

const Sidebar = () => {
  return (
    <Sider
      width={242}
      style={{
        // background: "#333132",
        overflow: "auto",
        position: "fixed",
        height: "100%",
        marginTop: 50,
      }}
    >
      <div className="logo" />
      <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
        <SubMenu key="1" icon={<AppstoreOutlined />} title="Sản phẩm">
          <Menu.Item key="/home" icon={<ShoppingOutlined />}>
            <Link to="/home">Tất cả sản phẩm</Link>
          </Menu.Item>
          <Menu.Item key="/phone" icon={<MobileOutlined />}>
            <Link to="/phone">Điện thoại</Link>
          </Menu.Item>
          <Menu.Item key="/laptop" icon={<LaptopOutlined />}>
            <Link to="/laptop">Laptop</Link>
          </Menu.Item>
          <Menu.Item key="/gear" icon={<ApiOutlined />}>
            <Link to="/gear">Phụ kiện</Link>
          </Menu.Item>
        </SubMenu>
        <Menu.Item key="/addproduct" icon={<AppstoreAddOutlined />}>
          <Link to="/addproduct">Thêm sản phẩm</Link>
        </Menu.Item>
        <Menu.Item key="/bill" icon={<AuditOutlined />}>
          <Link to="/bill">Quản lí hóa đơn</Link>
        </Menu.Item>
        <Menu.Item key="/" icon={<LineChartOutlined />}>
          <Link to="/">Thống kê</Link>
        </Menu.Item>

        <Menu.Item key="9" icon={<LogoutOutlined />}>
          <a
            href="/login"
            onClick={() => {
              localStorage.clear();
              history.push("/login");
            }}
          >
            ĐĂNG XUẤT
          </a>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};
export default Sidebar;
