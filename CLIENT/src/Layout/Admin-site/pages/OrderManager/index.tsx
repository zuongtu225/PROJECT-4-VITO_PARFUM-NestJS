import React, { useEffect, useState } from "react";
import AdminHeader from "../../components/layout/Header";
import {
  getDetailOrder,
  getHistoryOrderByUser,
  getOrderApi,
} from "../../../../store/action";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../../store";
import { ToastContainer, toast } from "react-toastify";
import { updateOrderApi } from "../../../../Api/order";
import { OrderDetailModal } from "./orderDetailForm";
import { IUser } from "../../../../Interface";
import Pagination from "../../components/pagination";

const OrderManager = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [statusOder, getStatusOrder] = useState<string>("Pending");
  const [code, setCodeOrder] = useState<number>();
  const orderApi = useSelector((state: any) => state?.orderReducer?.orders);
  const [data, setData] = useState<IUser[]>();

  const handlePage = (pagination: any) => {
    setData(pagination);
  };
  const [open, setOpen] = useState<boolean>(false);
  const handleClose = (open: boolean) => {
    setOpen(open);
  };
  const handleDetail = async (userId: number) => {
    await dispatch(getDetailOrder(userId));
    setOpen(!open);
  };
  const changeStatus = (e: any, code: number) => {
    getStatusOrder(e.target.value);
    setCodeOrder(code);
  };
  useEffect(() => {
    dispatch(getOrderApi());
  }, []);
  const updateOrder = async (id: number) => {
    const orderNeedChange = orderApi?.find((item: any) => item.id === id);
    switch (statusOder) {
      case "Pending":
        break;
      case "Processing":
        const updateProcess = {
          id: orderNeedChange.id,
          status: "Processing",
          codeOrder: code,
        };
        const resProcessing: any = await updateOrderApi(updateProcess);
        if (resProcessing.data.success === true) {
          toast.success("Đơn hàng đang chuẩn bị");
          dispatch(getOrderApi());
        } else {
          toast.error("Thất bại do lỗi yêu cầu đến API");
        }
        break;
      case "Cancel":
        const updateCancel = {
          id: orderNeedChange.id,
          status: "Cancel",
          codeOrder: code,
        };
        const reCancel: any = await updateOrderApi(updateCancel);
        if (reCancel.data.success === true) {
          toast.success("Đơn hàng đã bị hủy ");
          dispatch(getOrderApi());
          dispatch(getHistoryOrderByUser(null));
        } else {
          toast.error("Thất bại do lỗi yêu cầu đến API");
        }
        break;
      case "Shipping":
        const updateShipping = {
          id: orderNeedChange.id,
          status: "Shipping",
          codeOrder: code,
        };
        const reShipping: any = await updateOrderApi(updateShipping);
        if (reShipping.data.success === true) {
          toast.success("Đơn hàng đang được giao ");
          dispatch(getOrderApi());
        } else {
          toast.error("Thất bại do lỗi yêu cầu đến API");
        }
        break;
      case "Completed":
        const updateCompleted = {
          id: orderNeedChange.id,
          status: "Completed",
          codeOrder: code,
        };
        const reCompleted: any = await updateOrderApi(updateCompleted);
        if (reCompleted.data.success === true) {
          toast.success("Đơn hàng đã giao thành công ");
          dispatch(getOrderApi());
          dispatch(getHistoryOrderByUser(null));
        } else {
          toast.error("Thất bại do lỗi yêu cầu đến API");
        }
        break;
      default:
        toast.error("Vui lòng chọn lại trạng thái đơn hàng");
    }
  };
  return (
    <div>
      <AdminHeader title={"order"} slug={"ORDERS"} />
      <ToastContainer />
      <div className="content orders">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="p-4">
                  <p>STT</p>
                </th>
                <th scope="col" className="px-3 py-3">
                  Phương thức thanh toán
                </th>
                <th scope="col" className="px-6 py-3">
                  Địa chỉ giao
                </th>
                <th scope="col" className="px-6 py-3">
                  Ngày đặt hàng
                </th>
                <th scope="col" className="px-6 py-3">
                  Ngày giao dự kiến
                </th>
                <th scope="col" className="px-6 py-3">
                  Trạng thái
                </th>
                <th scope="col" className="px-6 py-3">
                  Tổng tiền
                </th>
                <th scope="col" className="px-6 py-3">
                  Hành động
                </th>
              </tr>
            </thead>
            <tbody>
              <OrderDetailModal open={open} handleClose={handleClose} />
              {data?.map((item: any, index: number) => {
                return (
                  <tr key={item.id} className="p-10">
                    <td className="w-4 p-4">{index + 1}</td>
                    <td className="px-6 py-4 "> {item.paymentId?.title}</td>
                    <td className="px-6 py-4 "> {item.addressId?.address}</td>
                    <td className="px-6 py-4">
                      {item.orderDate.split("-").reverse().join("-")}
                    </td>
                    <td className="px-6 py-4">
                      {item.expectedDeliveryDate.split("-").reverse().join("-")}
                    </td>
                    <td className="px-6 py-4">
                      {item.status === "Cancel" ? (
                        <p>Đơn bị hủy</p>
                      ) : item.status === "Completed" ? (
                        <p>Đơn hàng đã giao</p>
                      ) : (
                        <select
                          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                            changeStatus(e, item.codeOrder)
                          }
                          className="cursor-pointer"
                        >
                          <option value={item.status}>{item.status}</option>
                          <option value="Processing">Processing</option>
                          <option value="Cancel">Cancel</option>
                          <option value="Shipping">Shipping</option>
                          <option value="Completed">Completed</option>
                        </select>
                      )}
                    </td>
                    <td className="px-6 py-4 w-[150px]">
                      {item?.total?.toLocaleString()} ₫
                    </td>
                    <td className="px-6 py- 4">
                      {item.status === "Cancel" ? (
                        <button
                          onClick={() => handleDetail(item.id)}
                          className="w-30 bg-light-blue-800 text-red-100 px-5 py-2 font-semibol m-2"
                        >
                          Chi Tiết
                        </button>
                      ) : item.status === "Completed" ? (
                        <button
                          onClick={() => handleDetail(item.id)}
                          className="w-30 bg-light-blue-800 text-red-100 px-5 py-2 font-semibol m-2"
                        >
                          Chi Tiết
                        </button>
                      ) : (
                        <button
                          onClick={() => updateOrder(item.id)}
                          className="w-[100px] bg-green-500 text-red-100 px-4 py-2 font-semibol m-2"
                        >
                          Cập nhật
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="p-4">
            <Pagination data={orderApi} handlePage={handlePage} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderManager;
