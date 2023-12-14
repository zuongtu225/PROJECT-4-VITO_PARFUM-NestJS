import axios from "axios";
import BaseAxios from "./requsetToken";
// create
export const createCart = (newProduct: any) => {
  return BaseAxios.post(`http://localhost:9000/api/v1/carts`, newProduct)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error("Error!!!!", error);
    });
};
export const updateCart = (id: number, newCart: any) => {
  return BaseAxios.put(`http://localhost:9000/api/v1/carts/${id}`, newCart)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error("Error!!!!", error);
    });
};
export const deleteCart = () => {
  return BaseAxios.delete(`http://localhost:9000/api/v1/carts/delete`)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error("Error!!!!", error);
    });
};
export const deleteCartItem = (id: number) => {
  return BaseAxios.delete(`http://localhost:9000/api/v1/carts/${id}`)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error("Error!!!!", error);
    });
};
