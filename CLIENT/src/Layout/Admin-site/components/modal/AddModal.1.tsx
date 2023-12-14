import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import ProductFormAdd from "./FormAdd/AddProductForm";
import { createProduct, createProductSize } from "../../../../Api";
import { createImages } from "../../../../Api/images";
import { IBrand, IProduct, ISize } from "../../../../Interface";
import AddBrandForm from "./FormAdd/AddBrandForm";
import { createBrand } from "../../../../Api/brands";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../store";
import {
  getApiBrands,
  getApiCategories,
  getApiProducts,
  getPayments,
} from "../../../../store/action";
import { ToastContainer, toast } from "react-toastify";
import { createCategory } from "../../../../Api/categories";
import AddCategoryForm from "./FormAdd/AddCategoryForm";
import { createPayment } from "../../../../Api/payment";
import AddPaymentForm from "./FormAdd/AddPaymentForm";
import LoadingComponent from "../../../Customer-site/components/lazy-loading";

export function AddModal(props: any): any {
  const dispatch = useDispatch<AppDispatch>();
  const [product, setProduct] = useState<any>();
  const [category, setCategory] = useState<any>();
  const [images, setImages] = useState<any>();
  const [brand, setBrand] = useState<any>();
  const [sizes, setSizes] = useState<any>();
  const [payment, setPayment] = useState<any>();
  const [open, setOpen] = useState(props.open);
  const [openLoading, setOpenLoading] = useState<boolean>(false);

  useEffect(() => {
    setOpen(props.open);
  }, [props.open]);
  const ClickClose = () => {
    props.handleClose(false);
  };
  const handleGetProduct = (data: IProduct, formData: any, sizeId: ISize) => {
    setProduct(data);
    setImages(formData);
    setSizes(sizeId);
  };
  const handleGetBrand = (data: IBrand) => {
    setBrand({ title: data });
  };
  const handleGetCategory = (data: IBrand) => {
    setCategory({ title: data });
  };
  const handleGetPayment = (data: IBrand) => {
    setPayment({ title: data });
  };

  // THÊM MỚI
  const handleAdd = async () => {
    switch (props.title) {
      case "PRODUCTS":
        props.handleClose(false);
        setOpenLoading(true);
        const resProduct: any = await createProduct(product);
        if (resProduct?.data?.success === true) {
          const productSize = {
            productId: resProduct.data?.data?.id,
            sizeId: sizes,
          };
          await createProductSize(productSize);
          const formData = new FormData();
          const config = {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          };
          for (let img of images) formData.append("images", img);
          formData.append("productId", resProduct.data?.data?.id);
          const resImage: any = await createImages(formData, config);
          if (resImage?.data?.success === true) {
            setOpenLoading(false);
          }
          toast.success(resProduct.data.message);
          setTimeout(() => {
            dispatch(getApiProducts(null));
          }, 2000);
        } else {
          props.handleClose(false);
          toast.error("Tên sản phẩm đã được tạo vui lòng nhập tên khác");
        }
        break;
      case "BRANDS":
        const responseBrand: any = await createBrand(brand);
        if (responseBrand?.data?.success === true) {
          props.handleClose(false);
          toast.success(responseBrand?.data?.message);
          setTimeout(() => {
            dispatch(getApiBrands(null));
          }, 2000);
        } else {
          props.handleClose(false);
          toast.error("Trùng tên thương hiệu");
        }
        break;
      case "CATEGORY":
        const responseCategory: any = await createCategory(category);
        if (responseCategory?.data.success === true) {
          props.handleClose(false);
          toast.success(responseCategory.data.message);
          setTimeout(() => {
            dispatch(getApiCategories(null));
          }, 2000);
        } else {
          props.handleClose(false);
          toast.error("Loại nước hoa đã tồn tại");
        }
        break;
      case "PAYMENTS":
        const responsePayment: any = await createPayment(payment);
        if (responsePayment?.data.success === true) {
          props.handleClose(false);
          toast.success(responsePayment?.data?.message);
          setTimeout(() => {
            dispatch(getPayments(null));
          }, 2000);
        } else {
          props.handleClose(false);
          toast.error("Phương thức đã tồn tại");
        }
        break;
    }
  };

  return (
    // Form  chung
    // Submit chung
    <div className="formAdd">
      {openLoading ? <LoadingComponent /> : null}

      <Dialog open={open} handler={ClickClose}>
        <DialogHeader> Form Thêm </DialogHeader>
        <DialogBody divider>
          {props.title === "PRODUCTS" && (
            <div>
              <ProductFormAdd handleGetProduct={handleGetProduct} />
            </div>
          )}
          {props.title === "BRANDS" && (
            <div>
              <AddBrandForm handleGetBrand={handleGetBrand} />
            </div>
          )}
          {props.title === "CATEGORY" && (
            <div>
              <AddCategoryForm handleGetCategory={handleGetCategory} />
            </div>
          )}
          {props.title === "PAYMENTS" && (
            <div>
              <AddPaymentForm handleGetPayment={handleGetPayment} />
            </div>
          )}
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
          <Button color="green" onClick={handleAdd}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
      <ToastContainer />
    </div>
  );
}
