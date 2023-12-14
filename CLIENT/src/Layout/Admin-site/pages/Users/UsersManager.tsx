import React, { useEffect, useState } from "react";
import AdminHeader from "../../components/layout/Header";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../../store";
import { getApiUsers, getDetailUser } from "../../../../store/action";
import { updateStatusUser } from "../../../../Api";
import { ToastContainer, toast } from "react-toastify";
import Pagination from "../../components/pagination";
import { IUser } from "../../../../Interface";
import * as io from "socket.io-client";
import Export from "../../components/export";
const socket = io.connect("http://localhost:9000");
const UsersManager = () => {
  const dispatch = useDispatch<AppDispatch>();
  const users = useSelector((state: any) => state?.userReducer?.users);
  const [data, setData] = useState<IUser[]>();
  const handlePage = (pagination: any) => {
    setData(pagination);
  };
  useEffect(() => {
    dispatch(getApiUsers(null));
  }, []);
  const handleStatus = async (status: any, id: number) => {
    const newStatus = +status === 1 ? true : false;
    if (status === 2) {
      socket.emit("blockUser", "");
    }
    const response = await updateStatusUser(newStatus, id);
    if (response?.data?.success === true) {
      toast.success(response?.data?.message);
      setTimeout(async () => {
        await dispatch(getApiUsers(null));
        await dispatch(getDetailUser());
      }, 1000);
    } else {
      toast.error(response.data.message);
    }
  };
  return (
    <div>
      <AdminHeader title={"USERS"} slug={"USERS"} />
      <ToastContainer />
      <Export data={users} slug={"USERS"} />
      <div className="content users">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-15 py-3">
                  Avatar
                </th>
                <th scope="col" className="px-20 py-3">
                  Tên người dùng
                </th>
                <th scope="col" className="px-20 py-3">
                  Email
                </th>
                <th scope="col" className="px-6 py-3">
                  Vai trò
                </th>
                <th scope="col" className="px-6 py-3">
                  Trạng thái
                </th>
              </tr>
            </thead>
            <tbody>
              {data?.map((item: any, index: number) => {
                return (
                  <tr>
                    <td className="pl-10 py-2 ">
                      <img
                        src={item.avatar}
                        alt=""
                        className="w-20 h-20 object-cover "
                      />
                    </td>
                    <td className="px-1 py-2">
                      {item.firstName + " " + item.lastName}
                    </td>
                    <td className="px-1 py-2 ">{item.email}</td>
                    <td className="px-1 py-2">
                      <button>
                        {item.role.id === 1 ? "Quản trị viên" : "Người dùng"}
                      </button>
                    </td>
                    <td className="px-1 py-2 ">
                      {item.role.id === 2 && (
                        <select
                          onChange={(e: any) =>
                            handleStatus(e.target.value, item.id)
                          }
                        >
                          <option value={item.status ? 1 : 2}>
                            {item.status ? "Active" : "Block"}
                          </option>
                          <option value={item.status ? 2 : 1}>
                            {item.status ? "Block" : "Active"}
                          </option>
                        </select>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <div className="p-4">
            <Pagination data={users} handlePage={handlePage} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsersManager;
