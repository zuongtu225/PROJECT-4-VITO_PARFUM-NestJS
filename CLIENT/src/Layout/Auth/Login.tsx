import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import CustomerFooter from "../Customer-site/components/layout/Footer/CustomerFooter";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import { getApiUsers } from "../../store/action";
import { ToastContainer, toast } from "react-toastify";
import { loginAPI } from "../../Api/auth";
import ButtonGoogle from "./button-google-login";
import * as io from "socket.io-client";
const socket = io.connect("http://localhost:9000");
const Login = () => {
  const [email, setEmail] = useState<any>("");
  const [password, setPassword] = useState<any>("");
  const [error, setError] = useState<any>();
  const [isBlock, setIsBlock] = useState<boolean>(false);
  const navigate = useNavigate();

  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(getApiUsers(null));
  }, []);
  const login = async (e: any) => {
    e.preventDefault();
    const dataUser = {
      email,
      password,
    };
    const newError = {
      isError: false,
      emailMSG: "",
    };
    const checkError = validate(dataUser);
    if (checkError.isError === false) {
      const response = await loginAPI(dataUser);
      if (response.data.success === false) {
        newError.isError = true;
        newError.emailMSG = "Email hoặc mật khẩu không đúng";
      }
      if (response.data.data.status === false) {
        setIsBlock(true);
      }
      if (response.data.accessToken === null) {
        newError.isError = true;
        newError.emailMSG = "Mật khẩu không đúng";
      }
      setError(newError);
      if (newError.isError === true) {
        return;
      }
      if (response.data.success === true) {
        if (
          response.data.data.role.role === 2 &&
          response.data.data.status === true
        ) {
          toast.success("Đăng nhập thành công");
          localStorage.setItem("auth", response.data.accessToken);
          setTimeout(() => {
            navigate("/");
          }, 1300);
        } else if (response.data.data.role.role === 1) {
          localStorage.setItem("auth", response.data.accessToken);
          toast.success("Đăng nhập thành công");
          setTimeout(() => {
            navigate("/admin");
          }, 1300);
        } else {
          setError(true);
        }
      }
    } else {
    }
  };
  const validate = (user: any) => {
    const newError = {
      isError: false,
      emailMSG: "",
      passwordMSG: "",
    };
    const regxEmail =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (!user.email.match(regxEmail)) {
      newError.isError = true;
      newError.emailMSG = "Email không đúng định dạng - Vui lòng nhập lại";
    }
    if (user.password.length < 8) {
      newError.isError = true;
      newError.emailMSG = "Email không đúng định dạng - Vui lòng nhập lại";
    }
    setError(newError);
    return newError;
  };
  useEffect(() => {
    socket.on("message", (newMessage) => {
      setTimeout(() => {
        navigate("/");
      }, 1000);
    });
  }, []);

  return (
    <>
      <div className="w-[40%] form-mobile max-w-full px-3 mx-auto mt-0 mb-10 md:flex-0 shrink-0">
        <div className="relative z-0 flex flex-col min-w-0 break-words bg-white border-0 shadow-soft-xl rounded-2xl bg-clip-border">
          <div className="p-6 mb-0 text-center bg-white border-b-0 rounded-t-2xl">
            <h1 className="text-red-600 font-bold text-xl mb-10">
              VitoPerfume
            </h1>
            <h1>Đăng Nhập</h1>
          </div>
          <div className="flex-auto p-6">
            <form role="form  text-left ">
              <div className="mb-4">
                {error?.isError === true && (
                  <p className="text-green-700 w-[70%] m-auto mb-2">
                    {error.emailMSG}
                  </p>
                )}
                {isBlock === true && (
                  <p className="text-green-700 w-[70%] m-auto mb-2">
                    Tài khoản đã bị khóa
                  </p>
                )}
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  aria-describedby="email-addon"
                  aria-label="Email"
                  placeholder="Email"
                  className=" email-mobile text-sm focus:shadow-soft-primary-outline leading-5.6 ease-soft block w-[70%] m-auto appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 px-3 font-normal text-gray-700 transition-all focus:border-fuchsia-300 focus:bg-white focus:text-gray-700 focus:outline-none focus:transition-shadow"
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
              <div className="text-center">
                <button
                  onClick={login}
                  className="inline-block mt-5 px-6 py-3 w-[70%] m-auto font-bold text-center bg-black text-white uppercase align-middle transition-all   border-0 rounded-lg cursor-pointer active:opacity-85 hover:scale-102 hover:shadow-soft-xs leading-pro text-xs ease-soft-in tracking-tight-soft shadow-soft-md   from-black-900 to-slate-800 hover:border-slate-700  "
                  type="button"
                >
                  Đăng Nhập
                </button>
              </div>
              <div className="flex justify-between w-[70%] m-auto  mt-5 ">
                <p className=" leading-normal text-sm">
                  Bạn đã có tài khoản?
                  <NavLink
                    to={"/auth/register"}
                    className={"ml-2 sign-in-mobile"}
                  >
                    Đăng Ký
                  </NavLink>
                </p>
                <NavLink to={"/"}>Trang chủ</NavLink>
              </div>
            </form>
          </div>
          <div className="flex flex-wrap px-3 -mx-3 sm:px-6 xl:px-12">
            <div className="relative w-full max-w-full px-3 mt-2 text-center shrink-0 ">
              <p className="z-20 inline px-4 mb-6  font-semibold leading-normal bg-white text-sm text-slate-400 ">
                hoặc đăng nhập với Google
              </p>
              <ButtonGoogle />
            </div>
          </div>
        </div>
      </div>

      <ToastContainer />
      <CustomerFooter />
    </>
  );
};

export default Login;
