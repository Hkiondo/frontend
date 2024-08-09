import { Line } from "@ant-design/plots";
import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { message } from "antd";
// import ReactDOM from "react-dom";

const ProgressBar = () => {

  const [week1, setWeek1] = useState(0);
  const [week2, setWeek2] = useState(0);
  const [week3, setWeek3] = useState(0);
  // const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState([])
  const token = localStorage.getItem("token");

  async function getProgress() {

    axios.get('http://localhost:4000/api/student/get-progress', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        console.log(response.data);
        setData([
          { week: "Week 1", value: response.data.scores["Week 1"] },
          { week: "Week 2", value: response.data.scores["Week 2"] },
          { week: "Week 3", value: response.data.scores["Week 3"] },
        ])
      })
      .catch((error) => {
        console.log(error);
        message.error("Error getting progress");
      });
  }

  useEffect(()=>{
    getProgress();
  },[])


  const config = {
    data,
    xField: "week",
    yField: "value",
    point: {
      shapeField: "square",
      sizeField: 4,
    },
    interaction: {
      tooltip: {
        marker: false,
      },
    },
    style: {
      lineWidth: 2,
    },
  };
  return <Line {...config} />;
};

export default ProgressBar;
