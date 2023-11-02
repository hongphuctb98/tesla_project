import React from "react";
import NavbarCom from "../../../components/user/NavbarCom";
import CarSection from "../../../components/user/CarSection";
import OtherSection from "../../../components/user/OtherSection";
import { useSelector } from "react-redux";

const otherOrders = [
  {
    name: "Solar Roof",
    href: "solarroof",
    src: "https://digitalassets.tesla.com/tesla-contents/image/upload/h_1800,w_2880,c_fit,f_auto,q_auto:best/Homepage-SolarRoof-Desktop-Global",
    des: "Produce Clean Energy From Your Roof",
  },
  {
    name: "Solar Panels",
    href: "solarpanels",
    src: "https://digitalassets.tesla.com/tesla-contents/image/upload/h_1800,w_2880,c_fit,f_auto,q_auto:best/425_HP_SolarPanels_D",
    des: "Schedule a Virtual Consultation",
  },
  {
    name: "Powerwall",
    href: "powerwall",
    src: "https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Homepage-Powerwall-Desktop.jpg",
    des: "",
  },
  {
    name: "Accessories",
    href: "accessories",
    src: "https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Homepage-Accessories-Desktop-NA-APAC.jpg",
    des: "",
  },
];
const HomePage: React.FC = () => {
  const products = useSelector((state: any) => state.product.data);

  return (
    <div>
      <NavbarCom />
      <div className="snap-y snap-mandatory h-screen overflow-y-scroll scrollbar-none scrollbar-thumb-gray-500 scrollbar-track-gray-300">
        {products?.length > 0 &&
          products.map((item: any, key: number) => {
            return (
              <CarSection
                key={key}
                name={item.CarName}
                id={item.CarId}
                src={item.BgImage}
                price={item.BasePrice}
              />
            );
          })}
        {otherOrders.map((item, key) => {
          return (
            <OtherSection
              key={key}
              name={item.name}
              href={item.href}
              src={item.src}
              des={item.des}
              lastIndex={key == otherOrders.length - 1 ? true : false}
            />
          );
        })}
      </div>
    </div>
  );
};

export default HomePage;
