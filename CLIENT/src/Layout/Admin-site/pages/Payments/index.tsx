import React, { useEffect, useState } from "react";
import AdminHeader from "../../components/layout/Header";
import { getDetailPayment, getPayments } from "../../../../store/action";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../../store";
import { IPayment } from "../../../../Interface";
import { ToastContainer, toast } from "react-toastify";
import { deletePayment } from "../../../../Api/payment";
import { EditModal } from "../../components/modal/EditModal";
import { Button } from "flowbite-react";

const PaymentManager = () => {
  const dispatch = useDispatch<AppDispatch>();
  const payments = useSelector((state: any) => state?.paymentReducer?.payments);
  const removePayment = async (id: number) => {
    const response = await deletePayment(id);
    if (response) {
      toast.success("Xóa thành công");
      dispatch(getPayments(null));
    } else {
      toast.error("Phải xóa các sản phẩm đã tạo bởi Loại này trước");
    }
  };
  const [open, setOpen] = useState<boolean>(false);
  const handleClose = (open: boolean) => {
    setOpen(open);
  };
  const handleEdit = async (id: number) => {
    await dispatch(getDetailPayment(id));
    setOpen(!open);
  };
  useEffect(() => {
    dispatch(getPayments(null));
  }, []);
  return (
    <div>
      <AdminHeader title={"PAYMENTS"} slug={"PAYMENTS"} />
      <ToastContainer />
      <div className="content ">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-5">
          <table className="w-full  text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-20 py-3">
                  ID
                </th>
                <th scope="col" className="px-20 py-3">
                  LOẠI
                </th>
                <th scope="col" className="px-5 py-3">
                  HÀNH ĐỘNG
                </th>
              </tr>
            </thead>
            <tbody>
              {payments?.map((item: IPayment, index: number) => {
                return (
                  <tr className="p-10">
                    <td
                      scope="row"
                      className="px-20 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {index + 1}
                    </td>

                    <td className="px-20 py-3">{item.title}</td>
                    <td className="align-baseline flex  pl-[200px]  py-3 ">
                      <EditModal
                        title={"PAYMENT"}
                        open={open}
                        handleClose={handleClose}
                      />
                      <Button
                        onClick={() => handleEdit(item.id)}
                        className=" bg-green-500 text-red-100 font-semibol mr-3 "
                      >
                        Sửa
                      </Button>
                      <Button
                        onClick={() => removePayment(item.id)}
                        className="bg-red-600 text-red-200 font-semibol"
                      >
                        Xoá
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PaymentManager;
