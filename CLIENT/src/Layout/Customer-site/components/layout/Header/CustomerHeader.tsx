import React, { useEffect, useState } from "react";
import { ItemNavbar } from "../../../utils/nav";
import { NavLink, useNavigate } from "react-router-dom";
import { FcCallback } from "react-icons/fc";
import { AiOutlineInstagram, AiOutlineYoutube } from "react-icons/ai";
import { FiFacebook } from "react-icons/fi";
import { PiUserSquareLight } from "react-icons/pi";
import { RiShoppingCart2Line, RiLogoutBoxRLine } from "react-icons/ri";
import { LuStore } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../../../store";
import { ToastContainer, toast } from "react-toastify";
import {
  getApiProducts,
  getCartByUser,
  getDetailUser,
} from "../../../../../store/action";
import { IProduct } from "../../../../../Interface";
import { Avatar, Dropdown } from "flowbite-react";
import { io } from "socket.io-client";
const socket = io("http://localhost:9000");

const CustomerHeader = () => {
  const dispatch = useDispatch<AppDispatch>();
  const nagivate = useNavigate();
  const auth: any = localStorage.getItem("auth") || "";
  const userDetail = useSelector(
    (state: any) => state?.userReducer?.userDetail
  );
  const carts: any = useSelector((state: any) => state?.cartReducer?.carts);
  const [isHidden, setIsHidden] = useState<boolean>(false);
  const [dataSearch, setDataSearch] = useState<any>();
  const dataProduct = useSelector(
    (state: any) => state?.productReducer?.products
  );
  const handleInputClick = (e: any) => {
    if (e.target.value.length > 0) {
      setIsHidden(true);
    } else {
      setIsHidden(false);
    }
    const searchProduct = dataProduct?.filter((item: IProduct) =>
      item.title
        .toLocaleLowerCase()
        .includes(e.target.value.toLocaleLowerCase())
    );
    setDataSearch(searchProduct);
  };
  useEffect(() => {
    dispatch(getDetailUser());
  }, [auth]);
  useEffect(() => {
    dispatch(getCartByUser());
    dispatch(getApiProducts(null));
  }, []);

  //log out
  const logout = async () => {
    localStorage.removeItem("auth");
    await dispatch(getDetailUser());
    nagivate("/auth/login");
  };

  // go to cart
  const navigate = useNavigate();
  const cartPage = () => {
    if (userDetail.id) {
      navigate("/cart");
    } else {
      toast.error("Vui lòng đăng nhập để xem giỏ hàng");
    }
  };
  const profile = () => {
    navigate("/profile");
  };
  const productDetail = (id: number) => {
    navigate(`/detail/${id}`);
    setIsHidden(false);
  };
  socket.on("blockUser", async (newMessage) => {
    localStorage.removeItem("auth");
    await dispatch(getDetailUser());
    nagivate("/auth/login");
  });
  return (
    <header id="moveTop">
      <ToastContainer />
      {/* nav site top */}
      <nav className="nav-site container">
        <ul>
          <li>Chào mừng đến với Vito Corleone</li>
          <li>Yêu thích</li>
          <li>Hàng hiệu giảm 50%</li>
        </ul>
        <ul>
          <li className="cursor-pointer" onClick={() => navigate("/contact")}>
            Liên hệ chúng tôi
          </li>
          <li>
            <div className="hotline">
              <FcCallback className="w-4 h-4" />
              <p>02.999.999.999</p>
            </div>
          </li>
          <li>
            <AiOutlineYoutube className="w-4 h-4" />
          </li>
          <li>
            <FiFacebook className="w-4 h-3.5" />
          </li>

          <li>
            <AiOutlineInstagram className="w-4 h-4" />
          </li>
        </ul>
      </nav>
      {/* desktop menu*/}
      <div className="header-main container ">
        <div className="logo">
          <NavLink to={"/"}>
            <img
              src="https://5.imimg.com/data5/SELLER/Default/2022/4/JS/DD/NU/1107622/logo-mp-500x500.PNG"
              alt=""
            />
          </NavLink>
        </div>
        <div className="menu-item ">
          <div className="input-item-search mt-2">
            <input
              type="text"
              id="searchTop"
              placeholder="Tìm kiếm"
              className="hide-mobile"
              onChange={handleInputClick}
            />
            <p className="k">|</p>
            <div
              className={` ${
                isHidden === false ? "hiddenFormSmall" : "form-search-small "
              } `}
            >
              {isHidden === false ? (
                ""
              ) : dataSearch?.length > 0 ? (
                dataSearch?.map((item: IProduct) => {
                  return (
                    <div
                      className="item-search"
                      onClick={() => productDetail(item.id)}
                    >
                      <img src={`${item.images[0].url}`} alt="" />
                      <div className="item-search-name">
                        <p id="name-search">{item.title}</p>
                        <p id="price-search">{item.price.toLocaleString()} đ</p>
                      </div>
                    </div>
                  );
                })
              ) : (
                <p className=" pt-5 pl-[110px]">
                  Không có sản phẩm đang tìm kiếm{" "}
                </p>
              )}
            </div>
          </div>
          <div className="account  hide-mobile">
            <div id="loginAccount " className="w-100px">
              {auth !== "" ? (
                <div className="flex gap-3 items-center">
                  {userDetail.avatar !== "" && (
                    <img
                      onClick={profile}
                      style={{
                        objectFit: "cover",
                        width: "30px",
                        height: "30px",
                        borderRadius: "50%",
                      }}
                      src={`${userDetail?.avatar}`}
                      alt=""
                    />
                  )}
                  <p onClick={profile}>
                    {userDetail?.email?.slice(
                      0,
                      userDetail?.email.indexOf("@")
                    )}
                  </p>
                  <button onClick={logout}>
                    <RiLogoutBoxRLine className="text-red-600 w-6 h-6 " />
                  </button>
                </div>
              ) : (
                <div className="flex">
                  <NavLink to={"/auth/login"}>Đăng nhập</NavLink>
                  <PiUserSquareLight className="w-8 h-6" />
                </div>
              )}
            </div>
          </div>
          <div className="cart mr-5">
            <p className="hide-mobile hide-tablet">|</p>
            <div className="nationwide-store hide-mobile  hide-tablet"></div>
            <LuStore className=" hide-mobile" />
            <RiShoppingCart2Line className="w-8 h-6" onClick={cartPage} />
            {userDetail?.id && <p id="length-cart">{carts?.length}</p>}
          </div>
          <div className="hide-laptop">
            <Dropdown
              className="w-[200px] "
              label={<Avatar alt="" img={userDetail?.avatar} rounded={true} />}
              arrowIcon={false}
              inline
            >
              <Dropdown.Header>
                <span className="block text-sm">
                  {userDetail?.email?.slice(0, userDetail?.email.indexOf("@"))}
                </span>
              </Dropdown.Header>
              <Dropdown.Item onClick={profile}>Thông tin</Dropdown.Item>
              <Dropdown.Item onClick={() => navigate("/history")}>
                Đơn mua
              </Dropdown.Item>
              <Dropdown.Item>Cài đặt</Dropdown.Item>
              <Dropdown.Divider />
              {auth !== "" ? (
                <Dropdown.Item onClick={logout}>Đăng xuất</Dropdown.Item>
              ) : (
                <Dropdown.Item onClick={() => navigate("/auth/login")}>
                  Đăng nhập
                </Dropdown.Item>
              )}
            </Dropdown>
          </div>
        </div>
      </div>
      <div className="mega-menu container">
        <ul>
          {ItemNavbar?.map((item) => {
            return (
              <li key={item.id}>
                <NavLink to={`${item.path}`} className={`${item.className}`}>
                  {item.title}
                </NavLink>
                <div className="menu-show show-man">
                  <div className="flex-menu-show-ul">
                    <ul>
                      <li>
                        <NavLink to={"/male"}>Phân loại</NavLink>
                      </li>
                      <li>
                        <NavLink to={"/female"}>Yêu thích nhất</NavLink>
                      </li>
                      <li>
                        <NavLink to={"/female"}>Nước hoa Niche</NavLink>
                      </li>
                      <li>
                        <NavLink to={"/female"}>Giftset</NavLink>
                      </li>
                      <li>
                        <NavLink to={"/female"}>Nước hoa Unisex</NavLink>
                      </li>
                      <li>
                        <NavLink to={"/female"}>Nước hoa Mini</NavLink>
                      </li>
                    </ul>
                    <ul>
                      <li>
                        <NavLink to={"/"}>Thương hiệu</NavLink>
                      </li>
                      <li>
                        <NavLink to={"/"}>GUCCI</NavLink>
                      </li>
                      <li>
                        <NavLink to={"/"}>JEAN PAUL</NavLink>
                      </li>
                      <li>
                        <NavLink to={"/"}>NARCISO RODRIGUEZ</NavLink>
                      </li>
                      <li>
                        <NavLink to={"/"}>DOLCE & GABBANA</NavLink>
                      </li>
                      <li>
                        <NavLink to={"/"}>PACO RABANNE</NavLink>
                      </li>
                      <li>
                        <NavLink to={"/"}>RALPH LAUREN</NavLink>
                      </li>
                    </ul>
                    <ul>
                      <li>
                        <NavLink to={"/"}>______</NavLink>
                      </li>
                      <li>
                        <NavLink to={"/"}>ROJA HAUTE LUXE</NavLink>
                      </li>
                      <li>
                        <NavLink to={"/"}>PACO RABANNE</NavLink>
                      </li>
                      <li>
                        <NavLink to={"/"}>CALVIN KLEIN</NavLink>
                      </li>
                      <li>
                        <NavLink to={"/"}>VERSACE</NavLink>
                      </li>
                      <li>
                        <NavLink to={"/"}>BUBBRERY</NavLink>
                      </li>
                      <li>
                        <NavLink to={"/"}>CAROLINA HERREARA</NavLink>
                      </li>
                      <li>
                        <NavLink to={"/"}>Xem tất cả</NavLink>
                      </li>
                    </ul>
                    <div className="menu-show-img">
                      <img src={`${item.image}`} alt="" />
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </header>
  );
};

export default CustomerHeader;
