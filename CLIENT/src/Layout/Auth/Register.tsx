import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import CustomerFooter from "../Customer-site/components/layout/Footer/CustomerFooter";
import { useDispatch, useSelector } from "react-redux";
import { getApiUsers } from "../../store/action";
import { AppDispatch } from "../../store";
import { ToastContainer, toast } from "react-toastify";
import { registerAPI } from "../../Api/auth";
import ButtonGoogle from "./button-google-login";

const Register = () => {
  const data = useSelector((state: any) => state?.userReducer?.users);
  const dispatch = useDispatch<AppDispatch>();
  const [email, setEmail] = useState<any>("");
  const [password, setPassword] = useState<any>("");
  const [confirmPassword, setConfirmPassword] = useState<any>("");
  const [success, setSuccess] = useState<any>("");
  const [error, setError] = useState<any>();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getApiUsers(null));
  }, []);
  const register = async (e: any) => {
    e.preventDefault();
    const checkUser = {
      email: email,
      password: password,
      confirmPassword: confirmPassword,
    };
    const newUser = {
      email: email,
      password: password,
      avatar:
        "https://bathanh.com.vn/wp-content/uploads/2017/08/default_avatar.png",
      firstName: "",
      lastName: "",
      role: data?.length === 0 ? 1 : 2,
    };
    const checkError = validate(checkUser);
    if (checkError.isError === false) {
      const response = await registerAPI(newUser);
      if (response.data.success === true) {
        toast.success("Đăng Ký Thành Công");
        setTimeout(() => {
          setEmail("");
          dispatch(getApiUsers(null));
          navigate("/auth/login");
        }, 3000);
      } else {
        toast.error("Đăng ký thất bại");
      }
    }
  };
  const validate = (user: any) => {
    const newError = {
      isError: false,
      emailMSG: "",
      passwordMSG: "",
      confirmPassWordMSG: "",
    };
    const checkData = data?.find((item: any) => item.email === user.email);
    if (checkData) {
      newError.isError = true;
      newError.emailMSG = "Email đã tồn tại ! ";
    }
    const regxEmail =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (!user.email.match(regxEmail)) {
      newError.isError = true;
      newError.emailMSG = "Email không đúng định dạng - Vui lòng nhập lại";
    }
    if (user.email.length > 30) {
      newError.isError = true;
      newError.emailMSG = "Email quá dài - Vui lòng nhập lại";
    }
    if (user.password.length < 8 || user.password.length > 30) {
      newError.isError = true;
      newError.passwordMSG =
        "Vui lòng tạo mật khẩu lớn hơn 8 và nhỏ hơn 30 ký tự";
    }
    if (user.password !== user.confirmPassword) {
      newError.isError = true;
      newError.confirmPassWordMSG = "Mật khẩu không trùng nhau";
    }
    setError(newError);
    return newError;
  };
  return (
    <>
      <div className="w-[40%] max-w-full px-3 mx-auto mt-0 mb-10 md:flex-0 shrink-0">
        <div className="relative z-0 flex flex-col min-w-0 break-words bg-white border-0 shadow-soft-xl rounded-2xl bg-clip-border">
          <div className="p-6 mb-0 text-center bg-white border-b-0 rounded-t-2xl">
            <h1 className="text-red-600 font-bold text-xl mb-10">
              VitoPerfume
            </h1>
            <h1>Đăng Ký </h1>
          </div>
          <div className="flex-auto p-6">
            <form role="form text-left ">
              <div className="mb-4">
                {error?.isError === true && (
                  <p className="text-green-700 w-[70%] m-auto mb-2">
                    {error.emailMSG}{" "}
                  </p>
                )}
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  aria-describedby="email-addon"
                  aria-label="Email"
                  placeholder="Email"
                  className="text-sm focus:shadow-soft-primary-outline leading-5.6 ease-soft block w-[70%] m-auto appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 px-3 font-normal text-gray-700 transition-all focus:border-fuchsia-300 focus:bg-white focus:text-gray-700 focus:outline-none focus:transition-shadow"
                  type="email"
                />
              </div>
              <div className="mb-4">
                {error?.isError === true && (
                  <p className="text-green-700 w-[70%] m-auto mb-2">
                    {error.passwordMSG}{" "}
                  </p>
                )}
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  aria-describedby="password-addon"
                  aria-label="Password"
                  placeholder="Mật khẩu"
                  className="text-sm focus:shadow-soft-primary-outline leading-5.6 ease-soft block w-[70%] m-auto appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 px-3 font-normal text-gray-700 transition-all focus:border-fuchsia-300 focus:bg-white focus:text-gray-700 focus:outline-none focus:transition-shadow"
                  type="password"
                />
              </div>
              <div className="mb-4">
                {error?.isError === true && (
                  <p className="text-green-700 w-[70%] m-auto mb-2">
                    {error.confirmPassWordMSG}
                  </p>
                )}
                <input
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  aria-describedby="password-addon"
                  aria-label="Password"
                  placeholder="Nhập lại mật khẩu"
                  className="text-sm focus:shadow-soft-primary-outline leading-5.6 ease-soft block w-[70%] m-auto appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 px-3 font-normal text-gray-700 transition-all focus:border-fuchsia-300 focus:bg-white focus:text-gray-700 focus:outline-none focus:transition-shadow"
                  type="password"
                />
              </div>
              <div className="text-center">
                <button
                  onClick={register}
                  className="inline-block mt-5 px-6 py-3 w-[70%] m-auto font-bold text-center bg-black text-white uppercase align-middle transition-all   border-0 rounded-lg cursor-pointer active:opacity-85 hover:scale-102 hover:shadow-soft-xs leading-pro text-xs ease-soft-in tracking-tight-soft shadow-soft-md   from-black-900 to-slate-800 hover:border-slate-700  "
                  type="button"
                >
                  Đăng Ký
                </button>
              </div>
              <div className="flex justify-between w-[70%] m-auto  mt-5 ">
                {error?.isError === false && (
                  <p className="text-green-700">{success} </p>
                )}
                <p className=" leading-normal text-sm">
                  Bạn đã có tài khoản?
                  <NavLink to={"/auth/login"} className={"ml-2"}>
                    Đăng nhập
                  </NavLink>
                </p>
                <NavLink to={"/"}>Trang chủ</NavLink>
              </div>
            </form>
          </div>
          <div className="flex flex-wrap px-3 -mx-3 sm:px-6 xl:px-12">
            <div className="relative w-full max-w-full px-3 mt-2 text-center shrink-0 mb-4">
              <p className="z-20 inline px-4  font-semibold leading-normal bg-white text-sm text-slate-400">
                hoặc đăng nhập với Google
              </p>
            </div>
            <ButtonGoogle />
          </div>
        </div>
      </div>
      <ToastContainer />
      <CustomerFooter />
    </>
  );
};

export default Register;
