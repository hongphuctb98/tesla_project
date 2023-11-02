import React, { useEffect, useState } from "react";
import { Button, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";

import { AppDispatch } from "../../../redux/store";
import { fetchAllProduct } from "../../../services/product.services";
import { formatCurrency } from "../../../helper";
import { useNavigate } from "react-router-dom";

const Manager_Product: React.FC<{}> = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const listCar = useSelector((state: any) => {
    return state.product.data;
  });

  const totalCount = useSelector((state: any) => {
    return state.user.data.totalCount;
  });

  useEffect(() => {
    dispatch(fetchAllProduct());
  }, []);

  const handleDetail = (id: number) => {
    navigate(`/admin/product/${id}`);
  };

  return (
    <div>
      <div className="flex justify-between items-center ">
        <h3 className="text-2xl font-semibold">Product managerment</h3>
      </div>
      <div className="flex justify-between items-center pt-4">
        <Input
          className="w-80"
          placeholder="Tìm kiếm theo tên hoặc email"
        ></Input>
      </div>

      <div>
        <table className="w-full  mt-4 border border-collapse border-slate-400 text-center">
          <thead className="bg-stone-200 ">
            <tr>
              {/* <th>
                <input type="checkbox" name="" id="" checked />
              </th> */}
              <th>Name</th>
              <th>Price</th>
              <th>Version</th>
              <th>Color</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {listCar?.length > 0 &&
              listCar.map((car: any) => (
                <tr key={car.CarId}>
                  {/* <th className="p-2">
                    <input type="checkbox" name="" id="" checked />
                  </th> */}
                  <td className="p-2">{car.CarName}</td>
                  <td className="p-2">{formatCurrency(car.BasePrice)}</td>
                  <td className="p-2">{car.VersionList.length}</td>
                  <td className="p-2">{car.ColorList.length}</td>
                  <td className="p-2">
                    <Button
                      className="bg-teal-500"
                      onClick={() => handleDetail(car.CarId)}
                    >
                      Detail
                    </Button>
                    <Button className="bg-red-500">Del</Button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Manager_Product;
