import React from "react";
import { useNavigate } from "react-router-dom";

interface INavbarMenuItemProps {
  name: string;
  href: string;
  src: string;
}

const NavbarMenuItem: React.FC<INavbarMenuItemProps> = (props) => {
  const navigate = useNavigate();

  const handleDeposit = (id: string) => {
    navigate(`/order/${id}/design`);
  };
  const handleDetail = (id: string) => {
    navigate(`/car/${id}`);
  };
  return (
    <div>
      <div onClick={() => handleDetail(props.href)}>
        <img className="w-16 md:w-32 lg:w-48" src={props.src}></img>
      </div>
      <p className="text-center text-lg font-semibold">{props.name}</p>
      <div className="flex gap-4 justify-center">
        <button
          className="underline underline-offset-4 hover:font-bold hover:text-black"
          onClick={() => handleDetail(props.href)}
        >
          Learn
        </button>
        <button
          className="underline underline-offset-4 hover:font-bold hover:text-black"
          onClick={() => handleDeposit(props.href)}
        >
          Order
        </button>
      </div>
    </div>
  );
};

export default NavbarMenuItem;
