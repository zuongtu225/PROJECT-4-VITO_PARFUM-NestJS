import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IBrand, ICategory, IProduct, ISize } from "../../../../../Interface";
import {
  getApiBrands,
  getApiCategories,
  getApiSizes,
} from "../../../../../store/action";
import { AppDispatch } from "../../../../../store";
const AddProductForm = (props: any) => {
  const dispatch = useDispatch<AppDispatch>();
  const [images, setImages] = useState<any>([]);
  const categories = useSelector(
    (state: any) => state?.categoryReducer?.categories
  );
  const brands = useSelector((state: any) => state?.brandReducer?.brands);
  const sizes = useSelector((state: any) => state?.sizeReducer?.sizes);
  const [newProduct, setNewProduct] = useState<any>({
    title: "",
    brand: 0,
    category: 0,
    stock: 0,
    price: 0,
    status: true,
    isBestSeller: true,
    description: "",
  });
  const handleChangeImages = (e: any) => {
    setImages(e.target.files);
  };
  const [selectSizes, setSelectSizes] = useState<number[]>([]);
  const handleChangeSize = (sizeId: number) => {
    if (selectSizes.includes(sizeId)) {
      setSelectSizes(sizes.filter((sizeId: ISize) => sizeId !== sizeId));
    } else {
      setSelectSizes([...selectSizes, sizeId]);
    }
  };
  useEffect(() => {
    dispatch(getApiCategories(null));
    dispatch(getApiBrands(null));
    dispatch(getApiSizes());
  }, []);

  useEffect(() => {
    props.handleGetProduct(newProduct, images, selectSizes);
  }, [newProduct, images, selectSizes]);

  return (
    <div>
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col my-2">
        <div className="-mx-3 md:flex mb-6">
          <div className="md:w-1/2 px-3 mb-6 md:mb-0">
            <label>Tên sản phẩm</label>
            <input
              className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3"
              id="grid-first-name"
              type="text"
              name="name"
              onChange={(e) =>
                setNewProduct({
                  ...newProduct,
                  title: e.target.value,
                })
              }
            />
          </div>
          <div className="md:w-1/2 px-3 ">
            <div className="relative">
              <label>Thương hiệu</label>
              <select
                className="block appearance-none w-full bg-grey-lighter border border-grey-lighter text-grey-darker py-3 px-4 pr-8 rounded"
                id="grid-state"
                name="brand"
                onChange={(e) =>
                  setNewProduct({
                    ...newProduct,
                    brand: Number(e.target.value),
                  })
                }
              >
                <option value="">Thương hiệu</option>;
                {brands?.map((item: IBrand) => {
                  return (
                    <option key={item.id} value={item.id}>
                      {item.title}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
        </div>
        <div className="-mx-3 md:flex mb-6">
          <div className="md:w-[80%] px-3">
            <label>Mô tả</label>
            <textarea
              className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3"
              id="grid-password"
              name="description"
              onChange={(e) =>
                setNewProduct({
                  ...newProduct,
                  description: e.target.value,
                })
              }
            />
          </div>
          <div className="md:w-[20%] px-3 ">
            <div className="relative ">
              <label>Dung tích:</label>
              {sizes?.map((item: ISize) => {
                const size = item.size.slice(14);
                return (
                  <div key={item.id} className="mr-2 flex items-center">
                    <label className="block">{size}</label>
                    <input
                      type="checkbox"
                      className="w-50 h-50 cursor-pointer ml-4"
                      onChange={() => handleChangeSize(item.id)}
                      checked={selectSizes.includes(item.id)}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="-mx-3 md:flex mb-2">
          <div className="md:w-1/2 px-3 mb-6 md:mb-0">
            <label>Giá</label>
            <input
              className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"
              id="grid-city"
              type="number"
              name="price"
              onChange={(e) =>
                setNewProduct({
                  ...newProduct,
                  price: Number(e.target.value),
                })
              }
            />
          </div>
          <div className="md:w-1/2 px-3">
            <label>Số lượng</label>
            <input
              className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"
              id="grid-zip"
              type="number"
              name="stock"
              onChange={(e) =>
                setNewProduct({
                  ...newProduct,
                  stock: Number(e.target.value),
                })
              }
            />
          </div>
          <div className="md:w-1/2 px-3 ">
            <div className="relative">
              <label>Loại</label>
              <select
                className="block appearance-none w-full bg-grey-lighter border border-grey-lighter text-grey-darker py-3 px-4 pr-8 rounded"
                id="grid-state"
                name="category"
                onChange={(e) =>
                  setNewProduct({
                    ...newProduct,
                    category: Number(e.target.value),
                  })
                }
              >
                <option>Loại</option>;
                {categories?.map((item: ICategory) => {
                  return (
                    <option key={item.id} value={item.id}>
                      {item.title}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
        </div>
        <div className="-mx-3 md:flex mb-2">
          <div className="md:w-1/3 px-3 mb-6 md:mb-0">
            <input
              className="rounded-lg mt-3 border border-separate"
              onChange={handleChangeImages}
              type="file"
              multiple
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProductForm;
