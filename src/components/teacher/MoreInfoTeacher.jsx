import { useLocation } from "react-router-dom";
import axios from "axios";
import { Button, message, Modal,Form,Select,Input } from "antd";
import { useEffect, useState } from "react";
import { Line } from '@ant-design/charts'
const {Option} = Select

function MoreInfoTeacher() {
    const location = useLocation();
    const studentID = location.pathname.split('/')[3];
    const [name, setName] = useState("");
    const [week1, setWeek1] = useState(0);
    const [week2, setWeek2] = useState(0);
    const [week3, setWeek3] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [data, setData] = useState([])
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const onFinish = (values) => {
        console.log(values);
        axios.put('http://localhost:4000/api/teacher/update-student/' + studentID, values)
            .then((result) => {
                console.log(result.data);
                message.success("Student details updated successfully");
                getStudent();
                setIsModalOpen(false);
            })
            .catch((error) => {
                console.log(error);
                message.error("Error updating student details");
            });
    }

    // const data = 
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
    async function getStudent() {

        axios.get('http://localhost:4000/api/teacher/get-student/' + studentID)
            .then((result) => {
                console.log(result.data);

                setName(result.data.full_name);
                setWeek1(result.data.scores["Week 1"]);
                setWeek2(result.data.scores["Week 2"]);
                setWeek3(result.data.scores["Week 3"]);
                setData([
                    { week: "Week 1", value: result.data.scores["Week 1"] },
                    { week: "Week 2", value: result.data.scores["Week 2"]},
                    { week: "Week 3", value: result.data.scores["Week 3"] },
                ])
            })
            .catch((error) => {
                console.log(error);
                message.error("Error getting student details");
            });
    }

    useEffect(() => {
        getStudent();
    }, []);
    return (
        <div>
            <h1>Name: {name}</h1>
            <p>Week 1: {week1}</p>
            <p>Week 2: {week2}</p>
            <p>Week 3: {week3}</p>
            <Line {...config} />

            <Button onClick={showModal}> Add Score</Button>
            <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <Form onFinish={onFinish}>
                    <Form.Item
                        label="Week"
                        name="week"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your week!',
                            },
                        ]}
                    >
                        <Select
                            placeholder="Select a week"
                            allowClear
                        >
                            <Option value="Week 1">Week 1</Option>
                            <Option value="Week 2">Week 2</Option>
                            <Option value="Week 3">Week 3</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="Score"
                        name="score"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your score!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )

}

export default MoreInfoTeacher;