import axios from "axios";

export const updateBanks = (myBank: any) => {
  return axios
    .put(`http://localhost:5000/banks/${myBank.id}`, myBank)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error("Error!!!!", error);
    });
};
