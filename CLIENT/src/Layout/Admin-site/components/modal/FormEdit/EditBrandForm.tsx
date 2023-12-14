import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
const EditBrandForm = (props: any) => {
  const brandDetail = useSelector(
    (state: any) => state?.brandReducer?.brandDetail
  );
  const [brand, setNewBrand] = useState<any>({
    id: brandDetail.id,
    title: brandDetail.title,
  });
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    const brand = {
      id: brandDetail.id,
      [name]: value,
    };
    setNewBrand(brand);
  };
  useEffect(() => {
    props.handleGetData(brand);
  }, [brand]);
  return (
    <div className="md:w-1/2 px-3  md:mb-0">
      <label>Tên Thương Hiệu</label>
      <input
        className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3"
        id="grid-first-name"
        type="text"
        name="title"
        value={brand.title}
        onChange={handleChange}
      />
    </div>
  );
};

export default EditBrandForm;
