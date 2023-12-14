import { Button } from "@material-tailwind/react";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../../store";
import { getDetailUser } from "../../../../store/action";
import { AddModal } from "../modal/AddModal.1";
import { Iprops } from "../../../../Interface";
import SearchComponent from "../search";

// Header nhận props title từ các PAGES
const AdminHeader = (props: Iprops) => {
  const userDetail = useSelector(
    (state: any) => state?.userReducer?.userDetail
  );
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(getDetailUser());
  }, []);
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(!open);
  };
  const handleClose = (open: boolean) => {
    setOpen(open);
  };

  return (
    <div>
      <AddModal title={props.title} open={open} handleClose={handleClose} />
      <form className="flex items-center pb-5">
        <div className="p-4 uppercase font-semibold text-xl">{props.title}</div>
        <label htmlFor="voice-search" className="sr-only">
          Search
        </label>
        <div className="relative w-[70%]">
          <SearchComponent slug={props.slug} />
          <button
            type="button"
            className="absolute inset-y-0 right-0 flex items-center pr-3"
          >
            <svg
              className="w-4 h-4 mr-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </button>
        </div>
        <button
          type="submit"
          className="inline-flex items-center py-2.5 px-3 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Search
        </button>
        <Button className="m-2" onClick={handleOpen}>
          THÊM
        </Button>
        {/* B1 KHI CLICK vào nút THÊM ở Header thì chỉ thay đổi trạng thái của open */}
        <div className="Account">
          <>
            <button
              id="dropdownUserAvatarButton"
              data-dropdown-toggle="dropdownAvatar"
              className="flex mx-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
              type="button"
            >
              <NavLink to={"/profile"}>
                <img
                  style={{
                    objectFit: "cover",
                    width: "45px",
                    height: "45px",
                    borderRadius: "50%",
                  }}
                  src={`${userDetail?.avatar}`}
                  alt=""
                />
              </NavLink>
            </button>
            <div
              id="dropdownAvatar"
              className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600"
            >
              <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                <div>Bonnie Green</div>
                <div className="font-medium truncate">name@flowbite.com</div>
              </div>
              <ul
                className="py-2 text-sm text-gray-700 dark:text-gray-200"
                aria-labelledby="dropdownUserAvatarButton"
              >
                <li>
                  <NavLink
                    to={"/"}
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Dashboard
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={"/"}
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Settings
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={"/"}
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Earnings
                  </NavLink>
                </li>
              </ul>
              <div className="py-2">
                <NavLink
                  to={"/"}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                >
                  Sign out
                </NavLink>
              </div>
            </div>
          </>
        </div>
      </form>
    </div>
  );
};

export default AdminHeader;
