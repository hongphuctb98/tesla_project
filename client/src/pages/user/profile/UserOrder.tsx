import { useEffect, useState } from "react";
import instance from "../../../api/axios";
import axios from "axios";
import OrderItem from "../../../components/user/OrderItem";

const UserOrder = () => {
  const loginUser = JSON.parse(localStorage.getItem("loginUser") || "{}");
  const [orderList, setOrderList] = useState([]);

  const getOrder = () => {
    axios
      .get(`http://localhost:8080/api/v1/order`, {
        headers: {
          Authorization: `Bearer ${loginUser.token}`,
        },
      })
      .then((res) => {
        setOrderList(res.data.data[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getOrder();
  }, []);

  return (
    <div className="rounded-lg min-h-[80vh] bg-gray-200 p-4 text-gray-700">
      <div className="w-full bg-white p-4 text-xl font-bold text-center rounded-md">
        Order history
      </div>
      {orderList?.length > 0 ? (
        orderList.map((order: any) => (
          <div className="order-item mt-5 rounded-md bg-white w-full">
            <OrderItem key={order.OrderId} orderItem={order} />
          </div>
        ))
      ) : (
        <div className="order-item mt-5 rounded-md bg-white w-full text-center py-2">
          Order history is empty
        </div>
      )}
    </div>
  );
};

export default UserOrder;
