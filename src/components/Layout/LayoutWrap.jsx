import React, { useState, useEffect } from "react";
import { useJwt } from "react-jwt";

import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  HomeOutlined,
  LineChartOutlined,
  CalendarOutlined,
  LogoutOutlined,
  MessageOutlined,
  TeamOutlined,
  BookOutlined,
  ManOutlined,
  WomanOutlined,
  UsergroupAddOutlined
} from "@ant-design/icons";
import { Button, Layout, Menu, theme, message } from "antd";
import { Link } from "react-router-dom";
import axios from "axios";
const { Header, Sider, Content } = Layout;

const LayoutWrap = ({ children, setLoggedIn }) => {
  function logout() {
    axios
      .post("http://localhost:4000/api/auth/logout")
      .then((result) => {
        console.log(result);
        message.success("Logged out successfully");
        localStorage.removeItem("token");
        setLoggedIn(false);
        window.location.href = "/";
      })
      .catch((error) => {
        message.error("Error logging out");
        console.log(error);
      });
  }

  const [token, setToken] = useState("");
  const [role, setRole] = useState("");
  //   const [loggedIn, setLoggedIn] = useState(false);

  function verifyToken() {
    const storedToken = localStorage.getItem("token");
    // console.log("Stored token:", storedToken);

    if (!storedToken) {
      console.log("No token found in localStorage");
      setLoggedIn(false);
      return;
    }

    setToken(storedToken);

    axios
      .get("http://localhost:4000/api/auth/verify-token", {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      })
      .then((response) => {
        // console.log("Response data:", response.data);
        setRole(response.data);
        setLoggedIn(true);
      })
      .catch((error) => {
        console.log("Error:", error);
        setLoggedIn(false);
        logout();
      });
  }

  useEffect(() => {
    verifyToken();
  }, []);

  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
          <Menu.Item key="1" icon={<HomeOutlined />}>
            <Link to="/">Home</Link>
          </Menu.Item>
          {role === "Student" && (
            <Menu.Item key="2" icon={<BookOutlined />}>
              <Link to="/lessons">Lessons</Link>
            </Menu.Item>
          )}
          {/* {role !== "Admin" && (
            <Menu.Item key="3">
              <Link to="/activities">Activities</Link>
            </Menu.Item>
          )} */}
          {role !== "Admin" && (
            <Menu.Item key="4" icon={<UserOutlined />}>
              <Link to="/profile">User Profile</Link>
            </Menu.Item>
          )}
          {role === "Student" && (
            <Menu.Item key="6">
              <Link to="/gamification">Gamification</Link>
            </Menu.Item>
          )}
          {role === "Student" && (
            <Menu.Item key="7" icon={<LineChartOutlined />}>
              <Link to="/progress">Progress</Link>
            </Menu.Item>
          )}
          {role === "Student" && (
            <Menu.Item key="8" icon={<CalendarOutlined />} disabled={true}>
              <Link to="/schedule">Schedule</Link>
            </Menu.Item>
          )}
          {role === "Admin" && (
            <Menu.Item key="9" icon={<TeamOutlined />}>
              <Link to="/admin">Admin Panel</Link>
            </Menu.Item>
          )}
          {role === "Teacher" && (
            <Menu.Item key="11" icon={<UserOutlined />}>
              <Link to="/teacher/student">Teacher Dashboard</Link>
            </Menu.Item>
          )}

          {role === "Teacher" && (
            <Menu.Item key="13" icon={<UserOutlined />}>
              <Link to="/teacher/manage-content">Manage Content</Link>
            </Menu.Item>
          )}

          {/* <Menu.Item key="5" icon={<MessageOutlined />}>
            <Link to="/example">Example</Link>
          </Menu.Item> */}

          {/* {role === "Admin" && (
            <Menu.Item key="10" icon={<UsergroupAddOutlined />}>
              <Link to="/admin/teachers">Teachers</Link>
            </Menu.Item>
          )}

          {role === "Admin" && (
            <Menu.Item key="5" icon={<UsergroupAddOutlined />}>
              <Link to="/admin/students">Students</Link>
            </Menu.Item>
          )} */}

          <Menu.Item key="12" icon={<LogoutOutlined />} onClick={logout}>
            Logout
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};
export default LayoutWrap;
