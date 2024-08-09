import React from "react";
import { Link } from 'react-router-dom';
import TeacherLayout from "../Layout/TeacherLayout";
import { useState,useEffect } from "react";
import axios from "axios";
import { Table,Space,Button } from "antd";

function TeacherDashboard() {
    const [students, setStudents] = useState([]);
    const [initLoading, setInitLoading] = useState(true);
    
    const storedToken = localStorage.getItem("token");
    async function getStudents(){
        axios.get('http://localhost:4000/api/teacher/get-all-student',{
            headers: {
                Authorization: `Bearer ${storedToken}`,
            },
        })
        .then((response) => {
            console.log(response.data);
            setStudents(response.data);
            setInitLoading(false);
        })
        .catch((error) => {
            console.log(error);
        });
    
    }

    useEffect(() => {
        getStudents();
    }, []);
    
const columns = [
    {
      title: 'Name',
      dataIndex: 'full_name',
      key: 'full_name',
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      key: 'gender',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    
    {
        title: "Action",
        key: "action",
  
        render: (item, record, index) => (
          <Space size="middle">
            <Button key='more' href={`/teacher/student/${record.id}`}> MORE</Button>
          </Space>
        ),
      },
  ];
  
  
  
  return (
      <div className="container">
            <h1>Teacher Dashbooard</h1>
            <Table dataSource={students} columns={columns} loading={initLoading}/>;
        </div>
    );

}

export default TeacherDashboard;