import { Modal } from "antd";
import React, { useState } from "react";

interface UserDetailProps {
  userDetail?: any;
  setIsModalOpen: (isModalOpen: boolean) => void;
  isModalOpen: boolean;
}

const UserDetail: React.FC<UserDetailProps> = ({
  userDetail,
  setIsModalOpen,
  isModalOpen,
}) => {
  console.log("userDetail", userDetail);

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Modal
        title="User Detail"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={false}
        width={"50%"}
        style={{
          top: 15,
          maxWidth: "32rem",
          margin: "0 auto",
          borderRadius: "8px",
        }}
      >
        <img
          className="w-32 h-32 rounded-full mx-auto"
          src="https://picsum.photos/200"
          alt="Profile picture"
        />
        <h2 className="text-center text-2xl font-semibold mt-3">
          {userDetail.UserName}
        </h2>
        <p className="text-center text-gray-600 mt-1">{userDetail.Email}</p>
        <div className="flex justify-center mt-5">
          <a href="#" className="text-blue-500 hover:text-blue-700 mx-3">
            Twitter
          </a>
          <a href="#" className="text-blue-500 hover:text-blue-700 mx-3">
            LinkedIn
          </a>
          <a href="#" className="text-blue-500 hover:text-blue-700 mx-3">
            GitHub
          </a>
        </div>
        <div className="mt-5">
          <div className="flex items-end gap-2 border-b-2 border-gray-200 pb-2">
            <h3 className="text-base font-medium min-w-[80px] capitalize">
              phone number :
            </h3>
            <p className="text-gray-600 text-base ">{userDetail.PhoneNumber}</p>
          </div>
          <div className="flex items-end gap-2 border-b-2 border-gray-200 pb-2">
            <h3 className="text-base font-medium min-w-[80px] capitalize">
              Email :
            </h3>
            <p className="text-gray-600 text-base ">
              <a href={`${userDetail.Email}`}>{userDetail.Email}</a>
            </p>
          </div>
          <div className="flex items-end gap-2 border-b-2 border-gray-200 pb-2">
            <h3 className="text-base font-medium min-w-[80px] capitalize">
              Address :
            </h3>
            <p className="text-gray-600 text-base ">{userDetail.Address}</p>
          </div>
          <div className="flex items-end gap-2 border-b-2 border-gray-200 pb-2">
            <h3 className="text-base font-medium min-w-[80px] capitalize">
              Date of birth :
            </h3>
            <p className="text-gray-600 text-base ">{userDetail.DateOfBirth}</p>
          </div>
          <div className="flex items-end gap-2 border-b-2 border-gray-200 pb-2">
            <h3 className="text-base font-medium min-w-[80px] capitalize">
              Gender :
            </h3>
            <p className="text-gray-600 text-base ">
              {userDetail.Gender === 0 ? "Male" : "Female"}
            </p>
          </div>{" "}
          <div className="flex items-end gap-2 border-b-2 border-gray-200 pb-2">
            <h3 className="text-base font-medium min-w-[80px] capitalize">
              Create at :
            </h3>
            <p className="text-gray-600 text-base ">{userDetail.CreatedAt}</p>
          </div>
          <div className="flex items-end gap-2 border-b-2 border-gray-200 pb-2">
            <h3 className="text-base font-medium min-w-[80px] capitalize">
              Create by :
            </h3>
            <p className="text-gray-600 text-base ">{userDetail.CreateBy}</p>
          </div>
          <div className="flex items-end gap-2 border-b-2 border-gray-200 pb-2">
            <h3 className="text-base font-medium min-w-[80px] capitalize">
              Update at :
            </h3>
            <p className="text-gray-600 text-base ">{userDetail.ModifiedAt}</p>
          </div>
          <div className="flex items-end gap-2 border-b-2 border-gray-200 pb-2">
            <h3 className="text-base font-medium min-w-[80px] capitalize">
              Update by :
            </h3>
            <p className="text-gray-600 text-base ">{userDetail.ModifiedBy}</p>
          </div>
          <div className="flex items-end gap-2 border-b-2 border-gray-200 pb-2">
            <h3 className="text-base font-medium min-w-[80px] capitalize">
              Role :
            </h3>
            <p className="text-gray-600 text-base ">{userDetail.Role}</p>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default UserDetail;
