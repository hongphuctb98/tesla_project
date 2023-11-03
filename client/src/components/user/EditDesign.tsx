import { Radio, RadioChangeEvent, version } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { numberWithCommas } from "../../helper";
import { useDispatch } from "react-redux";
import { setOrder } from "../../redux/productSlice";

const EditDesign = () => {
  const [car, setCar] = useState<any>({});
  const versions = car?.VersionList;
  const colors = car?.ColorList;

  const [selectedVersion, setSelectedVersion] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [autopilot, setAutopilot] = useState(false);
  const [selfDriving, setSelfDriving] = useState(false);
  const params = useParams();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const onChangeVersion = (e: RadioChangeEvent) => {
    setSelectedVersion(e.target.value);
  };
  const onChangeColor = (e: RadioChangeEvent) => {
    setSelectedColor(e.target.value);
  };

  const handleOrderCard = () => {
    navigate(`/order/${params.id}/ordercard`);
  };

  const fetcOneCar = () => {
    axios
      .get(`http://localhost:8080/api/v1/products/${params.id}`)
      .then((res) => {
        const { data } = res.data;

        setCar(data);
        setSelectedVersion(data.ImageList[0].VersionName);
        setSelectedColor(data.ImageList[0].ColorName);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetcOneCar();
  }, [params]);

  useEffect(() => {
    let cardetailId;

    if (car?.ImageList?.length > 0) {
      const img = car.ImageList.find((item: any) => {
        return (
          item.VersionName === selectedVersion &&
          item.ColorName === selectedColor
        );
      });

      cardetailId = img.CardetailId;
    }
    dispatch(
      setOrder({
        car: car.CarName,
        version: selectedVersion,
        color: selectedColor,
        cardetailId,
        autopilot,
        selfDriving,
      })
    );

    localStorage.setItem(
      "order",
      JSON.stringify({
        car: car.CarName,
        version: selectedVersion,
        color: selectedColor,
        cardetailId,
        autopilot,
        selfDriving,
      })
    );
  }, [selectedColor, selectedVersion, autopilot, selfDriving]);

  useEffect(() => {
    const currentOrder = location.state;
    if (currentOrder) {
      setSelectedVersion(currentOrder.version);
      setSelectedColor(currentOrder.color);
      setAutopilot(currentOrder.autopilot);
      setSelfDriving(currentOrder.selfDriving);
    }
  }, [location, car]);
  const renderByVersion = (versions: any) => {
    return versions.find((v: any) => {
      if (v.VersionName === selectedVersion) {
        return v;
      }
    });
  };
  return (
    <>
      <h1 className="text-4xl font-semibold text-center pt-5  text-slate-800">
        {car.CarName}
      </h1>
      <ul className="flex justify-around justify-items-center text-center pt-8">
        <li className="">
          <p>
            <b className="text-2xl">
              {versions?.length > 0
                ? renderByVersion(versions).Range
                : "...update"}
            </b>
            mi
          </p>
          <span className="font-light text-sm">Range (EPA est.)</span>
        </li>
        <li>
          <p>
            <b className="text-2xl">
              {versions?.length > 0
                ? renderByVersion(versions).TopSpeed
                : "...update"}
            </b>
            mph
          </p>
          <span className="font-light text-sm">Top Speed</span>
        </li>
        <li>
          <p>
            <b className="text-2xl">
              {versions?.length > 0
                ? renderByVersion(versions).Wattage
                : "...update"}
            </b>
            sec
          </p>
          <span className="font-light text-sm">0-60 mph</span>
        </li>
      </ul>
      <div className="pt-5 car-version">
        <p className="text-3xl font-medium py-5 text-center text-slate-800">
          Version
        </p>
        <Radio.Group
          onChange={onChangeVersion}
          value={selectedVersion}
          className="flex flex-col "
        >
          {versions?.length > 0 &&
            versions.map((ver: any, index: number) => (
              <Radio
                value={ver.VersionName}
                key={index}
                className={`text-lg border w-11/12 p-2 rounded-lg  mb-3 ${
                  selectedVersion === ver.VersionName
                    ? `text-black border-blue-600 border-[3px] font-bold`
                    : `text-stone-400 border-stone-300`
                }}`}
              >
                <div className="flex justify-between ">
                  <p>{ver.VersionName}</p>
                  <p>${numberWithCommas(ver.Price)}</p>
                </div>
              </Radio>
            ))}
        </Radio.Group>
      </div>
      <div className="pt-5 car-color">
        <p className="text-3xl font-medium py-5 text-center text-slate-800">
          Paint
        </p>
        <Radio.Group onChange={onChangeColor} value={selectedColor}>
          {colors?.length > 0 &&
            colors.map((color: any, index: number) => (
              <Radio
                value={color.ColorName}
                key={index}
                // className={`mb-3  ${
                //   selectedColor === color.ColorName
                //     ? ` border-blue-600 border-[3px]`
                //     : ` border-stone-300`
                // }}`}
              >
                <div
                  className={`w-12 h-12 ${
                    selectedColor == color.ColorName ? "border-blue-600" : ""
                  } border-[3px] rounded-full p-1`}
                >
                  <img src={color.ColorImage} alt="" className="w-full" />
                </div>
              </Radio>
            ))}
        </Radio.Group>
      </div>

      <div className="pt-16 ">
        <p className="text-3xl font-medium pb-5 text-center text-slate-800">
          Enhanced Autopilot
          <p className="text-center text-base text-gray-500">$6000</p>
        </p>

        <ul className="list-disc px-12 text-base text-gray-600">
          <li> Navigate on Autopilot</li>
          <li>Auto Lane Change</li>
          <li>Autopark</li>
          <li>Summon</li>
          <li>Smart Summon</li>
        </ul>
        <div className="text-center">
          {autopilot ? (
            <button
              className="mt-5 w-1/2 text-center px-4 py-2 rounded-md font-bold text-white bg-blue-600 hover:bg-blue-700"
              onClick={() => setAutopilot(false)}
            >
              Add
            </button>
          ) : (
            <button
              className="mt-5 w-1/2 text-center px-4 py-2 rounded-md font-bold text-slate-900 bg-gray-300 hover:bg-gray-400/50"
              onClick={() => setAutopilot(true)}
            >
              Remove
            </button>
          )}
        </div>
      </div>
      <div className="pt-16 ">
        <p className="text-3xl font-medium pb-5 text-center text-slate-800">
          Full Self-Driving <br /> Capability
          <p className="text-center text-base text-gray-500">$12000</p>
        </p>
        <div className="px-3 text-sm text-gray-600">
          <p className="  pb-4">
            Your car will be able to drive itself almost anywhere with minimal
            driver intervention and will continuously improve
          </p>

          <ul className="list-disc px-12 pb-6">
            <li>All functionality of Basic Autopilot and Enhanced Autopilot</li>
            <li>Autosteer on city streets</li>
            <li>Traffic Light and Stop Sign Control</li>
          </ul>
          <p>
            The currently enabled features require active driver supervision and
            do not make the vehicle autonomous. The activation and use of these
            features are dependent on achieving reliability far in excess of
            human drivers as demonstrated by billions of miles of experience, as
            well as regulatory approval, which may take longer in some
            jurisdictions. As these self-driving features evolve, your car will
            be continuously upgraded through over-the-air software updates.
          </p>
        </div>
        <div className="text-center">
          {selfDriving ? (
            <button
              className="mt-5 w-1/2 text-center px-4 py-2 rounded-md font-bold text-white bg-blue-600 hover:bg-blue-700"
              onClick={() => setSelfDriving(false)}
            >
              Add
            </button>
          ) : (
            <button
              className="mt-5 w-1/2 text-center px-4 py-2 rounded-md font-bold text-slate-900 bg-gray-300 hover:bg-gray-400/50"
              onClick={() => setSelfDriving(true)}
            >
              Remove
            </button>
          )}
        </div>
        <p className="text-sm text-gray-600 px-3 pt-3">
          Software options are excluded from the federal tax credit price cap
        </p>
      </div>

      <h1 className="text-3xl font-semibold text-center pt-5  text-slate-800">
        Order Your Model 3
      </h1>

      <div className="text-center">
        <button
          className="mt-5 w-4/5 text-center px-4 py-2 rounded-md font-bold text-white bg-blue-600 hover:bg-blue-700 "
          onClick={handleOrderCard}
        >
          Continue
        </button>
      </div>
    </>
  );
};

export default EditDesign;
