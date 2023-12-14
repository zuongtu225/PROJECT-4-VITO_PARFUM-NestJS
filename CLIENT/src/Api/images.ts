import axios from "axios";
import BaseAxios from "./requsetToken";

// get detail
export const createImages = (data: any, config: any) => {
  return BaseAxios.post(`http://localhost:9000/api/v1/images`, data, config) // truyền thêm config
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error("Error!!!!", error);
    });
};
export const updateImage = (id: number, data: any, config: any) => {
  return BaseAxios.put(
    `http://localhost:9000/api/v1/images/${id}`,
    data,
    config
  )
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error("Error!!!!", error);
    });
};

export const deleteImage = (id: number) => {
  return axios
    .delete(`http://localhost:9000/images/${id}`)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error("Error!!!!", error);
    });
};
