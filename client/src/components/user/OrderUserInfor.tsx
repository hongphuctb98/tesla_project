import { Button, Form, Input } from "antd";
import axios from "axios";
import { useSelector } from "react-redux";
import { handleAlert } from "../../utils/HandleAlert";
import { useNavigate } from "react-router-dom";

type FieldType = {
  username?: string;
  password?: string;
  email?: string;
  confirmEmail?: string;
  phoneNumber?: string;
  address?: string;
};
const OrderUserInfor = () => {
  const currentUser = JSON.parse(localStorage.getItem("loginUser") || "{}");
  const order = useSelector((state: any) => state.product.order);
  const navigate = useNavigate();

  const onFinish = (values: any) => {
    let newOrder = {
      loginUserEmail: currentUser?.user?.email,
      userName: values.username,
      email: values.email,
      phoneNumber: values.phoneNumber,
      address: values.address,
      carDetailId: order.cardetailId,
      autopilot: order.autopilot,
      selfDriving: order.selfDriving,
      totalPrice: order.totalPrice,
    };
    axios
      .post(`http://localhost:8080/api/v1/order/`, newOrder)
      .then((res) =>
        handleAlert("Success", res.data.userMsg, "success").then(() =>
          navigate("/")
        )
      )
      .catch((err) => handleAlert("Error", err.response.data.userMsg, "error"));
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <>
      <h1 className="text-2xl font-semibold r pt-10 pb-5  text-slate-700">
        Enter Account Detail
      </h1>
      <Form
        name="basic"
        layout="vertical"
        labelCol={{ span: 12 }}
        wrapperCol={{ span: 22 }}
        size="large"
        initialValues={{
          username: currentUser?.user?.userName || "",
          email: currentUser?.user?.email || "",
          confirmEmail: currentUser?.user?.email || "",
          phoneNumber: currentUser?.user?.phoneNumber || "",
          address: "",
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Email Address"
          name="email"
          rules={[
            { required: true, message: "Please input your password!" },
            {
              type: "email",
              message: "The input is not valid E-mail!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Confirm Email Address"
          name="confirmEmail"
          dependencies={["email"]}
          rules={[
            { required: true, message: "Please confirm your email!" },
            {
              type: "email",
              message: "The input is not a valid E-mail!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("email") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("Emails must match"));
              },
            }),
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item<FieldType>
          label="Phone Number"
          name="phoneNumber"
          rules={[
            { required: true, message: "Please input your phone number" },
            {
              pattern: /^\d{10}$/,
              message: "Please input a valid phone number",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <h1 className="text-2xl font-semibold r pt-5 pb-5  text-slate-700">
          Shipping
        </h1>

        <Form.Item<FieldType>
          label="Address"
          name="address"
          rules={[{ required: true, message: "Please input your address" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item wrapperCol={{ span: 22 }}>
          <Button
            type="primary"
            htmlType="submit"
            className="bg-[#1677ff] w-full"
          >
            Place Order
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default OrderUserInfor;
