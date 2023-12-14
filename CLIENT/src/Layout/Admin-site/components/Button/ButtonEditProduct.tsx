import { Button } from "flowbite-react";
import React, { useState } from "react";
import { EditModal } from "../modal/EditModal";
import { getApiProductSizes, getDetailProduct } from "../../../../store/action";
import { AppDispatch } from "../../../../store";
import { useDispatch, useSelector } from "react-redux";

const ButtonEditProduct = (props: any) => {
  const dispatch = useDispatch<AppDispatch>();
  const [open, setOpen] = useState(false);
  const handleClose = (open: boolean) => {
    setOpen(open);
  };

  const handleEdit = async (id: number) => {
    await dispatch(getDetailProduct(id));
    setOpen(!open);
  };

  return (
    <>
      <EditModal title={"PRODUCTS"} open={open} handleClose={handleClose} />
      <Button
        onClick={() => handleEdit(props.item.id)}
        className=" bg-green-500 text-red-100 font-semibol mr-3 "
      >
        Sửa
      </Button>
    </>
  );
};

export default ButtonEditProduct;
