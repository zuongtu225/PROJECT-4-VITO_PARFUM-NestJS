import React, { useEffect, useState } from "react";
import { getDetailUser } from "../../../../store/action";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../../store";
import { LiaUserEditSolid } from "react-icons/lia";
import { BsCart4 } from "react-icons/bs";
import { BiHomeSmile } from "react-icons/bi";
import { MdAdminPanelSettings } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import { NavLink } from "react-router-dom";
import { Dialog, DialogFooter, DialogHeader } from "@material-tailwind/react";
import { Button } from "flowbite-react";
import { updateAvatarUser, updateUser } from "../../../../Api";
const Profile = () => {
  const dispatch = useDispatch<AppDispatch>();
  const userDetail: any = useSelector(
    (state: any) => state?.userReducer?.userDetail
  );
  const [firstName, setFirstName] = useState<string>(userDetail.firstName);
  const [lastName, setLastName] = useState<string>(userDetail.lastName);
  const [open, setOpen] = useState(false);
  const ClickClose = () => {
    setOpen(false);
  };
  const openModal = () => {
    setOpen(true);
  };

  useEffect(() => {
    dispatch(getDetailUser());
  }, []);
  const updateUserApi = async () => {
    const dataUpdate = {
      firstName,
      lastName,
    };
    const response = await updateUser(dataUpdate);
    if (response?.data?.success === true) {
      setOpen(false);
      toast.success(response?.data?.message);
      await dispatch(getDetailUser());
    } else {
      setOpen(false);
      toast.error(response?.data?.message);
    }
  };

  const updateImage = async (e: any) => {
    const formData = new FormData();
    for (let img of e.target.files) formData.append("avatar", img);
    await updateAvatarUser(formData);
    await dispatch(getDetailUser());
  };

  return (
    <>
      <Dialog open={open} handler={ClickClose}>
        <DialogHeader>
          Cập nhật thông tin cá nhân
          <LiaUserEditSolid className="text-light-blue-600 ml-5" />
        </DialogHeader>
        <form encType="multipart/form-data ">
          <div className=" p-5 pb-1">
            <input
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setFirstName(e.target.value)
              }
              placeholder="Họ"
              value={firstName}
              type="text"
              id="password"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            />
          </div>
          <div className=" p-5 pb-1">
            <input
              value={lastName}
              placeholder="Tên"
              type="text"
              id="repeat-password"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setLastName(e.target.value)
              }
            />
          </div>
          <div className="mb-6 p-5">
            <label
              htmlFor="Avatar"
              className="block pb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Cập nhật ảnh đại diện
            </label>
            <div>
              <img
                className="w-[100px] pb-5"
                src={`${userDetail.avatar}`}
                alt=""
              />
              <input
                type="file"
                className=" w-[50%] shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                onChange={updateImage}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="text"
              color="red"
              onClick={ClickClose}
              className="mr-1"
            >
              <span>Cancel</span>
            </Button>
            <Button color="green">
              <p onClick={updateUserApi}>
                <span>Cập nhật</span>
              </p>
            </Button>
          </DialogFooter>
        </form>
      </Dialog>
      {/* model */}
      <img
        className="w-full h-[100px] object-cover "
        src="https://wallpapercrafter.com/sizes/3840x2160/213577-perfume-scent-pink-and-ribbon-hd.jpg"
        alt=""
      />
      {/* profile user begin*/}
      <div className="h-[550px] bg-gray-200 pt-10 pb-2">
        {/* Card start */}
        <div>
          <div className="max-w-sm mx-auto bg-white rounded-lg overflow-hidden shadow-lg">
            <div className="border-b px-4 pb-6">
              <div className="text-center my-4">
                <img
                  className="h-32 w-32 object-cover rounded-full border-4 border-white mx-auto my-4"
                  src={`${userDetail.avatar}`}
                  alt=""
                />
                <div className="py-2">
                  <h3 className="font-bold text-2xl mb-2 text-light-blue-600">
                    {userDetail.firstName + " " + userDetail.lastName}
                  </h3>
                  <h3 className="font-bold text-2xl mb-1">
                    {userDetail.email}
                  </h3>
                  <div className="inline-flex text-gray-700 items-center gap-4  pl-[80px]  w-full  mt-2">
                    <BsCart4 className="text-green-500 " />
                    <NavLink to={"/cart"}>Giỏ hàng của bạn</NavLink>
                  </div>
                </div>
              </div>
              <div className=" px-2">
                <button
                  onClick={openModal}
                  className="flex-1 rounded-full bg-blue-600 text-white antialiased font-bold hover:bg-blue-800 w-full py-2"
                >
                  Sửa thông tin
                </button>
              </div>
            </div>
            <div className="px-4 py-5">
              <div className="flex gap-2 items-center text-gray-800r text-light-blue-500  m-auto">
                <BiHomeSmile />
                <NavLink to={"/"}>
                  <p>Trang chủ</p>
                </NavLink>
              </div>
              {userDetail?.role?.role === 1 && (
                <div className=" flex pb-3 gap-2 items-center text-gray-800r text-light-blue-500  m-auto">
                  <MdAdminPanelSettings />
                  <NavLink to={"/admin"}>
                    <p>Trang Admin</p>
                  </NavLink>
                </div>
              )}
            </div>
          </div>
        </div>
        {/* Card end */}
      </div>
      <ToastContainer />
    </>
  );
};

export default Profile;
