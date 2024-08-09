import { LockOutlined, UserOutlined, MailOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, message } from "antd";
import React from "react";
import axios from "axios";
// import { Link } from "react-router-dom";
//import {useHistory} from "react-router-dom"

const Login = ({ setLoggedIn }) => {
  // const history = useHistory();

  const onFinish = async (values) => {
    // console.log("Received values of form: ", values);
    // axios
    //   .post("http://localhost:4000/api/auth/login-user", values)
    //   .then((result) => {
    //     message.success("Login successful");
    //     setLoggedIn(true);
    //     // console.log(result;

    //     console.log(result);
    //     localStorage.setItem("token", result.data.token);

    //     //history.push('/home');
    //   })

    //   .catch((error) => {
    //     console.log(error.response.data);
    //     message.error(error.response.data);
    //   });
    axios
      .post("http://localhost:4000/api/auth/login-user", values)
      .then((result) => {
        message.success("Login successful");
        console.log("Login result:", result);

        if (result.data.token) {
          localStorage.setItem("token", result.data.token);
          console.log("Token stored in localStorage:", result.data.token);
        } else {
          console.log("Token not found in response");
        }

        setLoggedIn(true);
        //history.push('/home');
      })
      .catch((error) => {
        console.log("Login error:", error.response.data);
        message.error(error.response.data);
      });
  };
  return (
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
    >
      <Form.Item
        name="Email"
        rules={[
          {
            type: "email",
            message: "Please enter a valid email!",
          },
          {
            required: true,
            message: "Please input your Email!",
          },
        ]}
      >
        <Input
          prefix={<MailOutlined className="site-form-item-icon" />}
          placeholder="Email"
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: "Please input your Password!",
          },
        ]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>
      <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <a className="login-form-forgot" href="">
          Forgot password
        </a>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Log in
        </Button>
        Or <a href="/register">Register now!</a>
      </Form.Item>
    </Form>
  );
};
export default Login;
