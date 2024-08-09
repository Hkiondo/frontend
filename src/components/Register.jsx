import {
  AutoComplete,
  Button,
  Cascader,
  Checkbox,
  Col,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  message,
} from "antd";

import axios from "axios";
import React, { useState } from "react";
const { Option } = Select;
const residences = [
  {
    value: "Nairobi",
    label: "Nairobi",
    // children: [
    //   {
    //     value: "Kiambu",
    //     label: "Kiambu",
    //     children: [
    //       {
    //         value: "Eldoret",
    //         label: "Eldoret",
    //       },
    //     ],
    //   },
    // ],
  },
  {
    value: "Kiambu",
    label: "Kiambu",
  },
  {
    value: "Mombasa",
    label: "Mombasa",
  },
  {
    value: "Kilifi",
    label: "Kilifi",
  },
  {
    value: "Eldoret",
    label: "Eldoret",
  },
  {
    value: "Kakamega",
    label: "Kakamega",
  },
];
const roles = [
  {
    value: "Teacher",
    label: "Teacher",
  },
  {
    value: "Parent",
    label: "Parent",
  },
  {
    value: "Student",
    label: "Student",
  },
];

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};
const Register = () => {
  const [form] = Form.useForm();
  const onFinish = async (values) => {
    console.log("Received values of form: ", values);
    // axios.post("http://localhost:4000/register-user", values);
    axios
      .post("http://localhost:4000/api/auth/register-user", values)

      .then((result) => {
        console.log("Success");
        console.log(result.data.message);
        message.success(result.data.message);
        // console.log(result.data);
        // message.success(result.response.data.message);
      })
      .catch((error) => {
        console.log("Error");
        console.log(error);
        console.log(error.response.data.message);
        message.error(error.response.data.message);
      });
    // await fetch("http://localhost:4000/register-user", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(values),
    // });
  };
  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select
        style={{
          width: 90,
        }}
      ></Select>
    </Form.Item>
  );

  return (
    <Form
      {...formItemLayout}
      form={form}
      name="register"
      onFinish={onFinish}
      initialValues={{
        prefix: "+254",
      }}
      scrollToFirstError
    >
      <Form.Item
        name="full_name"
        label="Full name"
        rules={[
          {
            required: true,
            message: "Please input your full name!",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="email"
        label="E-mail"
        rules={[
          {
            type: "email",
            message: "The input is not valid E-mail!",
          },
          {
            required: true,
            message: "Please input your E-mail!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="password"
        label="Password"
        rules={[
          {
            required: true,
            message: "Please input your password!",
          },
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="confirm"
        label="Confirm Password"
        dependencies={["password"]}
        hasFeedback
        rules={[
          {
            required: true,
            message: "Please confirm your password!",
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject(
                new Error("The two passwords that you entered do not match!")
              );
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="role"
        label="Role"
        rules={[
          {
            // type: "array",
            required: true,
            message: "Please select your role!",
          },
        ]}
      >
        <Cascader options={roles} />
      </Form.Item>

      <Form.Item
        name="residence"
        label="Habitual Residence"
        rules={[
          {
            // type: "array",
            required: true,
            message: "Please select your habitual residence!",
          },
        ]}
      >
        <Cascader options={residences} />
      </Form.Item>

      <Form.Item
        name="phone"
        label="Phone Number"
        rules={[
          {
            required: true,
            message: "Please input your phone number!",
          },
        ]}
      >
        <Input
          addonBefore={prefixSelector}
          style={{
            width: "100%",
          }}
        />
      </Form.Item>

      <Form.Item
        name="gender"
        label="Gender"
        rules={[
          {
            required: true,
            message: "Please select gender!",
          },
        ]}
      >
        <Select placeholder="select your gender">
          <Option value="male">Male</Option>
          <Option value="female">Female</Option>
          <Option value="other">Other</Option>
        </Select>
      </Form.Item>

      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">
          Register
        </Button>
        Or <a href="/">Login now!</a>
      </Form.Item>
    </Form>
  );
};
export default Register;
