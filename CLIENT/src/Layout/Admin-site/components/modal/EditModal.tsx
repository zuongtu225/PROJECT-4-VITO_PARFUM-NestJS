import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import EditProductForm from "./FormEdit/EditProductForm";
import { IBrand, ICategory, IPayment, IProduct } from "../../../../Interface";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../store";
import {
  getApiBrands,
  getApiCategories,
  getApiProducts,
  getPayments,
} from "../../../../store/action";
import { createProductSize, updateProduct } from "../../../../Api";
import { toast } from "react-toastify";
import EditBrandForm from "./FormEdit/EditBrandForm";
import { updateBrand } from "../../../../Api/brands";
import EditCategoryForm from "./FormEdit/EditCategoryForm";
import { updateCategory } from "../../../../Api/categories";
import EditPaymentForm from "./FormEdit/EditPaymentForm";
import { updatePayment } from "../../../../Api/payment";
import LoadingComponent from "../../../Customer-site/components/lazy-loading";
export function EditModal(props: any) {
  const dispatch = useDispatch<AppDispatch>();
  const [open, setOpen] = useState(props.open);
  const [productUpdate, setProductUpdate] = useState<IProduct>();
  const [brandUpdate, setBrandUpdate] = useState<IBrand>();
  const [categoryUpdate, setCategoryUpdate] = useState<ICategory>();
  const [paymentUpdate, setPaymentUpdate] = useState<IPayment>();
  const [sizeValue, setSizeValue] = useState<number[]>([]);

  useEffect(() => {
    setOpen(props.open);
  }, [props.open]);

  const ClickClose = () => {
    props.handleClose(false);
  };
  const handleUpdate = async () => {
    switch (props.title) {
      case "PRODUCTS":
        const responseProduct: any = await updateProduct(productUpdate);
        if (responseProduct?.data?.success === true) {
          const productSize = {
            productId: productUpdate?.id,
            sizeId: sizeValue,
          };
          await createProductSize(productSize);
          toast.success(responseProduct.data.message);
          props.handleClose(false);
          setTimeout(() => {
            dispatch(getApiProducts(null));
          }, 1000);
        } else {
          props.handleClose(false);
          toast.error("Tên sản phẩm đã được tạo vui lòng nhập tên khác");
        }
        break;
      case "BRANDS":
        const responseBrand: any = await updateBrand(brandUpdate);
        if (responseBrand?.data?.success === true) {
          toast.success(responseBrand.data.message);
          props.handleClose(false);
          setTimeout(() => {
            dispatch(getApiBrands(null));
          }, 2000);
        } else {
          props.handleClose(false);
          toast.error("Tên thương hiệu đã được tạo vui lòng nhập tên khác");
        }
        break;
      case "CATEGORY":
        const responseCategory: any = await updateCategory(categoryUpdate);
        if (responseCategory?.data?.success === true) {
          toast.success(responseCategory?.data?.message);
          props.handleClose(false);
          setTimeout(() => {
            dispatch(getApiCategories(null));
          }, 2000);
        } else {
          props.handleClose(false);
          toast.error("Loại đã được tạo vui lòng nhập tên khác");
        }
        break;
      case "PAYMENT":
        const responsePayment: any = await updatePayment(paymentUpdate);
        if (responsePayment?.data?.success === true) {
          toast.success(responsePayment?.data?.message);
          props.handleClose(false);
          setTimeout(() => {
            dispatch(getPayments(null));
          }, 2000);
        } else {
          props.handleClose(false);
          toast.error("Phương Thức đã được tạo vui lòng nhập tên khác");
        }
        break;
    }
  };

  const handleGetData = (dataUpdate: any, sizeValue: any) => {
    setProductUpdate(dataUpdate);
    setBrandUpdate(dataUpdate);
    setCategoryUpdate(dataUpdate);
    setPaymentUpdate(dataUpdate);
    setSizeValue(sizeValue);
  };
  return (
    <div>
      <Dialog open={open} handler={ClickClose}>
        <DialogBody divider>
          {props.title === "PRODUCTS" && (
            <div>
              <EditProductForm handleGetData={handleGetData} />
            </div>
          )}
          {props.title === "BRANDS" && (
            <div>
              <EditBrandForm handleGetData={handleGetData} />
            </div>
          )}
          {props.title === "CATEGORY" && (
            <div>
              <EditCategoryForm handleGetData={handleGetData} />
            </div>
          )}
          {props.title === "PAYMENT" && (
            <div>
              <EditPaymentForm handleGetData={handleGetData} />
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
          <Button color="green" onClick={handleUpdate}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
}
