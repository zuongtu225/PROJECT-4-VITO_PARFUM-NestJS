import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
const EditCategoryForm = (props: any) => {
  const categoryDetail = useSelector(
    (state: any) => state?.categoryReducer?.categoryDetail
  );
  const [category, setNewCategory] = useState<any>({
    id: categoryDetail.id,
    title: categoryDetail.title,
  });
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    const category = {
      id: categoryDetail.id,
      [name]: value,
    };
    setNewCategory(category);
  };
  useEffect(() => {
    props.handleGetData(category);
  }, [category]);
  return (
    <div className="md:w-1/2 px-3  md:mb-0">
      <label>Tên Thương Hiệu</label>
      <input
        className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3"
        id="grid-first-name"
        type="text"
        name="title"
        value={category.title}
        onChange={handleChange}
      />
    </div>
  );
};

export default EditCategoryForm;
