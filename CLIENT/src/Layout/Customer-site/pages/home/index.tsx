import { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getApiProducts, getDetailUser } from "../../../../store/action";
import { AppDispatch } from "../../../../store";
import { BsCartPlus } from "react-icons/bs";
import { GoArrowRight } from "react-icons/go";
import { Carousel } from "@material-tailwind/react";
import { IProduct } from "../../../../Interface";
const ban1 = require("../../../../assets/ban1.jpg");
const ban2 = require("../../../../assets/ban2.jpg");
const ban3 = require("../../../../assets/ban3.jpg");
const blog1 = require("../../../../assets/blog1.jpg");
const blog2 = require("../../../../assets/blog2.jpg");
const blog3 = require("../../../../assets/blog3.png");
const blog4 = require("../../../../assets/blog4.jpg");
const blog5 = require("../../../../assets/blog5.jpg");
const blog6 = require("../../../../assets/blog6.jpg");

const Home = () => {
  const dispatch = useDispatch<AppDispatch>();
  const auth: any = localStorage.getItem("auth") || "";
  const userDetail: any = useSelector(
    (state: any) => state?.userReducer?.userDetail
  );
  const dataProduct = useSelector(
    (state: any) => state?.productReducer?.products
  );
  const dataNewArrival = dataProduct?.slice(0, 10);
  const bestSeller = dataProduct?.filter(
    (item: IProduct) => item.isBestSeller == true
  );

  useEffect(() => {
    dispatch(getApiProducts(null));
  }, []);

  useEffect(() => {
    dispatch(getDetailUser());
  }, [auth]);

  const navigate = useNavigate();
  const productDetail = (id: number) => {
    navigate(`/detail/${id}`);
  };
  return (
    <div>
      <Carousel
        className="rounded-xl"
        navigation={({ setActiveIndex, activeIndex, length }) => (
          <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
            {new Array(length).fill("").map((_, i) => (
              <span
                key={i}
                className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${
                  activeIndex === i ? "w-8 bg-white" : "w-4 bg-white/50"
                }`}
                onClick={() => setActiveIndex(i)}
              />
            ))}
          </div>
        )}
      >
        <img
          src="https://piger.vn/wp-content/uploads/2023/04/bn1-1.jpg"
          alt="image1"
          className="h-[530px] w-full object-cover"
        />
        <img
          src="https://theme.hstatic.net/1000340570/1000964732/14/slideshow_1.jpg?v=2664"
          alt="image2"
          className="h-[530px] w-full object-cover"
        />
        <img
          alt="image3"
          src="https://piger.vn/wp-content/uploads/2023/04/bn2-1.jpg"
          className="h-[530px] w-full object-cover"
        />
      </Carousel>

      {/* _________  Hàng mới về _________start */}
      <div className="section-header container flex justify-between py-2">
        <NavLink className="text-[30px] py-5" to={"/"}>
          NewArrivals
        </NavLink>
        <NavLink className="flex items-center gap-2" to={"/male"}>
          Xem thêm <GoArrowRight />
        </NavLink>
      </div>
      <div className="newArrivals container">
        {dataNewArrival?.map((item: any) => {
          return (
            <div key={item.id} className="product">
              <div className="buy-now-container">
                <img
                  onClick={() => productDetail(item.id)}
                  src={`${item?.images[0]?.url}`}
                  alt=""
                />
                <button>MUA NGAY</button>
              </div>
              <div className="content-product">
                <p
                  className="brand-title-product"
                  onClick={() => productDetail(item.id)}
                >
                  {item?.brand?.title}
                </p>
                <p
                  className="name-product"
                  onClick={() => productDetail(item.id)}
                >
                  {item.title}
                </p>
                <div className="price-cart-add">
                  <p className="price-product pl-7">
                    {item?.price?.toLocaleString()} đ
                  </p>
                  {userDetail?.id ? (
                    <BsCartPlus
                      className="w-5 h-5 "
                      onClick={() => productDetail(item.id)}
                    />
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {/* <!-- __________HOME-BLOCK___start --> */}
      <div className="home-banner-block container m-3 ">
        <div className="block-man home-block  relative">
          <img src={ban1} alt="" />
          <NavLink className="absolute text-white" to={"/male"}>
            <h1>NƯỚC HOA NAM</h1>
          </NavLink>
        </div>
        <div className="block-woman home-block relative">
          <img src={ban2} alt="" />
          <NavLink className="pl-[10px]" to={"/female"}>
            <h1>NƯỚC HOA NỮ</h1>
          </NavLink>
        </div>
        <div className="block-niche home-block relative ">
          <img src={ban3} alt="" />
          <NavLink className="absolute text-white" to={"/male"}>
            <h1>NƯỚC HOA NICHE</h1>
          </NavLink>
        </div>
      </div>
      {/* <!-- __________HOME-BLOCK ___end--> */}
      {/* _________ Best Seller _________start */}
      <div className="section-header container flex justify-between pt-10 pb-2 ">
        <NavLink className="text-[30px]" to={"/"}>
          Best Seller
        </NavLink>
        <NavLink className="flex items-center gap-2" to={"/female"}>
          Xem thêm <GoArrowRight />
        </NavLink>
      </div>
      <div className="best-seller container">
        {bestSeller?.map((item: any) => {
          return (
            <div key={item.id} className="product">
              <div className="buy-now-container">
                <img
                  onClick={() => productDetail(item.id)}
                  src={`${item?.images[0]?.url}`}
                  alt=""
                />
                <button>MUA NGAY</button>
              </div>
              <div className="content-product">
                <p
                  className="brand-title-product"
                  onClick={() => productDetail(item.id)}
                >
                  {item?.brands?.title}
                </p>
                <p
                  className="name-product"
                  onClick={() => productDetail(item.id)}
                >
                  {item.title}
                </p>
                <div className="price-cart-add">
                  <p className="price-product pl-7">
                    {item?.price?.toLocaleString()} đ
                  </p>
                  {userDetail?.id ? (
                    <BsCartPlus
                      className="w-5 h-5"
                      onClick={() => productDetail(item.id)}
                    />
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {/* <!-- ______BLOGS__________ --> */}
      <div className="blog-container hide-mobile hide-tablet">
        <div className="heading-blog container">
          <p>BLOG</p>
          <p></p>
        </div>
        <div className="blog-content container">
          <div className="item-blog cursor-pointer">
            <div className="blog-img">
              <img src={blog1} alt="" />
            </div>
            <p>COLE SPROUSE CÙNG THƯƠNG HIỆU CHANEL</p>
          </div>
          <div className="item-blog cursor-pointer">
            <div className="blog-img">
              <img src={blog2} alt="" />
            </div>
            <p>MÙI HƯƠNG MỚI CỦA NƯỚC HOA HIỆN ĐẠI</p>
          </div>
          <div className="item-blog cursor-pointer">
            <div className="blog-img">
              <img src={blog3} alt="" />
            </div>
            <p>CHUẨN VỊ ĐÀN ÔNG CÙNG COMBO NƯỚC HOA PHÁI MEN</p>
          </div>
          <div className="item-blog cursor-pointer">
            <div className="blog-img">
              <img src={blog4} alt="" />
            </div>
            <p>DÀN SAO HÀN QUỐC PR CHO HÃNG GUCCI</p>
          </div>
          <div className="item-blog cursor-pointer">
            <div className="blog-img">
              <img src={blog5} alt="" />
            </div>
            <p>
              BỘ SƯU TẬP NƯỚC HOA PHÁP ĐẲNG CẤP CỦA MỘT NGƯỜI NỔI TIẾNG TRUNG
              QUỐC
            </p>
          </div>
          <div className="item-blog  cursor-pointer">
            <div className="blog-img">
              <img src={blog6} alt="" />
            </div>
            <p>ẤM ÁP MÙI HƯƠNG NƯỚC HOA NARCISO CÙNG VỚI TÌNH NHÂN</p>
          </div>
        </div>
      </div>
      <div className="titi"></div>
      {/* <!-- About Vito --> */}
      <div className="about-vito hide-mobile hide-tablet">
        <div className="container">
          <h3>Về VITO PARFUM</h3>
          <div className="about-info">
            <div className="item-about">
              <img
                className="pl-[25%] w-[63%]"
                src="https://theme.hstatic.net/1000340570/1000964732/14/icon-truck.svg?v=2650"
                alt=""
              />
              <p>Freeship toàn quốc</p>
            </div>
            <div className="item-about">
              <img
                className="pl-[25%]"
                src="https://theme.hstatic.net/1000340570/1000964732/14/credit-card.svg?v=2650"
                alt=""
              />
              <p>Tư vấn online</p>
            </div>
            <div className="item-about">
              <img
                className="pl-[20%]"
                src="https://theme.hstatic.net/1000340570/1000964732/14/gift.svg?v=2650"
                alt=""
              />
              <p>Quà tặng</p>
            </div>
            <div className="item-about">
              <img
                className="pl-[25%]"
                src="https://theme.hstatic.net/1000340570/1000964732/14/shield-check.svg?v=2650"
                alt=""
              />
              <p>Đổi trả miễn phí</p>
            </div>
          </div>
        </div>
      </div>
      <div className="for-you hide-mobile hide-tablet">
        <div className="forYou-container">
          <p>Hãy là người đầu tiên được biết</p>
          <p>
            Nhiều hoạt động hợp tác cùng các thương hiệu danh tiếng và chương
            trình khuyến mại hấp dẫn chỉ dành riêng cho khách hàng của Vito
            Parfum
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
