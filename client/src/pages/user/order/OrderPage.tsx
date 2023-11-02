import React from "react";
import NavbarCom from "../../../components/user/NavbarCom";
import CarDetailImages from "../../../components/user/CarDetailImages";
import { Outlet } from "react-router-dom";

const OrderPage = () => {
  return (
    <>
      <NavbarCom />
      <div className="flex gap-5 ">
        <CarDetailImages />
        <div className="absolute top-16 right-0 w-1/4 min-h-screen border-l-gray-100 border-l-2 pl-4 car-infor pb-20">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default OrderPage;
