// BÊN FILE API THÌ  XỬ LÝ LOGIC CRUD
import axios from "axios";
import BaseAxios from "./requsetToken";
export const createOrder = (order: any) => {
  return BaseAxios.post(`http://localhost:9000/api/v1/orders`, order)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error("Error!!!!", error);
    });
};

export const deleteOrder = (order: any) => {
  return BaseAxios.delete(
    `http://localhost:9000/api/v1/orders/${order.id}`,
    order
  )
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error("Error!!!!", error);
    });
};
export const deleteOrderItem = (order: any) => {
  return BaseAxios.delete(
    `http://localhost:9000/api/v1/orders/${order.id}`,
    order
  )
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error("Error!!!!", error);
    });
};

export const updateOrderApi = (data: any) => {
  return BaseAxios.put(`http://localhost:9000/api/v1/orders/${data.id}`, data)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error("Error!!!!", error);
    });
};
