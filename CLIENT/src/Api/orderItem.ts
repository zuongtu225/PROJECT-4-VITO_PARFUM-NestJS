// BÊN FILE API THÌ  XỬ LÝ LOGIC CRUD
import axios from "axios";
import BaseAxios from "./requsetToken";

export const createOrderItem = (data: any) => {
  return BaseAxios.post(`http://localhost:9000/api/v1/orderItems`, data)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error("Error!!!!", error);
    });
};

export const deleteOrderItem = (order: any) => {
  return axios
    .delete(`http://localhost:5000/orders/${order.id}`, order)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error("Error!!!!", error);
    });
};

export const updateOrderApi = (order: any) => {
  return axios
    .put(`http://localhost:5000/orders/${order.id}`, order)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error("Error!!!!", error);
    });
};
