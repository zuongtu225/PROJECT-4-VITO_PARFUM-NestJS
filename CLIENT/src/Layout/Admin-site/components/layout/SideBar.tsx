import React from "react";
import { MenuItem } from "../../Util/ItemSideBar";
import { NavLink } from "react-router-dom";

const SideBar = () => {
  return (
    <div>
      <div className="min-h-screen flex flex-col flex-auto flex-shrink-0 antialiased bg-gray-50 text-gray-800">
        <div className="fixed flex flex-col top-0 left-0  w-60 bg-white h-full border-r">
          <div className="flex items-center justify-center p-5 border-b">
            <div className="flex gap-0 items-center">
              <img
                className="w-[60px]"
                src="https://5.imimg.com/data5/SELLER/Default/2022/4/JS/DD/NU/1107622/logo-mp-500x500.PNG"
                alt=""
              />
              <h1>VITO PERFUME</h1>
            </div>
          </div>
          <div className="overflow-y-auto overflow-x-hidden flex-grow">
            <ul className="flex flex-col py-4 space-y-3">
              {MenuItem.map((item) => {
                return (
                  <li className="px-5  border-gray-300 hover:bg-blue-gray-50 cursor-pointer">
                    <div className="flex flex-row items-center h-8">
                      <div className="text-sm font-light tracking-wide text-black-500">
                        <NavLink
                          onClick={() => {
                            item.path === "/auth/login" &&
                              localStorage.removeItem("auth");
                          }}
                          to={`${item.path}`}
                          className="flex items-center text-xl hover:text-black w-full"
                        >
                          <span className="mr-4"> {item.icon}</span>
                          {item.title}
                        </NavLink>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
