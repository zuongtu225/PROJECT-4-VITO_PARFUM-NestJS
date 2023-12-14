import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { AppDispatch } from "../../../../store";
import {
  getApiProductSizes,
  getCartByUser,
  getDetailProduct,
  getDetailUser,
} from "../../../../store/action";
import { BiSolidStar } from "react-icons/bi";
import { FaStarHalfAlt } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import { createCart, updateCart } from "../../../../Api";
const ProductsDetail = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [img, setImg] = useState<string>("");
  const [sizeId, setSizeID] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(1);
  const { id } = useParams();
  const carts: any = useSelector((state: any) => state?.cartReducer?.carts);
  const userDetail = useSelector(
    (state: any) => state?.userReducer?.userDetail
  );
  const productDetail = useSelector(
    (state: any) => state?.productReducer?.productDetail
  );

  const productSizes = useSelector(
    (state: any) => state?.productSizeReducer?.productSizes
  );
  const productId = Number(id);
  // render
  const newProductSize = productSizes?.filter(
    (item: any) => item.productId.id === productId
  );
  const productSizeId = productSizes?.find(
    (item: any) => item.productId.id === productId && item.sizeId.id === sizeId
  );

  const addToCart = async () => {
    if (productSizeId === undefined) {
      return toast.error("Vui lòng chọn size");
    }
    if (quantity < 1) {
      return toast.error("Số lượng sản phẩm không thể nhỏ hơn 1");
    }
    if (+quantity > productDetail?.stock) {
      return toast.error("Số lượng trong kho không đủ");
    }
    const isExistCart = carts.find(
      (item: any) => item.productSizeId.id === productSizeId?.id
    );
    if (isExistCart) {
      const updateQuantity = isExistCart.quantity + +quantity;
      const resUpdate: any = await updateCart(isExistCart?.id, {
        quantity: updateQuantity,
      });
      toast.success(resUpdate.data.message);
    } else {
      const newCart = {
        productSizeId: productSizeId?.id,
        quantity: +quantity,
      };
      const resCart: any = await createCart(newCart);
      if (resCart.data.success === true) {
        toast.success(resCart.data.message);
        setTimeout(() => {
          navigate("/cart");
        }, 1500);
      } else {
        toast.error(resCart.data.message);
      }
    }
  };

  useEffect(() => {
    dispatch(getDetailProduct(id));
    dispatch(getDetailUser());
    dispatch(getCartByUser());
    dispatch(getApiProductSizes());
  }, []);
  useEffect(() => {
    setImg(
      productDetail?.images !== undefined && productDetail?.images[0]?.url
    );
  }, [productDetail]);

  const handleClick = (src: string) => {
    setImg(src);
  };

  return (
    <main>
      <ToastContainer />
      <div className="home-site-tab container">
        <NavLink to={"/"}>Trang chủ |</NavLink>
        <NavLink to={"/male"} className="pl-1">
          Nước Hoa Nam |
        </NavLink>
        <b className="pl-1">{productDetail?.brand?.title}</b>
      </div>
      {/* <!-- card-detail render local--> */}
      <div className="card-wrapper container">
        <div className="card">
          {/* <!-- cart left> --> */}
          <div className="product-imgs">
            <div className="img-display">
              <div className="img-showcase">
                <img src={`${img}`} alt="" />
                <img src={`${img}`} alt="" />
              </div>
            </div>
            <div className="img-select">
              <div className="img-item">
                <button
                  onClick={() =>
                    handleClick(
                      `${
                        productDetail?.images !== undefined &&
                        productDetail?.images[1]?.url
                      }`
                    )
                  }
                >
                  <img
                    src={`${
                      productDetail?.images !== undefined &&
                      productDetail?.images[1]?.url
                    }`}
                    alt="showimage"
                  />
                </button>
              </div>
              <div className="img-item">
                <button
                  onClick={() =>
                    handleClick(
                      `${
                        productDetail?.images !== undefined &&
                        productDetail?.images[2]?.url
                      }`
                    )
                  }
                >
                  <img
                    src={`${
                      productDetail?.images !== undefined &&
                      productDetail?.images[2]?.url
                    }`}
                    alt="showimage"
                  />
                </button>
              </div>
            </div>
          </div>
          {/* <!-- cart main> --> */}
          <div className="card-content">
            <div className="card-content-top">
              <h3 className="name">{productDetail?.title}</h3>
              <div className="rating">
                <BiSolidStar />
                <BiSolidStar />
                <BiSolidStar />
                <BiSolidStar />
                <FaStarHalfAlt />
                <p>1 đánh giá</p>
                <p>{productDetail?.category?.title}</p>
              </div>
              <p>
                Thương hiệu: <b>{productDetail?.brand?.title}</b>
              </p>
              <div className="type">
                <p>Eau de Parfum 100ml</p>
                <p className="new">New</p>
                <p className="editon">Limited Edition</p>
              </div>
              <p>Standard Size </p>
              <div className="standard-size">
                {newProductSize?.map((item: any) => {
                  return (
                    <button
                      onClick={() => setSizeID(item.sizeId.id)}
                      key={item.id}
                      className={`focus:ring-red-100 dark:focus:ring-red-400 focus:ring-4 focus:outline-none relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-red-200 via-red-300 to-yellow-200 group-hover:from-red-200 group-hover:via-red-300 group-hover:to-yellow-200 dark:text-white dark:hover:text-gray-900 `}
                    >
                      <span
                        className={`relative px-4 py-2.5 transition-all ease-in duration-75  dark:bg-gray-900 rounded-md group-hover-bg-opacity-0  ${
                          item.id === sizeId
                            ? "bg-pink-300 text-white"
                            : "bg-white"
                        }`}
                      >
                        {item.sizeId.size}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
            <div className="content-ship">
              <div className="ship">
                <i className="fa-solid fa-truck-fast"></i>
                <p>Freeship toàn quốc</p>
              </div>
              <div className="ship">
                <i className="fa-regular fa-square-check"></i>
                <p>Chính hãng 100%</p>
              </div>
              <div className="ship">
                <i className="bx bx-transfer-alt"></i>
                <p>Đổi trả miễn phí</p>
              </div>
            </div>
            <p className="call">
              Gọi đặt mua <i className="fa-solid fa-phone"></i> 0935 27 61 88
            </p>
          </div>
          {/* <!-- cart right> --> */}
          {userDetail?.id ? (
            <div className="product-shopping">
              <p className="last-price">30.000.000 ₫</p>
              <p className="new-price">
                {productDetail?.price?.toLocaleString()} ₫
              </p>
              <p>Tiết kiệm: 10%</p>
              <p>CÒN HÀNG</p>
              <div className="store-near">
                <p>Số lượng kho: {productDetail?.stock}</p>
              </div>
              <div className="quantity">
                <p>Số lượng:</p>
                <input
                  type="number"
                  min="0"
                  value={quantity}
                  id="quantityAdd"
                  onChange={(e: any) => setQuantity(e.target.value)}
                />
              </div>
              <button className="addCart" onClick={addToCart}>
                Thêm vào giỏ hàng
              </button>
              <button className="buyNow" onClick={addToCart}>
                Mua ngay
              </button>
            </div>
          ) : (
            <p>Bạn chưa đăng nhập ko thể mua</p>
          )}
        </div>
      </div>
      {/* detail */}
      <div className="detail-product container">
        <div className="product-atribute">
          <ul>
            <li>
              <span>Mã hàng </span>
              <p>110103030202</p>
            </li>
            <li>
              <span>Thương hiệu</span>
              <p>{productDetail?.brand?.title}</p>
            </li>
            <li>
              <span>Xuất xứ </span>
              <p>Pháp</p>
            </li>
            <li>
              <span>Năm phát hành </span>
              <p>2023</p>
            </li>
            <li>
              <span>Nhóm hương</span>
              <p>Xạ Hương, Quảng Hoắc Hương, Hoa Sứ, Hoa Nhài</p>
            </li>
            <li>
              <span>Phong cách </span>
              <p>Thanh lịch, Cuốn hút, Sang trọng</p>
            </li>
          </ul>
          <div className="content-detail-more">
            <p>{productDetail?.description}</p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProductsDetail;
