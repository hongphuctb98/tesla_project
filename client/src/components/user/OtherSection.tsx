import { Button } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
interface ICarSectionProps {
  name: string;
  href: string;
  src: string;
  des: string;
  lastIndex?: boolean;
}
const OtherSection: React.FC<ICarSectionProps> = ({
  name,
  href,
  src,
  des,
  lastIndex,
}) => {
  const navigate = useNavigate();

  const handleCarDetails = (url: string) => {
    navigate(url);
  };
  return (
    <>
      <div className="car-section h-screen snap-start ">
        <div
          className={` bg-cover bg-center h-full w-full relative`}
          style={{ backgroundImage: `url(${src})` }}
        >
          <div className="absolute top-[100px] left-1/2  w-[600px] h-[580px] -translate-x-1/2 flex flex-col justify-between ">
            <div className="text-center text-black">
              <h1 className="text-5xl font-semibold">{name}</h1>
              <span>{des}</span>
            </div>
            <div className="text-center ">
              <div className="flex gap-2 px-8">
                <Button
                  type="primary"
                  className="w-1/2 bg-blue-600/[.85] font-medium  leading-3 h-[40px]"
                  onClick={() => handleCarDetails(`/${href}`)}
                >
                  Order Now
                </Button>
                <Button className="w-1/2 bg-stone-500 border-none  font-medium  h-[40px] hover:bg-stone-400 text-white">
                  Demo drive
                </Button>
              </div>
            </div>
          </div>
          {lastIndex && <Footer />}
        </div>
      </div>
    </>
  );
};

export default OtherSection;
