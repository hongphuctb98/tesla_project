import { Image, Modal } from "antd";
import React, { useState, useEffect } from "react";
import { Button, Form, Input } from "antd";
import instance from "../../api/axios";

interface Props {
  isEditCarModal: boolean;
  setIsEditCarModal: (isModalOpen: boolean) => void;
  carId: number;
  loadData: any;
}

const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
};

type FieldType = {
  CarName?: string;
  BasePrice?: number;
  BgImage?: string;
  Descriptions?: string;
  MainImage?: string;
};

const EditCarModal: React.FC<Props> = ({
  isEditCarModal,
  setIsEditCarModal,
  carId,
  loadData,
}) => {
  const [car, setCar] = useState<FieldType>({
    CarName: "",
    BasePrice: 0,
    BgImage: "",
    Descriptions: "",
  });

  const getCarById = () => {
    instance
      .get(`products/${carId}`)
      .then((res) => {
        setCar(res.data.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getCarById();
  }, []);

  const handleCancel = () => {
    setIsEditCarModal(false);
  };

  const onFinish = async (values: any) => {
    console.log("values", values);

    await instance
      .put(`products/${carId}`, { ...values, MainImage: car.MainImage })
      .then((res) => {
        console.log(res.data);
        loadData();
        setIsEditCarModal(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Modal
        title="Basic Modal"
        open={isEditCarModal}
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
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{
            CarName: car?.CarName,
            BasePrice: car?.BasePrice,
            Descriptions: car?.Descriptions,
            BgImage: car?.BgImage,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          layout="vertical"
        >
          <Form.Item<FieldType>
            label="CarName"
            name="CarName"
            rules={[{ required: true, message: "Please input your car name!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="Price"
            name="BasePrice"
            rules={[{ required: true, message: "Please input your price!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType> label="Description" name="Descriptions">
            <Input.TextArea showCount maxLength={100} />
          </Form.Item>

          <Form.Item<FieldType>
            label="Background image"
            name="BgImage"
            rules={[{ required: true, message: "Please input your price!" }]}
          >
            <Image src={car.BgImage} />
          </Form.Item>

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

export default EditCarModal;
