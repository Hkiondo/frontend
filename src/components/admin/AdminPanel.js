import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Table, Space, Button, Popconfirm, message } from "antd";

function AdminPanel() {
  const text = "Are you sure to delete this User?";
  const [users, setusers] = useState([]);
  const handleDelete = async (id) => {
    axios
      .delete("http://localhost:4000/api/users/delete/" + id)
      .then((result) => {
        message.success("User deleted");
        getAllUsers();
      })
      .catch((error) => {
        message.error("Error deleting");
      });
    // fetch(serverHost + "/tasks/" + id, {
    //   method: "DELETE",
    // })
    //   .then((res) => res.text())
    //   .then((res) => console.log(res));
    // getTask();
  };

  const columns = [
    {
      title: "Name",
      key: "full_name",
      dataIndex: "full_name",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Residence",
      dataIndex: "residence",
      key: "residence",
    },
    {
      title: "Action",
      key: "action",

      render: (item, record, index) => (
        <Space size="middle">
          <Button key='more' href={`/admin/users/${record.id}`}> MORE</Button>
          <Popconfirm
            placement="bottom"
            title={text}
            onConfirm={() => {
              handleDelete(record.id);
            }}
            okText="Yes"
            cancelText="No"
          >
            <Button>DELETE</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  function getAllUsers() {
    axios
      .get("http://localhost:4000/api/users/get-all-users")
      .then((result) => {
        console.log(result.data);
        setusers(result.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <div className="container">
      <h1>Admin Panel</h1>
      <div>
        <Table key="table" columns={columns} dataSource={users} />
      </div>
      {/* <nav>
            <Link to="/admin/users">User Management</Link>
            <Link to="/admin/content">Content Management</Link>
        </nav> */}
    </div>
  );
}

export default AdminPanel;
