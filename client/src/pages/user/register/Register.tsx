import React from "react";
import { Button, Checkbox, Form, Input } from "antd";
import { Link, useNavigate } from "react-router-dom";
import "./register.css";
import axios from "axios";
import { handleAlert } from "../../../utils/HandleAlert";

type FieldType = {
  userName?: string;
  phoneNumber?: string;
  passwords?: string;
  confirmPassword?: string;
  email?: string;
  remember?: string;
};

const Register: React.FC = () => {
  const navigate = useNavigate();
  const onFinish = (values: any) => {
    console.log("Success:", values);

    axios
      .post(`http://localhost:8080/api/v1/auth/register`, {
        userName: values.userName,
        passwords: values.passwords,
        email: values.email,
        phoneNumber: values.phoneNumber,
      })
      .then((res) => {
        handleAlert("Success!", "Create account success!", "success").then(
          () => {
            navigate("/user/login");
          }
        );
      })
      .catch((err) => {
        handleAlert("Sorry", `${err.response.data.userMsg}`, "error");
      });
  };

  // const onFinishFailed = (errorInfo: any) => {
  //   console.log("Failed:", errorInfo);
  // };
  return (
    <>
      <div className="w-11/12 mx-auto mt-5">
        <Link className="flex flex-shrink-0 items-center" to={"/"}>
          <img
            className="h-8  w-16"
            src="https://www.carlogos.org/car-logos/tesla-logo-2007.png"
            alt="Your Company"
          />
        </Link>
      </div>
      <div className="w-1/5 mx-auto register-section">
        <h1 className=" pb-8 text-4xl ">Create Account</h1>
        <Form
          name="basic"
          layout="vertical"
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          // onFinishFailed={onFinishFailed}
          autoComplete="off"
          requiredMark={false}
        >
          <Form.Item<FieldType>
            label="Username"
            name="userName"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="Phone Number"
            name="phoneNumber"
            rules={[
              { required: true, message: "Please input your username!" },
              {
                pattern: /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,
                message: "Please enter a valid phone number",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item<FieldType>
            label="Email Address"
            name="email"
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
            name="passwords"
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
          <Form.Item<FieldType>
            label="Confirm Password"
            name="confirmPassword"
            dependencies={["passwords"]}
            labelCol={{ span: 24 }}
            rules={[
              {
                required: true,
                message: "Please input your confirm password!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("passwords") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Passwords must match"));
                },
              }),
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
              to="/user/login"
              className="text-sm text-[#1e90ff] mb-[24px] text-[16px]"
            >
              Sign in!
            </Link>
          </div>

          <Form.Item wrapperCol={{ span: 16, offset: 4 }}>
            <Button
              type="primary"
              htmlType="submit"
              className="bg-[#1e90ff] w-full"
            >
              Register
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default Register;
