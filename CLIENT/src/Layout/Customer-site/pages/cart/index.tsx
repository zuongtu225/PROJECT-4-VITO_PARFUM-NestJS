import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { VscHome } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../../store";
import { getCartByUser, getDetailUser } from "../../../../store/action";
import { RiDeleteBinLine } from "react-icons/ri";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { deleteCartItem, updateCart } from "../../../../Api";
import { ToastContainer, toast } from "react-toastify";
const CustomerCart = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [errorQuantity, setErrorQuantity] = useState(false);
  const carts: any = useSelector((state: any) => state?.cartReducer?.carts);

  const minus = async (id: number) => {
    const cartItem = carts?.find((item: any) => item.id === id);
    if (cartItem.quantity > 1) {
      const upQuantity = cartItem.quantity - 1;
      await updateCart(id, { quantity: upQuantity });
      dispatch(getCartByUser());
    } else {
      toast.error("Phải có ít nhất một sản phẩm trong giỏ hàng");
    }
  };
  const plus = async (id: number) => {
    const cartItem = carts?.find((item: any) => item.id === id);
    const upQuantity = cartItem.quantity + 1;
    await updateCart(id, { quantity: upQuantity });
    dispatch(getCartByUser());
  };
  const deleteItemCart = async (idCart: number) => {
    const response: any = await deleteCartItem(idCart);
    if (response?.data?.success === true) {
      toast.success(response?.data?.message);
      setTimeout(() => {
        dispatch(getCartByUser());
      }, 1500);
    } else {
      toast.error(" Id sản phẩm không đúng");
    }
  };
  const checkout = () => {
    const hasErrorQuantity = carts.some(
      (item: any) => item.quantity > item.productSizeId?.productId?.stock
    );
    if (hasErrorQuantity) {
      return toast.error("Số lượng sản phẩm không đủ trong kho");
    } else {
      navigate("/checkout");
    }
  };
  const goToHistory = () => {
    navigate("/history");
  };
  const productDetail = (id: number) => {
    navigate(`/detail/${id}`);
  };
  useEffect(() => {
    dispatch(getDetailUser());
    dispatch(getCartByUser());
  }, []);

  return (
    <main>
      <ToastContainer />
      <div className="homeIndex container">
        <NavLink className="flex items-center gap-1" to={"/"}>
          Trang chủ <VscHome />
        </NavLink>
        <p id="historyClick" onClick={goToHistory}>
          Lịch sử đơn hàng
        </p>
      </div>
      <div className="cart-order container">
        <div className="cart-heading">
          <h2>Giỏ hàng</h2>
        </div>
        <div className="cart-item-flex">
          <p className="cart-item-count"> {carts?.length} sản phẩm</p>
          <NavLink to={"/"}>Tiếp tục mua hàng</NavLink>
        </div>
        <div className="cart-pay-wrapper flex">
          <div className="cart-oder-left">
            {carts?.map((item: any, index: number) => {
              const size = item.productSizeId?.sizeId?.size.slice(14);
              return (
                <div className="cart-item">
                  <div className="item-img-info">
                    <img
                      className="cursor-pointer"
                      onClick={() =>
                        productDetail(item.productSizeId?.productId?.id)
                      }
                      src={`${item.productSizeId?.productId?.images[0]?.url}`}
                      alt=""
                    />
                    <div className="detail-product-order">
                      <p className="name">
                        {item.productSizeId?.productId?.title.slice(0, 20)}...
                      </p>
                    </div>
                  </div>
                  <div className="item-img-info">
                    <div className="detail-product-order">
                      <p className="name">{size}</p>
                    </div>
                  </div>
                  <div className="price-order hide-mobile">
                    {item.productSizeId?.productId?.price?.toLocaleString()} ₫
                  </div>
                  <div>
                    <div className="quantity-parent ml-5 mr-5">
                      <button>
                        <AiOutlineMinus
                          onClick={() => minus(item.id)}
                          className="fa-solid fa-minus pl-2"
                        ></AiOutlineMinus>
                      </button>
                      <input value={`${item.quantity}`} />
                      <button>
                        <AiOutlinePlus
                          onClick={() => plus(item.id)}
                          className="fa-solid fa-plus pl-2"
                        ></AiOutlinePlus>
                      </button>
                    </div>
                    {item.quantity > item.productSizeId?.productId?.stock && (
                      <p className="pt-5 text-red-600">
                        Số lượng trong kho không đủ
                      </p>
                    )}
                  </div>

                  <div id="price-after">
                    {(
                      item.productSizeId?.productId?.price * item.quantity
                    )?.toLocaleString()}
                    ₫
                  </div>
                  <RiDeleteBinLine
                    onClick={() => deleteItemCart(item.id)}
                    className="text-[20px] text-red-500 mr-5 cursor-pointer"
                  />
                </div>
              );
            })}
          </div>
          {carts?.length > 0 && (
            <div className="cart-oder-right">
              <div className="pay">
                <div className="total">
                  <div className="field-discount">
                    <p>Mã giảm giá</p>
                    <p id="show-code-free">Nhập mã </p>
                  </div>
                  <div id="discount-show">
                    <input type="text" placeholder="Mã giảm giá" />
                    <button>Sử dụng</button>
                  </div>
                  <div className="transport">
                    <p>Phí vận chuyển:</p>
                    <p>20.000</p>
                  </div>
                  <div className="total-price">
                    <p>Tổng: </p>
                    <p id="printPrice" className="price pl-5 "></p>
                    <button className="pay-tottaly" onClick={checkout}>
                      Thanh toán
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default CustomerCart;
