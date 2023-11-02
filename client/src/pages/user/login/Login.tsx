import React from "react";
import { Button, Checkbox, Form, Input } from "antd";
import { Link, useNavigate } from "react-router-dom";
import "./login.css";
import axios from "axios";
import { handleAlert } from "../../../utils/HandleAlert";

type FieldType = {
  email?: string;
  password?: string;
  remember?: string;
};

const Login: React.FC = () => {
  const navigate = useNavigate();
  const onFinish = (values: any) => {
    axios
      .post("http://localhost:8080/api/v1/auth/login", {
        email: values.email,
        passwords: values.password,
      })
      .then((res) => {
        localStorage.setItem("loginUser", JSON.stringify(res.data.data));
        handleAlert("Login success!", "", "success").then(() => {
          navigate("/");
        });
      })
      .catch((err) => {
        handleAlert("Sorry!", `${err.response.data.userMsg}`, "error");
      });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div>
      <div className="w-11/12 mx-auto mt-5">
        <Link className="flex flex-shrink-0 items-center" to={"/"}>
          <img
            className="h-8  w-16"
            src="https://www.carlogos.org/car-logos/tesla-logo-2007.png"
            alt="Your Company"
          />
        </Link>
      </div>
      <div className="w-1/5 mx-auto login-section">
        <h1 className="pt-10 pb-12 text-4xl ">Sign In</h1>
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          layout="vertical"
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          requiredMark={false}
        >
          <Form.Item<FieldType>
            label="Email address"
            name="email"
            labelCol={{ span: 24 }}
            rules={[
              { required: true, message: "Please input your email!" },
              {
                type: "email",
                message: "The input is not valid E-mail!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="Password"
            name="password"
            rules={[
              { required: true, message: "Please input your password!" },
              {
                pattern:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
                message:
                  "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <div className="flex justify-between items-center rememer-wrapper">
            <Form.Item<FieldType>
              name="remember"
              valuePropName="checked"
              wrapperCol={{ span: 24 }}
            >
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Link
              to="/user/register"
              className="text-sm text-[#1e90ff] mb-[24px] text-[16px]"
            >
              Register now!
            </Link>
          </div>

          <Form.Item wrapperCol={{ span: 16, offset: 4 }}>
            <Button
              type="primary"
              htmlType="submit"
              className="bg-[#1e90ff] w-full"
            >
              Login
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
