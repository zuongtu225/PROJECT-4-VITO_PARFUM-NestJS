import axios from "axios";
import BaseAxios from "./requsetToken";

export const createBrand = (data: any) => {
  return BaseAxios.post(`http://localhost:9000/api/v1/brands`, data)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error("Error!!!!", error);
    });
};
export const updateBrand = (data: any) => {
  return BaseAxios.put(`http://localhost:9000/api/v1/brands/${data.id}`, data)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error("Error!!!!", error);
    });
};
export const deleteBrand = (id: number) => {
  return BaseAxios.delete(`http://localhost:9000/api/v1/brands/${id}`)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error("Error!!!!", error);
    });
};
