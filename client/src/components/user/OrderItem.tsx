import React, { useState } from "react";
import { formatCurrency, numberWithCommas } from "../../helper";

interface IProcOrderItem {
  orderItem: any;
}

const OrderItem: React.FC<IProcOrderItem> = ({ orderItem }) => {
  const [isDetail, setIsDetail] = useState(false);

  return (
    <>
      {!isDetail ? (
        <div className="flex gap-2 items-center ">
          <div className="w-1/4 h-1/4 border-r-2 border-gray-200">
            <img src={orderItem.ImageUrl} alt="" />
          </div>
          <div className="flex-1 p-4">
            <table className="table-fixed w-full  mt-2">
              <thead>
                <tr className="text-left">
                  <th>Car name</th>
                  <th>Color</th>
                  <th>Price</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{orderItem.CarName}</td>
                  <td>{orderItem.ColorName}</td>
                  <td>{formatCurrency(orderItem.TotalPrice)}</td>
                  <td className="text-amber-500 capitalize">
                    {orderItem.Status}
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="flex justify-end">
              <button
                className="bg-blue-500 hover:bg-blue-600 py-1 px-4 rounded-lg text-white p-2 text-sm mt-4 flex gap-1 "
                onClick={() => setIsDetail(!isDetail)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Order Detail
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-4 ">
          <div className="flex  gap-2 items-center">
            <div className="w-1/3 px-2">
              <div className="border-b-2 border-gray-200 mb-6">
                <img src={orderItem.ImageUrl} alt={orderItem.VersionName} />
              </div>
              <ul className="flex flex-wrap text-sm  gap-2">
                <li className="min-w-1/2">
                  <b>18 Aero Wheels : </b>
                  <>Included</>
                </li>
                <li className="min-w-1/2">
                  <b>All Black Partial : </b>
                  <>Included</>
                </li>
                <li className="min-w-1/2">
                  <b>Premium Interior : </b>
                  <>Included</>
                </li>
                <li className="min-w-1/2">
                  <b>Autopilot : </b>
                  <>Included</>
                </li>

                <li className="min-w-1/2">
                  <b>Range : </b>
                  <>{orderItem.Range} mi</>
                </li>
                <li className="min-w-1/2">
                  <b>Wattage : </b>
                  <>{numberWithCommas(orderItem.Wattage)}hp</>
                </li>
                <li className="min-w-1/2">
                  <b>Acceleration : </b>
                  <>{orderItem.Acceleration} mph</>
                </li>
                <li className="min-w-1/2">
                  <b>Seating : </b>
                  <>{orderItem.Seating} Seats</>
                </li>
                <li className="min-w-1/2">
                  <b>Top Speed : </b>
                  <>{orderItem.Topspeed} mph</>
                </li>
              </ul>
            </div>
            <div className=" p-4 flex gap-4 w-full">
              <ul className="flex flex-col gap-2 w-1/2 border-r-2">
                <h1 className="font-bold  capitalize text-center text-xl">
                  order information
                </h1>

                <li>
                  <b>Name</b> : {orderItem.CarName}
                </li>
                <li>
                  <b>Version : </b>
                  <>
                    {orderItem.VersionName == orderItem.CarName
                      ? `${orderItem.CarName} Rear-Wheel Drive`
                      : orderItem.VersionName}
                  </>
                </li>
                <li>
                  <b>Color</b> : {orderItem.ColorName}
                </li>
                {orderItem.Autopilot == 1 ? (
                  <li>
                    <b>Enhanced Autopilot : </b>
                    <>$6,000</>
                  </li>
                ) : (
                  <></>
                )}

                {orderItem.SelfDriving == 1 ? (
                  <li>
                    <b>Full Self-Driving Capability : </b>
                    <>$12,000</>
                  </li>
                ) : (
                  ""
                )}

                <li>
                  <b>Order date : </b>
                  <>{orderItem.OrderDate.split("T")[0]}</>
                </li>

                <hr className="border-[1]" />

                <li>
                  <b>Total Price : </b>
                  <>${numberWithCommas(orderItem.TotalPrice)}</>
                </li>

                <li>
                  <b>Status : </b>
                  <span className="text-amber-500 capitalize">
                    {orderItem.Status}
                  </span>
                </li>
              </ul>
              <ul className="flex flex-col gap-2 w-1/2">
                <h1 className="font-bold  capitalize text-center text-xl">
                  user information
                </h1>

                <li>
                  <b>User name : </b>
                  {orderItem.OrderUserName}
                </li>

                <li>
                  <b>Email : </b>
                  {orderItem.OrderEmail}
                </li>

                <li>
                  <b>Phone : </b> {orderItem.OrderPhone}
                </li>

                <li>
                  <b>Address : </b> {orderItem.OrderAddress}
                </li>
              </ul>
            </div>
          </div>
          <div className="flex justify-end ">
            <button
              className="bg-blue-500 hover:bg-blue-600 py-1 px-4 rounded-lg text-white p-2 text-sm mt-4 flex gap-1 "
              onClick={() => setIsDetail(!isDetail)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Order Detail
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default OrderItem;
