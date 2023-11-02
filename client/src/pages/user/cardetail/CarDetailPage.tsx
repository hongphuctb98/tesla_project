import NavbarCom from "../../../components/user/NavbarCom";
import { useNavigate, useParams } from "react-router-dom";
import { WifiOutlined, CarOutlined } from "@ant-design/icons";
import CarDetailInfor from "../../../components/user/CarDetailInfor";
import Footer from "../../../components/user/Footer";
import axios from "axios";
import { useEffect, useState } from "react";
import { numberWithCommas } from "../../../helper";

const CarDetailPage = () => {
  const [car, setCar] = useState<any>({});
  const navigate = useNavigate();
  const params = useParams();
  const handleOrder = (id: string) => {
    navigate(`/order/${id}/design`);
  };

  const fetcOneCar = () => {
    axios
      .get(`http://localhost:8080/api/v1/products/${params.id}`)
      .then((res) => setCar(res.data.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetcOneCar();
  }, [params]);

  return (
    <>
      <NavbarCom />
      <div className="car-section h-screen  ">
        <div
          className={` bg-cover bg-center h-full w-full relative`}
          style={{
            backgroundImage: `url(${car && car.BgImage}) `,
          }}
        >
          <div
            className="absolute top-0 left-0 w-full h-full bg-slate-50/50"
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.3)",
            }}
          >
            <div className="absolute top-[100px] left-1/2  w-[60%] h-[80%] -translate-x-1/2 flex flex-col justify-between ">
              <div
                className={`text-center ${
                  car.name == "Model X" ? "text-black" : "text-white"
                }`}
              >
                <h1 className="text-5xl font-semibold pb-4">{car.CarName}</h1>
                <p className="text-2xl font-medium">
                  From ${car.BasePrice && numberWithCommas(car.BasePrice)}*
                </p>
                <span>After Federal Tax Credit & Est. Gas Savings</span>
              </div>
              <div className="text-center w-full  ">
                <ul className="flex justify-between">
                  <li className="text-white">
                    <span className="text-4xl font-bold">
                      {car?.VersionList?.length > 0 && car.VersionList[0].Range}{" "}
                      mi
                    </span>
                    <p className="text-sm font-medium mt-1">Range (EPA est.)</p>
                  </li>

                  <li className="text-white">
                    <span className="text-4xl font-bold">
                      {" "}
                      {car?.VersionList?.length > 0 &&
                        car.VersionList[0].Acceleration}{" "}
                      s
                    </span>
                    <p className="text-sm font-medium mt-1">0-60 mph*</p>
                  </li>
                  <li className="text-white">
                    <span className="text-4xl font-bold">
                      {" "}
                      {car?.VersionList?.length > 0 &&
                        car.VersionList[0].TopSpeed}
                    </span>
                    <p className="text-sm font-medium mt-1">Top speed</p>
                  </li>
                  <li className="text-white">
                    <span className="text-4xl font-bold">
                      {car?.VersionList?.length > 0 &&
                        numberWithCommas(car.VersionList[0].Wattage)}{" "}
                      hp
                    </span>
                    <p className="text-sm font-medium mt-1">Peak Power</p>
                  </li>

                  <li>
                    <button
                      className=" bg-white font-medium  leading-3 h-[40px] text-slate-800 px-16 border-none rounded-md hover:bg-stone-200"
                      onClick={() => handleOrder(car.CarId)}
                    >
                      Order Now
                    </button>
                  </li>
                </ul>

                <p className="text-sm mt-5 text-white">
                  *Price before incentives and savings is $79,990, excluding
                  taxes and fees. Subject to change.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className=" w-[70%] mx-auto py-10">
        <div className="flex justify-center ">
          <img
            src="https://i0.wp.com/www.lampchart.com/wp-content/uploads/2022/03/model-3-structure.jpg?resize=768%2C520&ssl=1"
            alt=""
            className="w-[60%]"
          />
        </div>
        <div>
          <h1 className="text-3xl font-semibold mt-5">Safety-First Design</h1>
          <p className="font-light my-6">
            Safety is the most important part of every Tesla. We design our
            vehicles to exceed safety standards.
          </p>
          <div className="flex gap-10">
            <div className="basic-1/2">
              <p className="font-medium">5-Star Rating</p>
              <span className="font-light ">
                Model 3 achieved NHTSA 5-star safety ratings in every category
                and subcategory.
              </span>
            </div>
            <div className="basic-1/2">
              <p className="font-medium">Top Safety Pick+</p>
              <span className="font-light ">
                Model 3 received the IIHS Top Safety Pick+ award, with top
                ratings in all crashworthiness and front crash prevention
                categories.
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="w-[70%] mx-auto flex flex-col py-10">
        <div className="flex ">
          <div className="flex-1">
            <img
              src="https://digitalassets.tesla.com/tesla-contents/image/upload/h_584,w_1040,c_fit,f_auto,q_auto:best/MS-Interior-Grid-A-Desktop"
              alt=""
              className="w-full"
            />
          </div>
          <div className="flex-1 pt-14 ">
            <div className="pl-14">
              <p className="text-3xl font-semibold mb-5">Stay Connected</p>
              <span>
                Instantly connect with multi-device Bluetooth, or fast charge
                devices with wireless and 36-watt USB-C charging.
              </span>
            </div>
          </div>
        </div>
        <div className="flex ">
          <div className="flex-1 pt-14">
            <p className="text-3xl font-semibold mb-5">Immersive Sound</p>
            <span>
              A 22-speaker, 960-watt audio system with Active Road Noise
              Reduction offers immersive listening and studio-grade sound
              quality.
            </span>
          </div>
          <div className="flex-1">
            <img
              src="https://i0.wp.com/blog.tesbros.com/wp-content/uploads/2021/06/Screen-Shot-2021-06-11-at-12.04.09-AM.jpg?w=725&ssl=1"
              alt=""
              className="w-full"
            />
          </div>
        </div>
        <div className="flex ">
          <div className="flex-1">
            <img
              src="https://digitalassets.tesla.com/tesla-contents/image/upload/h_584,w_1040,c_fit,f_auto,q_auto:best/MS-Interior-Grid-D-Desktop"
              alt=""
              className="w-full"
            />
          </div>
          <div className="flex-1 pt-14">
            <div className="pl-14">
              {" "}
              <p className="text-3xl font-semibold mb-5">Room for Everything</p>
              <span>
                With front and rear trunks and fold-flat seats you can fit your
                bike without taking the wheel off—and your luggage too. Compare
                Models
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="py-10 ">
        <div className="relative">
          <img
            src="https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-3-Interior-Desktop-LHD.jpg"
            alt=""
            className="w-full  object-cover"
            style={{ height: "60vh" }}
          />
          <ul className="absolute top-10 bottom-10 left-3/4  w-64 text-white flex flex-col justify-between">
            <li>
              <p className="text-3xl font-bold mb-4">15 inch</p>
              <p className="font-semibold text-sm">
                A touchscreen display designed to improve over time
              </p>
            </li>
            <li>
              <WifiOutlined className="text-3xl font-bold mb-4" />
              <p className="font-semibold text-sm">
                Over-the-air software updates introduce new features,
                functionality and performance
              </p>
            </li>
            <li>
              <CarOutlined className="text-3xl font-bold mb-4" />
              <p className="font-semibold text-sm">
                An expansive Glass Roof provides more headroom and UV protection
              </p>
            </li>
          </ul>
        </div>

        <div className="w-[70%] mx-auto mt-16">
          <div className="flex gap-10">
            <div className="flex-1">
              <span>Interior</span>
              <h1 className="text-3xl font-semibold">
                Built Around the Driver
              </h1>
              <div className="flex gap-4 mt-5">
                <button className="bg-white font-medium  leading-3 h-[40px] border-2 delay-150 ease-linear border-black text-slate-800 w-1/2 rounded-md hover:bg-black hover:text-white ">
                  Order Now
                </button>
                <button className="bg-stone-200 font-medium  leading-3 h-[40px] text-slate-800 w-1/2 border-none rounded-md">
                  View Inventory
                </button>
              </div>
            </div>
            <div className="flex-[2] ">
              With an elevated seating position and low dash, the driver has a
              commanding view of the road ahead. The interior of Model Y is
              simple and clean, with a 15-inch touch screen, immersive sound
              system and an expansive all-glass roof that creates extra headroom
              and provides a seamless view of the sky. Compare Models
            </div>
          </div>
        </div>
      </div>
      <CarDetailInfor carInfor={car} />
      <div className="bg-black py-10">
        <p className="w-1/2 mx-auto text-white text-sm">
          Certain high data usage vehicle features require at least Standard
          Connectivity, including maps, navigation and voice commands. Access to
          features that use cellular data and third-party licenses are subject
          to change. Learn more about Standard Connectivity and any limitations.
        </p>
        <div className="relative py-10">
          <Footer />
        </div>
      </div>
    </>
  );
};

export default CarDetailPage;
