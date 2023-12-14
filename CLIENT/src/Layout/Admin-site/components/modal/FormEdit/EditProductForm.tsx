import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IBrand, ICategory } from "../../../../../Interface";
import { AppDispatch } from "../../../../../store";
import {
  getApiBrands,
  getApiCategories,
  getApiSizes,
  getDetailProduct,
} from "../../../../../store/action";
import { updateImage } from "../../../../../Api/images";
import { deleteProductSizes } from "../../../../../Api";

const EditProductForm = (props: any) => {
  const dispatch = useDispatch<AppDispatch>();
  const productDetail = useSelector(
    (state: any) => state?.productReducer?.productDetail
  );
  const categories = useSelector(
    (state: any) => state?.categoryReducer?.categories
  );
  const listSize = productDetail?.productSizes?.map(
    (item: any) => item.sizeId.id
  );
  const [sizeValue, setSizeValue] = useState<any>(listSize);
  const [error, setError] = useState<boolean>(false);
  const sizes = useSelector((state: any) => state?.sizeReducer?.sizes);
  const handleCheckboxChange = async (id: number) => {
    const updateCheckSize = [...sizeValue];
    const index = updateCheckSize.indexOf(id);
    // check size có đã có chưa
    if (index !== -1) {
      updateCheckSize.splice(index, 1);
      setSizeValue(updateCheckSize);
      if (sizeValue.length > 1) {
        await deleteProductSizes(productDetail.id);
      } else {
        setError(true);
      }
    } else {
      setSizeValue([...sizeValue, id]);
    }
  };
  const brands = useSelector((state: any) => state?.brandReducer?.brands);
  const [newProduct, setNewProduct] = useState<any>({
    id: productDetail.id,
    title: productDetail.title,
    brand: productDetail.brand.id,
    category: productDetail.category.id,
    stock: productDetail.stock,
    price: productDetail.price,
    description: productDetail.description,
  });
  const handleChangeImage = async (e: any, id: number) => {
    const formData = new FormData();
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    for (let img of e.target.files) formData.append("image", img);
    await updateImage(id, formData, config);
    await dispatch(getDetailProduct(productDetail.id));
  };
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    const product = {
      ...newProduct,
      [name]: value,
    };
    setNewProduct(product);
  };
  useEffect(() => {
    dispatch(getApiCategories(null));
    dispatch(getApiBrands(null));
    dispatch(getApiSizes());
  }, []);

  useEffect(() => {
    props.handleGetData(newProduct, sizeValue);
  }, [newProduct, sizeValue]);

  return (
    <div>
      <div className="bg-white shadow-md rounded px-8  flex flex-col ">
        <div className="-mx-3 md:flex  ">
          <div className="md:w-1/2 px-3  md:mb-0">
            <label>Tên sản phẩm</label>
            <input
              className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded   px-4 mb-3"
              id="grid-first-name"
              type="text"
              name="title"
              value={newProduct.title}
              onChange={handleChange}
            />
          </div>
          <div className="md:w-1/2 px-3 ">
            <div className="relative">
              <label>Thương hiệu</label>
              <select
                className="block appearance-none w-full bg-grey-lighter border border-grey-lighter text-grey-darker   px-4 pr-8 rounded"
                id="grid-state"
                name="brand"
                onChange={handleChange}
              >
                <option>{productDetail.brand?.title}</option>;
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
        <div className="-mx-3 md:flex  ">
          <div className="md:w-[80%] px-3">
            <label>Mô tả</label>
            <textarea
              className="appearance-none h-[100px] mb-4 block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 "
              id="grid-password"
              value={newProduct.description}
              name="description"
              onChange={handleChange}
            />
          </div>
          <div className="md:w-[20%] px-3 ">
            <div className="relative ">
              <label>Dung tích:</label>
              <td>
                {sizes?.map((item: any, index: number) => {
                  const sizeSelected = sizeValue?.some(
                    (selectedItem: any) => selectedItem === item.id
                  );
                  return (
                    <div key={index} className="inline-flex items-center">
                      <label
                        className="relative flex items-center rounded-full cursor-pointer"
                        htmlFor="login"
                        data-ripple-dark="true"
                      >
                        <input
                          value={item.id}
                          onChange={() => handleCheckboxChange(item.id)}
                          type="checkbox"
                          checked={sizeSelected}
                          className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-pink-500 checked:bg-pink-500 checked:before:bg-pink-500 hover:before:opacity-10"
                        />
                      </label>
                      <label
                        className="mt-px font-light pl-2 text-gray-700 cursor-pointer select-none"
                        htmlFor="login"
                      >
                        {item.size.slice(13)}
                      </label>
                    </div>
                  );
                })}
              </td>
            </div>
          </div>
        </div>
        <div className="-mx-3 md:flex mb-2">
          <div className="md:w-1/2 px-3 mb-6 md:mb-0">
            <label>Giá</label>
            <input
              className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded  px-4"
              id="grid-city"
              type="number"
              value={newProduct.price}
              name="price"
              onChange={handleChange}
            />
          </div>
          <div className="md:w-1/2 ">
            <label>Số lượng</label>
            <input
              className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded   px-4"
              id="grid-zip"
              type="number"
              name="stock"
              value={newProduct.stock}
              onChange={handleChange}
            />
          </div>
          <div className="md:w-1/2 px-3 ">
            <div className="relative">
              <label>Loại</label>
              <select
                className="block appearance-none w-full bg-grey-lighter border border-grey-lighter text-grey-darker  px-4 pr-8 rounded"
                id="grid-state"
                name="category"
                onChange={handleChange}
              >
                <option>{productDetail.category.title}</option>;
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
        <div className="w-[100%]">
          {productDetail?.images?.map((item: any, index: number) => {
            return (
              <div
                key={item.id}
                className=" flex justify-between items-center  mt-5 mb-5"
              >
                <p>Ảnh {index + 1}</p>
                <img src={`${item.url}`} alt="" className="w-[50px] h-[50px]" />
                <input
                  type="file"
                  className="w-[50%]"
                  onChange={(e: any) => handleChangeImage(e, item.id)}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default EditProductForm;
