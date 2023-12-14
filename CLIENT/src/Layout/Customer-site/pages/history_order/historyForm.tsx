import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../../store";

export function HistoryModal(props: any) {
  const dispatch = useDispatch<AppDispatch>();
  const orderDetail = useSelector(
    (state: any) => state?.orderReducer?.orderDetail
  );
  console.log(orderDetail.orderItems, "detial<<<<");

  const [open, setOpen] = useState(props.open);
  const ClickClose = () => {
    props.handleClose(false);
  };
  useEffect(() => {
    setOpen(props.open);
  }, [props.open]);

  return (
    <div>
      <Dialog className="modal-history" open={open} handler={ClickClose}>
        <DialogHeader> Chi tiết đơn hàng </DialogHeader>
        <DialogBody
          className="overflow-scroll h-[500px] overflow-y-scroll"
          divider
        >
          <table className="w-full  text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Ảnh
                </th>
                <th scope="col" className="px-6 py-3">
                  Dung tích
                </th>
                <th scope="col" className="px-6 py-3">
                  Tên sản phẩm
                </th>
                <th scope="col" className="px-6 py-3">
                  Thương Hiệu
                </th>
                <th scope="col" className="px-6 py-3">
                  Số lượng
                </th>
                <th scope="col" className="px-6 py-3">
                  Giá
                </th>
              </tr>
            </thead>
            <tbody>
              {orderDetail?.orderItems?.map((item: any, index: number) => {
                return (
                  <tr key={index} className="p-10 zitems-center">
                    <td
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      <img
                        className="w-20 h-100 "
                        src={item.productSizeId?.productId?.images[0]?.url}
                        alt=""
                      />
                    </td>
                    <td className="w-4 p-4">
                      {item.productSizeId?.sizeId?.size.slice(13)}
                    </td>
                    <td className="px-6 py-4 font-bold">
                      {item.productSizeId?.productId?.title}
                    </td>
                    <td className="px-6 py-4">
                      {item.productSizeId?.productId?.brand?.title}
                    </td>
                    <td className="px-6 py-4">
                      {item.productSizeId?.productId?.stock}
                    </td>
                    <td className="px-6 py-4">
                      {item.productSizeId?.productId?.price?.toLocaleString()} ₫
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={ClickClose}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
}
