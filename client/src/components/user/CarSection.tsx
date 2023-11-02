import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import { formatCurrency } from "../../helper";

interface ICarSectionProps {
  name: string;
  id: number;
  src: string;
  price: number;
}
const CarSection: React.FC<ICarSectionProps> = ({ name, id, src, price }) => {
  const navigate = useNavigate();

  const handleOrder = (id: string) => {
    navigate(`order/${id}/design`);
  };
  return (
    <div className="car-section h-screen snap-start ">
      <div
        className={` bg-cover bg-center h-full w-full relative`}
        style={{ backgroundImage: `url(${src})` }}
      >
        <div className="absolute top-[100px] left-1/2  w-[600px] h-[80%] -translate-x-1/2 flex flex-col justify-between ">
          <div
            className={`text-center ${
              name == "Model X" ? "text-black" : "text-white"
            }`}
          >
            <h1 className="text-5xl font-semibold">{name}</h1>
            <p className="text-2xl font-medium">
              From {formatCurrency(price)}*
            </p>
            <span>After Federal Tax Credit & Est. Gas Savings</span>
          </div>
          <div className="text-center ">
            <div className="flex gap-2 px-8">
              <Button
                type="primary"
                className="w-1/2 bg-blue-600/75 font-medium  leading-3 h-[40px]"
                onClick={() => handleOrder(`${id}`)}
              >
                Order Now
              </Button>
              <Button className="w-1/2 bg-stone-500 border-none  font-medium  h-[40px] hover:bg-stone-400 text-white">
                Demo drive
              </Button>
            </div>
            <p className="text-sm mt-5 text-white">
              *Price before incentives and savings is $79,990, excluding taxes
              and fees. Subject to change.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarSection;
