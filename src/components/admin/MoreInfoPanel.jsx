import { useLocation } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Descriptions, Form, Input, Select, message } from "antd";
const { Option } = Select;
function MoreInfoPanel() {
  const location = useLocation();
  const userid = location.pathname.split("/")[3];

  const [items, setItems] = useState([]);
  const [form] = Form.useForm();
  const [disabled, setDisabled] = useState(true);
  const onFinish = (values) => {
    console.log(values);
    axios
      .post("http://localhost:4000/api/admin/assign-course/" + userid, values)
      .then((result) => {
        console.log(result.data);
        message.success("Course assigned successfully");
        setDisabled(true);
        getUserInfo();
      })
      .catch((error) => {
        console.log(error);
        message.error("Error assigning course");
      });
  };

  async function getUserInfo() {
    axios
      .get("http://localhost:4000/api/admin/get-user/" + userid)
      .then((result) => {
        console.log(result.data);

        setItems([
          {
            key: "1",
            label: "Full Name",
            children: result.data.full_name,
          },
          {
            key: "2",
            label: "Telephone",
            children: result.data.phone,
          },
          {
            key: "3",
            label: "Gender",
            children: result.data.gender,
          },
          {
            key: "4",
            label: "Address",
            // span: 2,
            children: result.data.residence,
          },
          {
            key: "5",
            label: "Role",
            children: result.data.role,
          },
          {
            key: "6",
            label: "Email",
            children: result.data.email,
          },
          {
            key: "7",
            label: "Course",
            children: result.data.courses || "None",
          },
        ]);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <div>
      <Descriptions title="User Info" layout="vertical" items={items} />
      <Button onClick={() => setDisabled(!disabled)}> Assign Course</Button>

      <Form name="Courses" onFinish={onFinish} disabled={disabled}>
        <Form.Item
          name="course"
          label="course"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select
            placeholder="Select a option and change input text above"
            allowClear
          >
            <Option value="CreativeArts">CreativeArts</Option>
            <Option value="Mathematics">Mathematics</Option>
            <Option value="EmotionalRec">EmotionalRecognition</Option>
          </Select>
        </Form.Item>

        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default MoreInfoPanel;
