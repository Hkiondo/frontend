import React, { useEffect, useState } from "react";
import { Descriptions } from "antd";
// import { UserContext } from "../context/UserContext";
import axios from "axios";

const UserProfile = () => {
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(null);
  const [items, setItems] = useState([]);

  function getProfile() {
    console.log("Getting profile");
    axios
      .get("http://localhost:4000/api/users/profile", {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      })
      .then((response) => {
        setUser(response.data);
        console.log("Response data:", response.data);

        setItems([
          {
            key: "1",
            label: "Full Name",
            children: response.data.full_name,
          },
          {
            key: "2",
            label: "Telephone",
            children: response.data.phone,
          },
          {
            key: "3",
            label: "Gender",
            children: response.data.gender,
          },
          {
            key: "4",
            label: "Address",
            // span: 2,
            children: response.data.residence,
          },
          {
            key: "5",
            label: "Role",
            children: response.data.role,
          },
          {
            key: "6",
            label: "Email",
            children: response.data.email,
          },
          {
              key: "7",
              label: "Course",
              children: response.data.courses || "None",
          }
        ]);
      })
      .catch((error) => console.error(error));
  }

  useEffect(() => {
    getProfile();
  }, []);

  useEffect(() => {
    console.log("User state updated:", user);
  }, [user]);

  if (!user) return <div>Loading...</div>;
  else {
    return <Descriptions title="User Info" layout="vertical" items={items} />;
  }
};
export default UserProfile;
