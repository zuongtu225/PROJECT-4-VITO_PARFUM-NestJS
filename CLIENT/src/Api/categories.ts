import axios from "axios";
import BaseAxios from "./requsetToken";

export const createCategory = (data: any) => {
  return BaseAxios.post(`http://localhost:9000/api/v1/categories`, data)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error("Error!!!!", error);
    });
};
export const updateCategory = (data: any) => {
  return BaseAxios.put(
    `http://localhost:9000/api/v1/categories/${data.id}`,
    data
  )
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error("Error!!!!", error);
    });
};
export const deleteCategory = (id: number) => {
  return BaseAxios.delete(`http://localhost:9000/api/v1/categories/${id}`)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error("Error!!!!", error);
    });
};
