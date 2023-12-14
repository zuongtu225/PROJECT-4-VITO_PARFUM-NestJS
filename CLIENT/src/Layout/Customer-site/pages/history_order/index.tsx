import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../../store";
import {
  getDetailOrder,
  getHistoryOrderByUser,
} from "../../../../store/action";
import { ToastContainer, toast } from "react-toastify";
import { BsFillCartCheckFill } from "react-icons/bs";
import { updateOrderApi } from "../../../../Api/order";
import { HistoryModal } from "./historyForm";
const HistoryOrders = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [open, setOpen] = useState<boolean>(false);
  const handleClose = (open: boolean) => {
    setOpen(open);
  };
  const handleDetail = async (id: number) => {
    await dispatch(getDetailOrder(id));
    setOpen(!open);
  };
  const historyOrders = useSelector(
    (state: any) => state?.orderReducer?.historyOrderByUser
  );
  const updateOrder = async (id: number) => {
    const orderNeedChange = historyOrders?.find((item: any) => item.id === id);
    const updateCancel = {
      id: orderNeedChange.id,
      status: "Cancel",
      codeOrder: orderNeedChange.codeOrder,
    };
    const reCancel: any = await updateOrderApi(updateCancel);
    if (reCancel?.data?.success === true) {
      toast.success("Đơn hàng đã bị hủy ");
      setTimeout(() => {
        dispatch(getHistoryOrderByUser(null));
      }, 1500);
    } else {
      toast.error("Thất bại do lỗi yêu cầu đến API");
    }
  };

  useEffect(() => {
    dispatch(getHistoryOrderByUser(null));
  }, []);

  return (
    <main>
      <ToastContainer />
      <div className="content orders">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <div className=" pl-[10%] pt-5  text-black font-bold flex items-center gap-2">
            <h1>Lịch sử mua hàng của bạn</h1> <BsFillCartCheckFill />
          </div>
          <table className="w-[80%]  mt-5 mb-10 text-sm text-left text-gray-500 dark:text-gray-400">
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
              <HistoryModal open={open} handleClose={handleClose} />
              {historyOrders?.map((item: any, index: number) => {
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
                      {item.status === "Pending" ? (
                        <p className="text-green-400">
                          Đơn hàng đang chờ xác nhận
                        </p>
                      ) : item.status === "Cancel" ? (
                        <p>Đơn hàng đã hủy</p>
                      ) : (
                        <p>Đơn hàng đã giao</p>
                      )}
                    </td>
                    <td className="px-6 py-4 w-[150px]">
                      {item?.total.toLocaleString()} ₫
                    </td>
                    <td className="px-10 py- 4">
                      {item.status === "Pending" ? (
                        <button
                          onClick={() => updateOrder(item.id)}
                          className="w-30 bg-red-500 text-red-100 px-5 py-2 font-semibol m-2"
                        >
                          Hủy đơn
                        </button>
                      ) : item.status === "Completed" ? (
                        <button
                          onClick={() => handleDetail(item.id)}
                          className="w-30 bg-green-500 text-red-100 px-4 py-2 font-semibol m-2"
                        >
                          Chi tiết
                        </button>
                      ) : (
                        ""
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
};

export default HistoryOrders;
