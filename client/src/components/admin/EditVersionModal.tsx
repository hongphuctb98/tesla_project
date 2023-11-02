import { Button, Form, Image, Input, InputNumber, Modal } from "antd";
import React from "react";
import { number } from "yup";
import instance from "../../api/axios";
import { handleAlert } from "../../utils/HandleAlert";

interface Props {
  isEditVersionModal: boolean;
  setIsEditVersionModal: (isModalOpen: boolean) => void;
  editVersion: any;
  loadData: any;
}
type FieldType = {
  VersionName?: string;
  Price?: number;
  Quantity?: number;
  Range?: number;
  Acceleration?: number;
  TopSpeed?: number;
  Wattage?: number;
  Seating?: number;
};

const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
};
const EditVersionModal: React.FC<Props> = ({
  isEditVersionModal,
  setIsEditVersionModal,
  editVersion,
  loadData,
}) => {
  const handleCancel = () => {
    setIsEditVersionModal(false);
  };

  const updateVersion = (updatedVersion: any) => {
    instance
      .patch(`/versions/${editVersion.VersionId}`, updatedVersion)
      .then((res) => {
        loadData();
        console.log(res.data);
        handleAlert("Success", "Update version successfully", "success").then(
          () => {
            setIsEditVersionModal(false);
          }
        );
      })
      .catch((err) => console.log(err));
  };

  const onFinish = async (values: any) => {
    const updatedVersion = {
      ...editVersion,
      ...values,
    };
    updateVersion(updatedVersion);
  };

  return (
    <>
      <Modal
        title="Basic Modal"
        open={isEditVersionModal}
        style={{
          top: 40,
          margin: "auto",
        }}
        onCancel={handleCancel}
        footer={false}
        okButtonProps={{
          style: {
            backgroundColor: "#3b82f6",
          },
        }}
        cancelButtonProps={{
          style: {
            backgroundColor: "#eab308",
          },
        }}
      >
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 24 }}
          style={{ maxWidth: 600 }}
          initialValues={{
            VersionName: editVersion.VersionName,
            Price: editVersion.Price,
            Quantity: editVersion.Quantity,
            Range: editVersion.Range,
            Acceleration: editVersion.Acceleration,
            TopSpeed: editVersion.TopSpeed,
            Wattage: editVersion.Wattage,
            Seating: editVersion.Seating,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          layout="vertical"
        >
          <Form.Item<FieldType>
            label="VersionName"
            name="VersionName"
            rules={[
              { required: true, message: "Please input your version name!" },
            ]}
          >
            <Input />
          </Form.Item>
          <div className="flex flex-wrap gap-8">
            <Form.Item<FieldType>
              label="Price"
              name="Price"
              labelCol={{ span: 24 }}
              style={{ width: "200px" }}
              rules={[{ required: true, message: "Please input your Price!" }]}
            >
              <InputNumber />
            </Form.Item>
            <Form.Item<FieldType>
              label="Quantity"
              name="Quantity"
              labelCol={{ span: 24 }}
              style={{ width: "200px" }}
              rules={[
                { required: true, message: "Please input your Quantity!" },
              ]}
            >
              <InputNumber />
            </Form.Item>

            <Form.Item<FieldType>
              label="Range"
              name="Range"
              labelCol={{ span: 24 }}
              style={{ width: "200px" }}
              rules={[{ required: true, message: "Please input your Range!" }]}
            >
              <InputNumber />
            </Form.Item>
            <Form.Item<FieldType>
              label="Acceleration"
              name="Acceleration"
              labelCol={{ span: 24 }}
              style={{ width: "200px" }}
              rules={[
                { required: true, message: "Please input your Acceleration!" },
              ]}
            >
              <InputNumber />
            </Form.Item>
            <Form.Item<FieldType>
              label="TopSpeed"
              name="TopSpeed"
              labelCol={{ span: 24 }}
              style={{ width: "200px" }}
              rules={[
                { required: true, message: "Please input your TopSpeed!" },
              ]}
            >
              <InputNumber />
            </Form.Item>
            <Form.Item<FieldType>
              label="Wattage"
              name="Wattage"
              labelCol={{ span: 24 }}
              style={{ width: "200px" }}
              rules={[
                { required: true, message: "Please input your Wattage!" },
              ]}
            >
              <InputNumber />
            </Form.Item>
            <Form.Item<FieldType>
              label="Seating"
              name="Seating"
              labelCol={{ span: 24 }}
              style={{ width: "200px" }}
              rules={[
                { required: true, message: "Please input your Seating!" },
              ]}
            >
              <InputNumber />
            </Form.Item>
          </div>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit" className="bg-blue-500">
              Save
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default EditVersionModal;
