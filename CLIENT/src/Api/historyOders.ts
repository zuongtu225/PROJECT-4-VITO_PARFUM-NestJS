import axios from "axios";
import React from "react";

export const updateHistoryOrders = (order: any) => {
  return axios
    .post(`http://localhost:5000/historyOrders`, order)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error("Error!!!!", error);
    });
};
