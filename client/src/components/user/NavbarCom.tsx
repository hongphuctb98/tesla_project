import React, { Fragment, useEffect, useState } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link, useNavigate } from "react-router-dom";
import { Dropdown, Space } from "antd";
import NavbarMenuItem from "./NavbarMenuItem";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProduct } from "../../services/product.services";
import AppDispatch from "../../main";

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

const energys = [
  {
    name: "Solar Panels",
    href: "solarpanels",
    src: "https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Mega-Menu-Energy-Solar-Panels.png",
  },
  {
    name: "Solar Roof",
    href: "solarroof",
    src: "https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Mega-Menu-Energy-Solar-Roof.png",
  },
  {
    name: "Powerwall",
    href: "powerwall",
    src: "https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Mega-Menu-Energy-Powerwall-US.png",
  },
  {
    name: "Megapack",
    href: "megapack",
    src: "https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Mega-Menu-Energy-Megapack.png",
  },
];

const chargings = [
  {
    name: "Charging",
    href: "charging",
    src: "https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Mega-Menu-Charging-Charging.png",
  },
  {
    name: "Home Charging",
    href: "homecharging",
    src: "https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Mega-Menu-Charging-Home-Charging.png",
  },
  {
    name: "Supercharging",
    href: "supercharging",
    src: "https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Mega-Menu-Charging-Supercharging.png",
  },
];

const NavbarCom: React.FC<{}> = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [vehicleList, setVehicleList] = useState([]);
  const loginUser = JSON.parse(localStorage.getItem("loginUser") || "{}");

  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  const energyList = energys.map((item, key) => {
    return {
      label: (
        <NavbarMenuItem name={item.name} src={item.src} href={item.href} />
      ),
      key: key,
    };
  });
  const chargingList = chargings.map((item, key) => {
    return {
      label: (
        <NavbarMenuItem name={item.name} src={item.src} href={item.href} />
      ),
      key: key,
    };
  });

  const products = useSelector((state: any) => state.product.data);

  useEffect(() => {
    dispatch(fetchAllProduct());
  }, []);

  useEffect(() => {
    products?.length > 0 &&
      setVehicleList(
        products.map((item: any) => {
          return {
            label: (
              <NavbarMenuItem
                name={item.CarName}
                src={item.MainImage}
                href={item.CarId}
              />
            ),
            key: item.id,
          };
        })
      );
  }, [products]);

  let [navigation, setNavigation] = useState([
    {
      name: "Vehicles",
      href: "/",
      current: false,
      dropdown: vehicleList,
    },
    { name: "Energy", href: "/", current: false, dropdown: energyList },
    { name: "Charging", href: "/", current: false, dropdown: chargingList },
    { name: "Discover", href: "discover", current: false },
    { name: "Shop", href: "shop", current: false },
  ]);

  useEffect(() => {
    if (vehicleList.length > 0) {
      const updatedNavigation = navigation.map((item) => {
        if (item.name === "Vehicles") {
          return {
            ...item,
            dropdown: vehicleList,
          };
        }
        return item;
      });
      setNavigation(updatedNavigation);
    }
  }, [vehicleList]);

  useEffect(() => {
    if (localStorage.getItem("loginUser")) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, [isLogin]);

  const handleSignOut = () => {
    navigate("/user/login");
    localStorage.removeItem("loginUser");
  };
  const handleUserProfile = () => {
    let userId = loginUser?.user?.userId;
    if (userId !== "-1") {
      navigate(`/user/${loginUser.user.userId}/profile`);
    } else {
      navigate(`/user/login`);
    }
  };

  return (
    <Disclosure
      as="nav"
      className="bg-gray-800 fixed top-0 left-0 right-0 z-50"
    >
      {({ open }) => (
        <>
          <div className="mx-auto max-w-8xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <Link className="flex flex-shrink-0 items-center" to={"/"}>
                  <img
                    className="h-8  w-16"
                    src="https://www.carlogos.org/car-logos/tesla-logo-2007.png"
                    alt="Your Company"
                  />
                </Link>

                <div className="hidden sm:ml-6 sm:block ">
                  <div className="flex space-x-4 navabarCom">
                    {navigation.map((item: any) => (
                      <div
                        key={item.name}
                        className={classNames(
                          item.current
                            ? "bg-gray-900 text-white"
                            : "text-gray-300 hover:bg-gray-700 hover:text-white",
                          "rounded-md px-3 py-2 text-sm font-medium hover:no-underline"
                        )}
                        onClick={() =>
                          setNavigation(
                            navigation.map((nav) =>
                              nav.name == item.name
                                ? { ...nav, current: true }
                                : { ...nav, current: false }
                            )
                          )
                        }
                        aria-current={item.current ? "page" : undefined}
                      >
                        {item.dropdown ? (
                          <Dropdown
                            menu={{
                              items: item.dropdown,
                              className: "flex gap-x-10 justify-center w-full",
                            }}
                            placement="bottomCenter"
                          >
                            <Space>{item.name}</Space>
                          </Dropdown>
                        ) : (
                          item.name
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <button
                  type="button"
                  className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                >
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button>

                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  {isLogin ? (
                    <>
                      {" "}
                      <div>
                        <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                          <span className="absolute -inset-1.5" />
                          <span className="sr-only">Open user menu</span>
                          {isLogin ? (
                            <img
                              className="h-8 w-8 rounded-full"
                              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                              alt=""
                            />
                          ) : (
                            <div className="text-white ">
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
                                  d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                                />
                              </svg>
                            </div>
                          )}
                        </Menu.Button>
                      </div>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                          <Menu.Item>
                            {({ active }) => (
                              <p
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-base text-gray-700"
                                )}
                                onClick={handleUserProfile}
                              >
                                Your Profile
                              </p>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <a
                                href="#"
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-base text-gray-700"
                                )}
                              >
                                Settings
                              </a>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <p
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-base text-gray-700 cursor-pointer"
                                )}
                                onClick={handleSignOut}
                              >
                                Sign out
                              </p>
                            )}
                          </Menu.Item>
                        </Menu.Items>
                      </Transition>
                    </>
                  ) : (
                    <div onClick={handleSignOut}>
                      <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                        <span className="absolute -inset-1.5" />
                        <span className="sr-only">Open user menu</span>
                        {isLogin ? (
                          <img
                            className="h-8 w-8 rounded-full"
                            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                            alt=""
                          />
                        ) : (
                          <div className="text-white ">
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
                                d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                              />
                            </svg>
                          </div>
                        )}
                      </Menu.Button>
                    </div>
                  )}
                </Menu>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "block rounded-md px-3 py-2 text-base font-medium"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};
export default NavbarCom;
