import React, { useEffect, useState } from "react";
import {
  getApiProducts,
  getCartByUser,
  getDetailUser,
  getOrderApi,
} from "../../../../store/action";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../../store";
import { useNavigate } from "react-router-dom";
import { IoMdCash } from "react-icons/io";
import { IProduct } from "../../../../Interface";
import { createOrder } from "../../../../Api/order";
import { ToastContainer, toast } from "react-toastify";
import { deleteCart, updateProduct } from "../../../../Api";
import { createOrderItem } from "../../../../Api/orderItem";
import { createAddress } from "../../../../Api/address";
import Paypal from "./paypayl";
import { BiUser } from "react-icons/bi";
import { FiPhoneCall } from "react-icons/fi";
import { io } from "socket.io-client";
const socket = io("http://localhost:9000");

const Checkout = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [paypal, setPaypal] = useState<boolean>(false);
  const [name, setName] = useState<string>();
  const [address, setAddress] = useState<string>();
  const [phone, setPhone] = useState<string>();
  const dataProduct = useSelector(
    (state: any) => state?.productReducer?.products
  );
  const carts: any = useSelector((state: any) => state?.cartReducer?.carts);
  const hasErrorQuantity = carts?.some(
    (item: any) => item.quantity > item.productSizeId?.productId?.stock
  );

  const [total, setTotal] = useState(0);
  const calculateTotalPrice = () => {
    let totalPrice = 0;
    if (carts) {
      for (const item of carts) {
        const product = item?.productSizeId;
        const quantity = item?.quantity;
        if (product) {
          if (product?.sizeId?.size === "Eau de Parfum 100ml") {
            totalPrice +=
              product.productId.price * product?.sizeId?.percent * quantity;
          } else if (product?.sizeId?.size === "Eau de Parfum 200ml") {
            totalPrice +=
              product?.productId?.price * product?.sizeId?.percent * quantity;
          } else if (product?.sizeId?.size === "Eau de Parfum 300ml") {
            totalPrice +=
              product?.productId?.price * product?.sizeId?.percent * quantity;
          }
        }
      }
    }
    return totalPrice;
  };
  useEffect(() => {
    setTotal(calculateTotalPrice());
  }, [carts]);
  useEffect(() => {
    setTotal(calculateTotalPrice());
  }, []);
  const infoAddress = {
    fullName: name,
    phoneNumber: phone,
    address: address,
  };
  // paypal
  const paymentPaypal = async (addressId: number) => {
    const code = Number("2" + (Math.random() * 100000000).toFixed(0));
    const date = new Date();
    const deliveryDate = new Date(date.getTime() + 3 * 24 * 60 * 60 * 1000);
    const expectedDelivery = deliveryDate
      .toISOString() // change => định dạng ISO 8601.
      .slice(0, 19)
      .replace("T", " ");
    const newOrder = {
      codeOrder: code,
      paymentId: 2,
      orderDate: date.toISOString().slice(0, 19).replace("T", " "),
      expectedDeliveryDate: expectedDelivery,
      addressId: addressId,
      total,
      status: "Pending",
    };
    const resOrder: any = await createOrder(newOrder);
    if (resOrder?.data?.success === true) {
      const newOrderItems = carts.map((item: any) => ({
        codeOrder: resOrder.data.data.codeOrder,
        quantity: item.quantity,
        productSizeId: item.productSizeId,
        userId: item.userId,
      }));
      const productIds = newOrderItems.map((item: any) => ({
        id: item.productSizeId.productId.id,
      }));
      const quantities = newOrderItems.map((item: any) => ({
        quantity: item.quantity,
      }));
      const orderItem: any = await createOrderItem(newOrderItems);
      if (orderItem?.data?.success === true) {
        socket.emit("message", "Click!");
        await updateStock(productIds, quantities);
        toast.success(resOrder.data.message);
        await deleteCart();
        await dispatch(getCartByUser());
        setTimeout(() => {
          navigate("/");
        }, 1500);
      } else {
        return toast.error(orderItem.data.message);
      }
    } else {
      return toast.error(resOrder.data.message);
    }
  };
  // cod
  const paymentCOD = async () => {
    if (hasErrorQuantity) {
      return toast.error("Sản phẩm không đủ số lượng trong kho");
    }
    const infoAddress = {
      fullName: name,
      phoneNumber: phone,
      address: address,
    };
    const resAddress: any = await createAddress(infoAddress);
    const addressId = resAddress?.data?.data.id;
    const code = Number("2" + (Math.random() * 100000000).toFixed(0));
    const date = new Date();
    const deliveryDate = new Date(date.getTime() + 3 * 24 * 60 * 60 * 1000);
    const expectedDelivery = deliveryDate
      .toISOString() // change => định dạng ISO 8601.
      .slice(0, 19)
      .replace("T", " ");
    const newOrder = {
      codeOrder: code,
      paymentId: 4,
      orderDate: date.toISOString().slice(0, 19).replace("T", " "),
      expectedDeliveryDate: expectedDelivery,
      addressId: addressId,
      total,
      status: "Pending",
    };
    const resOrder: any = await createOrder(newOrder);
    if (resOrder?.data?.success === true) {
      const newOrderItems = carts.map((item: any) => ({
        codeOrder: resOrder.data.data.codeOrder,
        quantity: item.quantity,
        productSizeId: item.productSizeId,
        userId: item.userId,
      }));
      const productIds = newOrderItems.map((item: any) => ({
        id: item.productSizeId.productId.id,
      }));
      const quantities = newOrderItems.map((item: any) => ({
        quantity: item.quantity,
      }));
      const orderItem: any = await createOrderItem(newOrderItems);
      if (orderItem?.data?.success === true) {
        socket.emit("renderStockProduct", "");
        await updateStock(productIds, quantities);
        toast.success(resOrder.data.message);
        await deleteCart();
        await dispatch(getCartByUser());
        setTimeout(() => {
          navigate("/");
        }, 1500);
      } else {
        toast.error(orderItem.data.message);
      }
    } else {
      toast.error(resOrder.data.message);
    }
  };
  const updateStock = async (productIds: IProduct[], quantities: any[]) => {
    for (let i = 0; i < productIds.length; i++) {
      const productId = productIds[i];
      const quantity = quantities[i].quantity;
      const product = dataProduct.find(
        (item: IProduct) => item.id === productId.id
      );
      if (!product) {
        return toast.error("Id sản phẩm không đúng");
      }
      const updateStock = { id: product.id, stock: product.stock - quantity };

      await updateProduct(updateStock);
    }
  };
  useEffect(() => {
    dispatch(getOrderApi());
    dispatch(getCartByUser());
    dispatch(getDetailUser());
    dispatch(getApiProducts(null));
  }, []);

  useEffect(() => {
    socket.on("renderStockProduct", (newMessage) => {
      dispatch(getCartByUser());
    });
  }, []);
  return (
    <div>
      <>
        <ToastContainer />
        <div className="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32">
          <div className="px-4 pt-8">
            <p className="text-xl font-medium">Tất cả đơn hàng</p>
            {/* // LIST PRODUCTS */}
            <div className="mt-2 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6">
              {carts?.map((item: any) => {
                return (
                  <div
                    key={item.id}
                    className="flex flex-col rounded-lg bg-white sm:flex-row"
                  >
                    <img
                      className="m-2 h-24 w-28 rounded-md border object-cover object-center"
                      alt=""
                      src={`${item.productSizeId?.productId?.images[0].url}`}
                    />
                    <div className="flex w-full flex-col px-4 py-4">
                      <span className="font-semibold">
                        {item.productSizeId?.productId?.title}
                      </span>
                      <span className="">
                        Dung tích: {item.productSizeId?.sizeId?.size.slice(13)}
                      </span>
                      <div className="flex items-center gap-3">
                        <span className="text-black-500">Số lượng:</span>
                        <span className="text-black">{item.quantity}</span>
                      </div>

                      {item.quantity > item.productSizeId?.productId?.stock ? (
                        <p className="pt-2 text-red-600">
                          Số lượng trong kho không đủ
                        </p>
                      ) : (
                        <p className="text-lg text-red-600  ">
                          Giá:
                          {item.productSizeId?.productId?.price?.toLocaleString()}
                          đ
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="mt-10 bg-gray-50 px-4 pt-8 lg:mt-0">
            <p className="text-xl font-medium flex gap-3 items-center">
              Chi tiết thanh toán
              <IoMdCash className="text-green-400 text-[30px]" />
            </p>
            <div className="">
              <p className="mt-8 text-lg font-medium">Phương thức thanh toán</p>
              <form className=" grid gap-6">
                <div className="relative mt-2">
                  <input
                    className=" peer hidden"
                    id="radio_1"
                    value="home"
                    onChange={() => setPaypal(false)}
                    type="radio"
                    name="radio"
                    defaultChecked
                  />
                  <span className="peer-checked:border-gray-700  absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white" />
                  <label
                    className="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4"
                    htmlFor="radio_1"
                  >
                    <img
                      className="w-14 object-contain"
                      src="/images/naorrAeygcJzX0SyNI4Y0.png"
                      alt=""
                    />
                    <div className=" flex gap-3 items-center">
                      <span className=" font-semibold">
                        Thanh toán khi nhận hàng
                      </span>
                      <img
                        className="w-[10%]"
                        src="data:image/png;base64,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"
                        alt=""
                      />
                    </div>
                  </label>
                </div>
                <div className="relative mb-2">
                  <input
                    className="peer hidden"
                    id="radio_2"
                    type="radio"
                    name="radio"
                    onChange={() => setPaypal(true)}
                  />
                  <span className="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white" />
                  <label
                    className="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4"
                    htmlFor="radio_2"
                  >
                    <img
                      className="w-14 object-contain"
                      src="/images/oG8xsl3xsOkwkMsrLGKM4.png"
                      alt=""
                    />
                    <div className="ml-10 flex gap-3 items-center">
                      <span className=" font-semibold">
                        Thanh toán qua Paypal
                      </span>

                      <img
                        className="w-[10%]"
                        src="https://w7.pngwing.com/pngs/803/833/png-transparent-logo-paypal-computer-icons-paypal-blue-angle-logo.png"
                        alt=""
                      />
                    </div>
                  </label>
                </div>
              </form>
              {/* phone */}
              <div>
                <div className="relative mt-2">
                  <input
                    type="text"
                    id="card-holder"
                    name="card-holder"
                    className="w-full  border border-gray-200 px-4 py-3 pl-11 text-sm  shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Tên người nhận"
                    onChange={(e: any) => setName(e.target.value)}
                  />
                  <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                    <BiUser />
                  </div>
                </div>
                {/* phone */}
                <div className="relative">
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="mt-5 w-full mb-2 border border-gray-200  py-3 pl-20 pt-5 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Số điện thoại người nhận  "
                    onChange={(e: any) => setPhone(e.target.value)}
                  />
                  <div className="pointer-events-none absolute inset-y-0 mt-5 left-0 inline-flex items-center px-3">
                    <FiPhoneCall />
                    <p className="pl-2">+84</p>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row">
                  <div className="relative flex-shrink-0 w-full">
                    <input
                      type="text"
                      id="billing-address"
                      name="billing-address"
                      className="w-full pl-[41px]  border border-gray-200 px-4 py-3   text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                      placeholder="Địa chỉ nhận hàng"
                      onChange={(e: any) => setAddress(e.target.value)}
                    />
                    <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                      <img
                        className="h-5 w-5 object-contain "
                        src="https://seeklogo.com/images/V/viet-nam-logo-3D78D597F9-seeklogo.com.png"
                        alt=""
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-6 border-t border-b py-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm  text-gray-900 font-semibold">
                    Tổng tiền
                  </p>
                  <p className="font-semibold text-red-500 ">
                    {total.toLocaleString()} ₫
                  </p>
                </div>
                <div className="flex items-center justify-between py-2">
                  <p className="text-sm font-medium text-gray-900">
                    Phí vận chuyển
                  </p>
                  <p className=" text-gray-900">20.000 ₫</p>
                </div>
              </div>
              <div className="mt-6 mb-5 flex items-center justify-between">
                <p className="text-sm font-medium text-gray-900">Tổng tiền</p>
                <p className="text-2xl font-semibold  text-red-500">
                  {total.toLocaleString()} ₫
                </p>
              </div>
            </div>
            {paypal === false ? (
              <button
                onClick={paymentCOD}
                className="mt-4 mb-8 w-full rounded-md bg-gray-900 px-6 py-3 font-medium text-white"
              >
                ĐẶT HÀNG
              </button>
            ) : (
              <Paypal
                hasErrorQuantity={hasErrorQuantity}
                infoAddress={infoAddress}
                amount={Math.round(total / 24325)}
                paymentPaypal={paymentPaypal}
              />
            )}
          </div>
        </div>
      </>
    </div>
  );
};

export default Checkout;
