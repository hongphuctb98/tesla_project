import React, { useEffect, useState } from "react";
import { Button, Input, Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { searchAndPaging } from "../../../services/user.services";
import { AppDispatch } from "../../../redux/store";
import { debounce } from "lodash";
import axios from "axios";
import UserDetail from "../../../components/admin/UserDetail";

const Manager_User: React.FC<{}> = () => {
  const [keySearch, setKeySearch] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [idEdit, setIdEdit] = useState(null);
  const [userDetail, setUserDetail] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const dispatch: AppDispatch = useDispatch();

  const listUser = useSelector((state: any) => {
    return state.user.data.listUser;
  });

  const totalCount = useSelector((state: any) => {
    return state.user.data.totalCount;
  });

  useEffect(() => {
    const searchDelay = debounce(() => {
      dispatch(searchAndPaging({ keySearch, pageSize, currentPage }));
    }, 500);
    searchDelay();
    return () => {
      searchDelay.cancel();
    };
  }, [keySearch, pageSize, currentPage]);
  const renderPageNumber = () => {
    const pageNumber = [];
    for (let i = 1; i <= Math.ceil(totalCount / pageSize); i++) {
      pageNumber.push(i);
    }
    return pageNumber;
  };

  const handlePre = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const handleNext = () => {
    if (currentPage < Math.ceil(totalCount / pageSize)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const showModal = (id: any) => {
    setIdEdit(id);

    setIsModalOpen(true);
  };

  const getOneUser = () => {
    axios
      .get(`http://localhost:8080/api/v1/users/${idEdit}`)
      .then((res) => {
        setUserDetail(res.data.data[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getOneUser();
  }, [idEdit]);

  return (
    <>
      {userDetail && (
        <UserDetail
          userDetail={userDetail}
          setIsModalOpen={setIsModalOpen}
          isModalOpen={isModalOpen}
        />
      )}
      <div>
        <div className="flex justify-between items-center">
          <h3 className="text-2xl font-semibold">User managerment</h3>
        </div>
        <div className="flex justify-between items-center pt-4">
          <Input
            className="w-80"
            placeholder="Search by name or email"
            value={keySearch}
            onChange={(e) => setKeySearch(e.target.value)}
          ></Input>
        </div>

        <div>
          <table className="w-full border mt-4 text-center">
            <thead className="bg-stone-200 ">
              <tr>
                <th>
                  {/* <input type="checkbox" name="" id="" checked />  */}
                  STT
                </th>
                <th>Tên</th>
                <th>Giới tính</th>
                <th>Email</th>
                <th>Role</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {listUser?.length > 0 &&
                listUser
                  .filter((user: any) => user.UserId != -1)
                  .map((user: any, index: number) => (
                    <tr key={user.UserId}>
                      <th>
                        {/* <input type="checkbox" name="" id="" checked /> */}
                        {index + 1}
                      </th>
                      <td>{user.UserName}</td>
                      <td>{user.Gender === 0 ? "Male" : "Female"}</td>
                      <td>{user.Email}</td>
                      <td>{user.Role == 0 ? "Admin" : "Customer"}</td>
                      <td>
                        <Button
                          className="bg-teal-500"
                          onClick={() => showModal(user.UserId)}
                        >
                          Detail
                        </Button>
                      </td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-between items-center pt-5">
          <div>Hiển thị {totalCount} bản ghi</div>
          <div className="flex justify-between items-center gap-4">
            <select
              name=""
              id=""
              className="h-9 border outline-none px-4"
              onChange={(e) => setPageSize(Number(e.target.value))}
            >
              <option value={10}>10 bản ghi</option>
              <option value={20}>20 bản ghi</option>
              <option value={50}>50 bản ghi</option>
              <option value={100}>100 bản ghi</option>
            </select>
            <div className="flex justify-end gap-2">
              <p
                className={
                  currentPage > 1 ? "cursor-pointer" : "text-gray-400 "
                }
                onClick={handlePre}
              >
                Trước
              </p>
              <div className="flex gap-1">
                {renderPageNumber().map((number) => (
                  <span
                    className={`${
                      currentPage === number
                        ? "border-fuchsia-600 border font-bold"
                        : ""
                    } cursor-pointer   px-2 `}
                    key={number}
                    onClick={() => setCurrentPage(number)}
                  >
                    {number}
                  </span>
                ))}
              </div>
              <p
                className={
                  currentPage < Math.ceil(totalCount / pageSize)
                    ? " cursor-pointer"
                    : "text-gray-400"
                }
                onClick={handleNext}
              >
                Sau
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Manager_User;
