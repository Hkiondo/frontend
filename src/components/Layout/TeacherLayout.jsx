import React from 'react';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { Link } from 'react-router-dom';
const { Header, Content, Footer } = Layout;
// const items = new Array(3).fill(null).map((_, index) => ({
//   key: String(index + 1),
//   label: `nav ${index + 1}`,
// }));
const TeacherLayout = ({ children }) => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    return (
        <Layout>
            <Header
                style={{
                    position: 'sticky',
                    top: 0,
                    zIndex: 1,
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                }}
            >
                <div className="demo-logo" />
                <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={['1']}
                    //   items={items}
                    style={{
                        flex: 1,
                        minWidth: 0,
                    }}
                >
                    <Menu.Item key="1">
                        <Link to="/teacher/students">View Students</Link>
                    </Menu.Item>

                    <Menu.Item key="2">
                        <Link to="/teacher/manage-content">Manage Content</Link>
                    </Menu.Item>
                </Menu>
            </Header>
            <Content
                style={{
                    padding: '0 48px',
                }}
            >
                <div
                    style={{
                        padding: 24,
                        minHeight: 380,
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                    }}
                >
                    {children}
                </div>
            </Content>
            <Footer
                style={{
                    textAlign: 'center',
                }}
            >
                SupaLana Learning System ©{new Date().getFullYear()} 
            </Footer>
        </Layout>
    );
};
export default TeacherLayout;