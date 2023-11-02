import { LeftOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { numberWithCommas } from "../../helper";
import OrderUserInfor from "./OrderUserInfor";
import { useDispatch } from "react-redux";
import { setOrder } from "../../redux/productSlice";

const OrderCard = () => {
  const [isDetail, setIsDetail] = useState(true);
  const [car, setCar] = useState<any>({});
  const [selectedVersion, setSelectedVersion] = useState<any>({});
  const order = JSON.parse(localStorage.getItem("order") || "{}");
  const [vehiclePrice, setVehiclePrice] = useState(0);
  const [orderFee, setOrderFee] = useState<number>(0);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();

  const handleBack = () => {
    navigate(`/order/${params.id}/design`, { state: order });
  };

  const fetcOneCar = () => {
    axios
      .get(`http://localhost:8080/api/v1/products/${params.id}`)
      .then((res) => setCar(res.data.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetcOneCar();
  }, []);

  useEffect(() => {
    if (car?.VersionList?.length > 0) {
      const version = car.VersionList.find((item: any) => {
        return item.VersionName === order.version;
      });
      let price: number = version?.Price;
      if (order.autopilot) {
        price += 6000;
      }

      if (order.selfDriving) {
        price += 12000;
      }
      setVehiclePrice(price);
      setSelectedVersion(version);
    }
  }, [order]);
  useEffect(() => {
    setOrderFee(Number((vehiclePrice * 0.01).toFixed(0)));
    let total = vehiclePrice + Number((vehiclePrice * 0.01).toFixed(0)) + 1390;

    setTotalPrice(total);
  }, [vehiclePrice]);

  useEffect(() => {
    dispatch(
      setOrder({
        ...order,
        totalPrice,
      })
    );
  }, [totalPrice]);

  return (
    <>
      <p className="pt-4 text-gray-500 cursor-pointer " onClick={handleBack}>
        <LeftOutlined className="text-sm" />
        Edit Design
      </p>
      <h1 className="text-4xl font-semibold text-center pt-5  text-slate-700">
        {car.CarName}
      </h1>
      {isDetail ? (
        <div className="mt-4 text-stone-600 px-4">
          <ul className="flex flex-col gap-2">
            <li>
              {selectedVersion.VersionName == car.CarName
                ? `${car.CarName} Rear-Wheel Drive`
                : selectedVersion.VersionName}
            </li>
            <li>{order.color}</li>
            <li>18 Aero Wheels</li>
            <li>All Black Partial Premium Interior</li>
            <li>Autopilot</li>
          </ul>
          <div
            className="flex gap-1 mt-4 cursor-pointer font-semibold"
            onClick={() => setIsDetail(!isDetail)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            Show Detail
          </div>
        </div>
      ) : (
        <div className="mt-4 text-stone-600 pl-4 pr-7 ">
          <ul className="flex flex-col gap-2">
            <li className="flex justify-between">
              <p>
                {selectedVersion.VersionName == car.CarName
                  ? `${car.CarName} Rear-Wheel Drive`
                  : selectedVersion.VersionName}
              </p>
              <p>
                $
                {selectedVersion?.Price &&
                  numberWithCommas(selectedVersion.Price)}
              </p>
            </li>
            <li className="flex justify-between">
              <p>{order.color}</p>
              <p>Included</p>
            </li>
            <li className="flex justify-between">
              <p>18 Aero Wheels</p>
              <p>Included</p>
            </li>
            <li className="flex justify-between">
              <p>All Black Partial </p>
              <p>Included</p>
            </li>
            <li className="flex justify-between">
              <p>Premium Interior</p>
              <p>Included</p>
            </li>
            <li className="flex justify-between">
              <p>Autopilot</p>
              <p>Included</p>
            </li>

            {order?.autopilot && (
              <li className="flex justify-between">
                <p>Enhanced Autopilot</p>
                <p>$6,000</p>
              </li>
            )}
            {order?.selfDriving && (
              <li className="flex justify-between">
                <p>Full Self-Driving Capability</p>
                <p>$12,000</p>
              </li>
            )}
            <hr className="my-2 " />
            <li className="flex justify-between font-bold text-[18]">
              <p>Vehicle Price</p>
              <p>${vehiclePrice && numberWithCommas(vehiclePrice)}</p>
            </li>
          </ul>
          <div
            className="flex gap-1 mt-4 cursor-pointer font-semibold"
            onClick={() => setIsDetail(!isDetail)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            Hide Detail
          </div>
        </div>
      )}

      <div className="mt-4 text-stone-600 px-4">
        <p className="text-sm w-3/4 py-4">
          Financing selection and terms will be confirmed after orde
        </p>

        <ul className="flex flex-col gap-2">
          <li className="flex justify-between">
            <p>Vehicle Price</p>
            <p>${vehiclePrice && numberWithCommas(vehiclePrice)}</p>
          </li>
          <li className="flex justify-between">
            <p>Destination fee</p>
            <p>$1,390</p>
          </li>
          <li className="flex justify-between">
            <p>Order Fee</p>
            <p>${orderFee && numberWithCommas(orderFee)}</p>
          </li>

          <hr className="my-2 " />
          <li className="flex justify-between font-bold text-[18]">
            <p>Your {car.CarName}</p>
            <p>${totalPrice && numberWithCommas(totalPrice)}</p>
          </li>
        </ul>
      </div>
      <div className="mt-4 px-4 ">
        <OrderUserInfor />
      </div>
    </>
  );
};

export default OrderCard;
