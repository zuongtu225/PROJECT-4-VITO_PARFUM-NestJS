import React, { useEffect, useState } from "react";
import Tabs from "../../components/layout/Tabs";
import AdminHeader from "../../components/layout/Header";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../../store";
import { getApiCategories, getDetailCategory } from "../../../../store/action";
import { ICategory } from "../../../../Interface";
import { ToastContainer, toast } from "react-toastify";
import { deleteCategory } from "../../../../Api/categories";
import { EditModal } from "../../components/modal/EditModal";
import { Button } from "flowbite-react";
import Pagination from "../../components/pagination";

const CategoryManager = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [data, setData] = useState<ICategory[]>();
  const categories = useSelector(
    (state: any) => state?.categoryReducer?.categories
  );
  const handlePage = (pagination: any) => {
    setData(pagination);
  };
  const removeCategory = async (id: number) => {
    const response = await deleteCategory(id);
    if (response) {
      toast.success("Xóa thành công");
      dispatch(getApiCategories(null));
    } else {
      toast.error("Phải xóa các sản phẩm đã tạo bởi Loại này trước");
    }
  };
  const [open, setOpen] = useState<boolean>(false);
  const handleClose = (open: boolean) => {
    setOpen(open);
  };
  const handleEdit = async (id: number) => {
    await dispatch(getDetailCategory(id));
    setOpen(!open);
  };
  useEffect(() => {
    dispatch(getApiCategories(null));
  }, []);
  return (
    <div>
      <AdminHeader title="CATEGORY" slug={"CATEGORY"} />
      <ToastContainer />
      <div className="content users">
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
              {data?.map((item: ICategory, index: number) => {
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
                        title={"CATEGORY"}
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
                        onClick={() => removeCategory(item.id)}
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
          <Pagination data={categories} handlePage={handlePage} />
        </div>
      </div>
    </div>
  );
};

export default CategoryManager;
