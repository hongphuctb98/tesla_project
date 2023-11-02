import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const UserProfile = () => {
  const params = useParams();
  const [user, setUser] = useState<any>();
  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/v1/users/${params.id}`)
      .then((res) => {
        setUser(res.data.data[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className="rounded-lg min-h-[80vh] bg-gray-200 p-4 flex gap-4 text-gray-700">
      <div className="w-4/12  flex flex-col gap-4">
        <div className="bg-white p-4 flex flex-col items-center">
          <img
            className="h-24 w-24 rounded-full"
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt=""
          />
          <h1 className="text-2xl font-bold">Phuc</h1>
          <p>Lorem ipsum dolor sit amet.</p>
          <p>Lorem ipsum dolor sit amet consectetur.</p>
          <button className="py-2 px-4 bg-blue-500 text-white mt-4 rounded-md hover:bg-blue-600">
            Edit Profile
          </button>
        </div>
        <div className="bg-white">
          <ul>
            <li className="flex justify-between p-3 border-b-2 border-b-gray-200 cursor-pointer">
              <div>
                <i className="fa-solid fa-globe pr-2"></i>Website
              </div>
              <a href="https://example.com">https://example.com</a>
            </li>
            <li className="flex justify-between p-3 border-b-2 border-b-gray-200 cursor-pointer">
              <div>
                <i className="fa-brands fa-facebook-f pr-2"></i>Facebook
              </div>
              <a href="https://facebook.com">https://facebook.com</a>
            </li>
            <li className="flex justify-between p-3 border-b-2 border-b-gray-200 cursor-pointer">
              <div>
                <i className="fa-brands fa-github pr-2"></i>Github
              </div>
              <a href="https://github.com">https://github.com</a>
            </li>
            <li className="flex justify-between p-3 border-b-2 border-b-gray-200 cursor-pointer">
              <div>
                <i className="fa-brands fa-twitter pr-2"></i>Twitter
              </div>
              <a href="https://twitter.com">https://twitter.com</a>
            </li>
            <li className="flex justify-between p-3 border-b-2 border-b-gray-200 cursor-pointer">
              <div>
                <i className="fa-brands fa-instagram pr-2"></i>Instagram
              </div>
              <a href="https://instagram.com">https://instagram.com</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="w-8/12 bg-white p-4">
        <ul>
          <li className="flex justify-between p-3 border-b-2 border-b-gray-200 text-normal ">
            <p className="font-bold ">UserName</p>
            <p className=" text-gray-600 w-3/4">{user?.UserName}</p>
          </li>
          <li className="flex justify-between p-3 border-b-2 border-b-gray-200 text-normal ">
            <p className="font-bold ">Email</p>
            <p className=" text-gray-600 w-3/4">{user?.Email}</p>
          </li>
          <li className="flex justify-between p-3 border-b-2 border-b-gray-200 text-normal ">
            <p className="font-bold ">Date of Birth</p>
            <p className=" text-gray-600 w-3/4">{user?.DateOfBirth}</p>
          </li>
          <li className="flex justify-between p-3 border-b-2 border-b-gray-200 text-normal ">
            <p className="font-bold ">Gender</p>
            <p className=" text-gray-600 w-3/4">
              {user?.Gender === 0 ? "Male" : "Female"}
            </p>
          </li>
          <li className="flex justify-between p-3 border-b-2 border-b-gray-200 text-normal ">
            <p className="font-bold ">Phone number</p>
            <p className=" text-gray-600 w-3/4">{user?.PhoneNumber}</p>
          </li>
          <li className="flex justify-between p-3 border-b-2 border-b-gray-200 text-normal ">
            <p className="font-bold ">Address</p>
            <p className=" text-gray-600 w-3/4">
              {user?.Address ? user.Address : "---"}
            </p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default UserProfile;
