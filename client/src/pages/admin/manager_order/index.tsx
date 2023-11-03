import React, { useEffect, useState } from "react";
import { Button, Input, Modal } from "antd";
import { useSelector } from "react-redux";
import { debounce } from "lodash";
import axios from "axios";
import UserDetail from "../../../components/admin/UserDetail";
import { CheckCircleTwoTone, CloseCircleOutlined } from "@ant-design/icons";
import OrderDetail from "../../../components/admin/OrderDetail";
import { formatCurrency } from "../../../helper";

const Manager_Order: React.FC<{}> = () => {
  const [keySearch, setKeySearch] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const [idEdit, setIdEdit] = useState(null);
  const [orderDetail, setOrderDetail] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const loginUser = JSON.parse(localStorage.getItem("loginUser") || "{}");

  const [listOrder, setListOrder] = useState<any>([]);

  const [totalCount, setTotalCount] = useState(0);
  const getAllOrder = () => {
    axios
      .get(
        `http://localhost:8080/api/v1/order?keysearch=${keySearch}&pagenumber=${currentPage}&pagesize=${pageSize}`,
        {
          headers: {
            Authorization: `Bearer ${loginUser.token}`,
          },
        }
      )
      .then((res) => {
        setListOrder(res.data.data[1]);
        setTotalCount(res.data.data[0][0].total);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    const searchDelay = debounce(() => {
      getAllOrder();
    }, 500);
    searchDelay();
    return () => {
      searchDelay.cancel();
    };
  }, [keySearch, pageSize, currentPage]);

  const renderPageNumber = () => {
    const pageNumber = [];
    for (let i = 1; i <= Math.ceil(totalCount / pageSize); i++) {
      pageNumber.push(i);
    }
    return pageNumber;
  };

  const handlePre = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const handleNext = () => {
    if (currentPage < Math.ceil(totalCount / pageSize)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const showModal = (id: any) => {
    setIdEdit(id);

    setIsModalOpen(true);
  };

  const getOneUser = () => {
    axios
      .get(`http://localhost:8080/api/v1/order/${idEdit}`)
      .then((res) => {
        console.log(res.data.data);

        setOrderDetail(res.data.data[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getOneUser();
  }, [idEdit]);

  return (
    <>
      {orderDetail && (
        <OrderDetail
          setIsModalOpen={setIsModalOpen}
          isModalOpen={isModalOpen}
          orderDetail={orderDetail}
        />
      )}
      <div>
        <div className="flex justify-between items-center">
          <h3 className="text-2xl font-semibold">Order managerment</h3>
        </div>
        <div className="flex justify-between items-center pt-4">
          <Input
            className="w-80"
            placeholder="Search by name or email"
            value={keySearch}
            onChange={(e) => setKeySearch(e.target.value)}
          ></Input>
        </div>

        <div>
          <table className="w-full border mt-4 text-center">
            <thead className="bg-stone-200 ">
              <tr>
                <th>
                  {/* <input type="checkbox" name="" id="" checked />  */}
                  STT
                </th>
                <th>User name</th>
                <th>User email</th>
                <th>Order date</th>
                <th>Autopilot</th>
                <th>SelfDriving</th>
                <th>Address</th>
                <th>Price</th>
                <th>Status</th>

                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {listOrder?.length > 0 &&
                listOrder.map((order: any, index: number) => (
                  <tr key={order.OrderId}>
                    <th>{index + 1}</th>

                    <td>{order.OrderUserName}</td>
                    <td>{order.OrderEmail}</td>
                    <td>{order.OrderDate.split("T")[0]}</td>
                    <td>
                      {order.Autopilot === 0 ? (
                        <CloseCircleOutlined style={{ color: "#F6394A" }} />
                      ) : (
                        <CheckCircleTwoTone twoToneColor="#52c41a" />
                      )}
                    </td>
                    <td>
                      {order.SelfDriving == 0 ? (
                        <CloseCircleOutlined style={{ color: "#F6394A" }} />
                      ) : (
                        <CheckCircleTwoTone twoToneColor="#52c41a" />
                      )}
                    </td>
                    <td>{order.OrderAddress}</td>
                    <td>{formatCurrency(order.TotalPrice)}</td>

                    <td>{order.Status}</td>
                    <td>
                      <Button
                        className="bg-blue-400"
                        onClick={() => showModal(order.OrderId)}
                      >
                        Detail
                      </Button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-between items-center pt-5">
          <div>Hiển thị {totalCount} bản ghi</div>
          <div className="flex justify-between items-center gap-4">
            <select
              name=""
              id=""
              className="h-9 border outline-none px-4"
              onChange={(e) => setPageSize(Number(e.target.value))}
            >
              <option value={10}>10 bản ghi</option>
              <option value={20}>20 bản ghi</option>
              <option value={50}>50 bản ghi</option>
              <option value={100}>100 bản ghi</option>
            </select>
            <div className="flex justify-end gap-2">
              <p
                className={
                  currentPage > 1 ? "cursor-pointer" : "text-gray-400 "
                }
                onClick={handlePre}
              >
                Trước
              </p>
              <div className="flex gap-1">
                {renderPageNumber().map((number) => (
                  <span
                    className={`${
                      currentPage === number
                        ? "border-fuchsia-600 border font-bold"
                        : ""
                    } cursor-pointer   px-2 `}
                    key={number}
                    onClick={() => setCurrentPage(number)}
                  >
                    {number}
                  </span>
                ))}
              </div>
              <p
                className={
                  currentPage < Math.ceil(totalCount / pageSize)
                    ? " cursor-pointer"
                    : "text-gray-400"
                }
                onClick={handleNext}
              >
                Sau
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Manager_Order;
