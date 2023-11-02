import React, { useEffect, useState } from "react";
import { Carousel } from "antd";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const contentStyle: React.CSSProperties = {
  height: "560px",
  color: "red",
  lineHeight: "160px",
  textAlign: "center",
};

const CarDetailImages = () => {
  const [car, setCar] = useState<any>({});
  const params = useParams();

  const orderFromRedux = useSelector((state: any) => state.product.order);
  const orderFromLocalStorage = JSON.parse(
    localStorage.getItem("order") || "{}"
  );

  const order =
    orderFromRedux && Object.keys(orderFromRedux).length > 0
      ? orderFromRedux
      : orderFromLocalStorage;
  const [carImg, setCarImg] = useState<any>("");

  const fetcOneCar = () => {
    axios
      .get(`http://localhost:8080/api/v1/products/${params.id}`)
      .then((res) => setCar(res.data.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetcOneCar();
  }, [params]);

  useEffect(() => {
    if (car?.ImageList?.length > 0) {
      const img = car.ImageList.find((item: any) => {
        return (
          item.VersionName === order.version && item.ColorName === order.color
        );
      });

      setCarImg(img);
    }
  }, [order]);
  console.log(carImg);

  return (
    <div className=" w-[72%] top-12 bottom-0 left-0 fixed h-screen ">
      <Carousel>
        <div style={contentStyle}>
          {carImg ? (
            <img src={carImg.ImageUrl} alt="" className="scale-125" />
          ) : (
            <img
              src="https://thumbs.dreamstime.com/z/sorry-sold-out-rubber-stamp-text-inside-illustration-82944187.jpg?w=992"
              alt=""
            />
          )}
        </div>
        <div style={contentStyle}>
          <img src={carImg && carImg.ImageUrl} alt="" className="scale-125" />
        </div>
        <div style={contentStyle}>
          <img src={carImg && carImg.ImageUrl} alt="" className="scale-125" />
        </div>
        <div style={contentStyle}>
          <img src={carImg && carImg.ImageUrl} alt="" className="scale-125" />
        </div>
      </Carousel>
    </div>
  );
};

export default CarDetailImages;
