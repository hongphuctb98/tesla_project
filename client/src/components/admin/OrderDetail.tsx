import { Image, Modal } from "antd";
import React from "react";
import { formatCurrency } from "../../helper";

interface ProcOrderDetail {
  setIsModalOpen: (isModalOpen: boolean) => void;
  isModalOpen: boolean;
  orderDetail: any;
}

const OrderDetail: React.FC<ProcOrderDetail> = ({
  setIsModalOpen,
  isModalOpen,
  orderDetail,
}) => {
  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <Modal
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width={1000}
        style={{
          top: 15,
          margin: "0 auto",
          borderRadius: "8px",
        }}
        footer={false}
      >
        <h1 className="text-2xl font-bold">Order information</h1>

        <div className="flex">
          <div className="w-1/2">
            <div className="flex items-end mb-4">
              <p className="font-semibold  text-base mr-2">Car Name : </p>
              {orderDetail?.CarName}
            </div>
            <div className="flex items-end mb-4">
              <p className="font-semibold  text-base mr-2">Version : </p>
              {orderDetail?.VersionName}
            </div>
            <div className="flex items-end mb-4">
              <p className="font-semibold  text-base mr-2">Color : </p>
              {orderDetail?.ColorName}
            </div>

            <div className="flex items-end mb-4">
              <p className="font-semibold  text-base mr-2">User name : </p>
              {orderDetail?.OrderUserName}
            </div>
            <div className="flex items-end mb-4">
              <p className="font-semibold  text-base mr-2">User email : </p>
              {orderDetail?.OrderEmail}
            </div>
            <div className="flex items-end mb-4">
              <p className="font-semibold  text-base mr-2">User address : </p>
              {orderDetail?.OrderAddress}
            </div>
            <div className="flex items-end mb-4">
              <p className="font-semibold  text-base mr-2">Phone number : </p>
              {orderDetail?.OrderPhone}
            </div>
            <div className="flex items-end mb-4">
              <p className="font-semibold  text-base mr-2">Order Date : </p>
              {orderDetail?.OrderDate.split("T")[0]}
            </div>

            {orderDetail?.SelfDriving === 1 && (
              <div className="flex items-end mb-4">
                <p className="font-semibold  text-base mr-2"> SelfDriving : </p>
                included
              </div>
            )}
            {orderDetail?.Autopilot === 1 && (
              <div className="flex items-end mb-4">
                <p className="font-semibold  text-base mr-2"> Autopilot : </p>
                included
              </div>
            )}
            <div className="flex items-end mb-4">
              <p className="font-semibold  text-base mr-2">Total price : </p>
              {formatCurrency(orderDetail?.TotalPrice)}
            </div>
          </div>

          <div className="w-1/2">
            <Image src={orderDetail?.ImageUrl}></Image>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default OrderDetail;
