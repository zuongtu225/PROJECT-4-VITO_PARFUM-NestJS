import React from "react";
import { AiOutlineInstagram, AiOutlineYoutube } from "react-icons/ai";
import { FiFacebook } from "react-icons/fi";
import { BiHomeSmile } from "react-icons/bi";
import { NavLink, useNavigate } from "react-router-dom";
const CustomerFooter = () => {
  return (
    <>
      <footer>
        <div className="container-footer">
          <div className="social-menu">
            <div className="logo-foot">
              <img
                src="https://i.etsystatic.com/13653916/r/il/2bbdbc/1431715528/il_fullxfull.1431715528_10jn.jpg"
                alt=""
              />
            </div>
            <div className="icon-foot">
              <FiFacebook className="w-4 h-3.5" />
              <AiOutlineInstagram className="w-4 h-4" />
              <AiOutlineYoutube className="w-4 h-4" />
            </div>
          </div>
          <div className="info-footer-container">
            <ul>
              <li>
                <NavLink to={"/"}>BRAND VITO PARFUM</NavLink>
              </li>
              <li>
                <NavLink to={"/"}>
                  Vito Parfum VN hệ thống nước hoa Việt Nam{" "}
                </NavLink>
              </li>
              <li>
                <NavLink to={"/"}>
                  Vito London hệ thống nước hoa Luân Đôn
                </NavLink>
              </li>
              <li>
                <NavLink to={"/"}>Vito EY Italy hệ thống nước hoa Ý</NavLink>
              </li>
            </ul>
            <ul>
              <li>
                <NavLink to={"/"}>THÔNG TIN HỖ TRỢ</NavLink>
              </li>
              <li>
                <NavLink to={"/"}>Hotline: 0909888999 </NavLink>
              </li>
              <li>
                <NavLink to={"/"}>Email: zuongtu225@gmail.com </NavLink>
              </li>
              <li>
                <NavLink to={"/"}>Wechat: zuongtu225</NavLink>
              </li>
            </ul>
            <ul>
              <li>
                <NavLink to={"/"}>Địa Chỉ</NavLink>
              </li>
              <li>
                <NavLink to={"/"}>CN1: 1 Điện Biên Phủ Hồ Chí Minh</NavLink>
              </li>
              <li>
                <NavLink to={"/"}>CN2: 363 Nguyễn Văn Linh Đà Nẵng </NavLink>
              </li>
            </ul>
            <ul>
              <li>
                <NavLink to={"/"}>Đăng Ký Nhận Thông Tin</NavLink>
              </li>
              <div className="email-footer">
                <input type="text" placeholder="Email" />
                <button>Gửi</button>
              </div>
            </ul>
          </div>
        </div>
      </footer>
      <NavLink to="/" className="moveTop ">
        <BiHomeSmile />
      </NavLink>
    </>
  );
};

export default CustomerFooter;
