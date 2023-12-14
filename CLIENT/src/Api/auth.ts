import axios from "axios";
export const registerAPI = (user: any): any => {
  return axios
    .post("http://localhost:9000/api/v1/register", user)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error("Error!!!!", error);
    });
};

export const loginAPI = (user: any): any => {
  return axios
    .post("http://localhost:9000/api/v1/login", user)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error("Error!!!!", error);
    });
};
