import axios from "axios";
import { IProduct, IProductSize } from "../Interface";
import BaseAxios from "./requsetToken";

export const createProduct = (newProduct: IProduct) => {
  return BaseAxios.post(`http://localhost:9000/api/v1/products`, newProduct)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error("Error!!!!", error);
    });
};
export const createProductSize = (data: any) => {
  return BaseAxios.post(`http://localhost:9000/api/v1/productSizes`, data)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error("Error!!!!", error);
    });
};
export const updateProduct = (productUpdate: any) => {
  return BaseAxios.put(
    `http://localhost:9000/api/v1/products/${productUpdate.id}`,
    productUpdate
  )
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error("Error!!!!", error);
    });
};
export const updateStatusProduct = (status: boolean, id: number) => {
  return BaseAxios.put(`http://localhost:9000/api/v1/products/${id}`, {
    status,
  })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error("Error!!!!", error);
    });
};
export const deleteProductSizes = (id: number) => {
  return BaseAxios.delete(`http://localhost:9000/api/v1/productSizes/${id}`)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error("Error!!!!", error);
    });
};
