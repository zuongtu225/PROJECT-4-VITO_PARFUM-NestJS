import React, { useEffect, useState } from "react";
import Tabs from "../../components/layout/Tabs";
import AdminHeader from "../../components/layout/Header";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../../store";
import { getApiBrands, getDetailBrand } from "../../../../store/action";
import { IBrand } from "../../../../Interface";
import { ToastContainer, toast } from "react-toastify";
import { deleteBrand } from "../../../../Api/brands";
import { EditModal } from "../../components/modal/EditModal";
import { Button } from "flowbite-react";
import Pagination from "../../components/pagination";

const BrandsManager = () => {
  const dispatch = useDispatch<AppDispatch>();
  const brands = useSelector((state: any) => state?.brandReducer?.brands);
  const [data, setData] = useState<IBrand[]>();
  const handlePage = (pagination: any) => {
    setData(pagination);
  };
  const [open, setOpen] = useState<boolean>(false);
  const handleClose = (open: boolean) => {
    setOpen(open);
  };
  const handleEdit = async (id: number) => {
    await dispatch(getDetailBrand(id));
    setOpen(!open);
  };

  const removeBrand = async (id: number) => {
    const response = await deleteBrand(id);
    if (response) {
      toast.success("Xóa thành công");
      dispatch(getApiBrands(null));
    } else {
      toast.error("Phải xóa các sản phẩm đã tạo bởi Thương Hiệu này trước");
    }
  };
  useEffect(() => {
    dispatch(getApiBrands(null));
  }, []);

  return (
    <div>
      <AdminHeader title="BRANDS" slug="BRANDS" />
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
                  Thương hiệu
                </th>
                <th scope="col" className="px-1 py-3">
                  HÀNH ĐỘNG
                </th>
              </tr>
            </thead>
            <tbody>
              {data?.map((item: IBrand, index: number) => {
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
                        title={"BRANDS"}
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
                        onClick={() => removeBrand(item.id)}
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
          <Pagination data={brands} handlePage={handlePage} />
        </div>
      </div>
    </div>
  );
};

export default BrandsManager;
