import React, { useEffect, useState } from "react";
import AdminHeader from "../../components/layout/Header";
import { useDispatch, useSelector } from "react-redux";
import { getApiProducts } from "../../../../store/action";
import { AppDispatch } from "../../../../store";
import { updateStatusProduct } from "../../../../Api";
import { ToastContainer, toast } from "react-toastify";
import ButtonEditProduct from "../../components/Button/ButtonEditProduct";
import Pagination from "../../components/pagination";
import { IProduct } from "../../../../Interface";
import Export from "../../components/export";

const ProductManager = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [data, setData] = useState<IProduct[]>();
  const product = useSelector((state: any) => state?.productReducer?.products);
  const handlePage = (pagination: any) => {
    setData(pagination);
  };

  const handleStatus = async (status: any, id: number) => {
    const newStatus = +status === 1 ? true : false;
    const response: any = await updateStatusProduct(newStatus, id);
    if (response.data.success === true) {
      setTimeout(async () => {
        toast.success(response.data.message);
        await dispatch(getApiProducts(null));
      }, 1000);
    } else {
      toast.error(response.data.message);
    }
  };
  useEffect(() => {
    dispatch(getApiProducts(null));
  }, []);
  return (
    <div>
      <AdminHeader title="PRODUCTS" slug="PRODUCTS" />
      <ToastContainer />
      <Export data={product} slug={"PRODUCTS"} />
      <div className="content">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-15  py-3">
                  Ảnh
                </th>
                <th scope="col" className="px-6 py-3">
                  Tên sản phẩm
                </th>
                <th scope="col" className="px-10 py-3">
                  Thương Hiệu
                </th>
                <th scope="col" className="px-6 py-3">
                  Số lượng
                </th>
                <th scope="col" className="px-6 py-3">
                  Giá
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {data?.map((item: any, index: number) => {
                return (
                  <tr key={index} className="p-10 zitems-center">
                    <td
                      scope="row"
                      className="pl-10 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      <img
                        className="w-20 h-20  object-cover "
                        src={item?.images[0]?.url}
                        alt=""
                      />
                    </td>
                    <td className="px-1 py-2 font-bold">{item.title}</td>
                    <td className="px-1 py-2">{item.brand?.title}</td>
                    <td className="px-1 py-2">{item.stock}</td>
                    <td className="px-1 py-2">
                      {item.price?.toLocaleString()}
                    </td>
                    <td className=" py-2 px-2 flex items-center pt-6">
                      <ButtonEditProduct item={item} className="pl-5 " />
                      <select
                        onChange={(e: any) =>
                          handleStatus(e.target.value, item.id)
                        }
                      >
                        <option value={item.status ? 1 : 2}>
                          {item.status ? "Active" : "Block"}
                        </option>
                        <option value={item.status ? 2 : 1}>
                          {item.status ? "Block" : "Active"}
                        </option>
                      </select>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <Pagination data={product} handlePage={handlePage} />
        </div>
      </div>
    </div>
  );
};

export default ProductManager;
