import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { IParams, IProduct, IUser } from "../../Interface";
import BaseAxios from "../../Api/requsetToken";

export const getApiProducts = createAsyncThunk<IProduct, any>(
  "products",
  async (data: IParams) => {
    const response = await BaseAxios.get(
      "http://localhost:9000/api/v1/products",
      {
        params: data,
      }
    );
    return response.data;
  }
);
export const getApiCategories = createAsyncThunk<any, any>(
  "categories",
  async (data: IParams) => {
    const response = await BaseAxios.get(
      "http://localhost:9000/api/v1/categories",
      {
        params: data,
      }
    );
    return response.data;
  }
);
export const getDetailCategory = createAsyncThunk<any, number>(
  "categoryDetail",
  async (id: number) => {
    const response = await BaseAxios.get(
      `http://localhost:9000/api/v1/categories/${id}`
    );
    return response.data;
  }
);
export const getApiBrands = createAsyncThunk<any, any>(
  "brands",
  async (data: IParams) => {
    const response = await BaseAxios.get(
      "http://localhost:9000/api/v1/brands",
      {
        params: data,
      }
    );
    return response.data;
  }
);
export const getDetailBrand = createAsyncThunk<any, number>(
  "brandDetail",
  async (id: number) => {
    const response = await axios.get(
      `http://localhost:9000/api/v1/brands/${id}`
    );
    return response.data;
  }
);
export const getApiProductSizes = createAsyncThunk<any>(
  "productSizes",
  async () => {
    const response = await BaseAxios.get(
      "http://localhost:9000/api/v1/productSizes"
    );
    return response.data;
  }
);
export const getCartByUser = createAsyncThunk<any>(
  "getCartByUser",
  async () => {
    const response = await BaseAxios.get(
      "http://localhost:9000/api/v1/carts/detail"
    );
    return response.data;
  }
);
export const getApiSizes = createAsyncThunk<any>("sizes", async () => {
  const response = await BaseAxios.get("http://localhost:9000/api/v1/sizes");
  return response.data;
});
export const getApiUsers = createAsyncThunk<IUser, any>(
  "users",
  async (data: IParams) => {
    const response = await BaseAxios.get("http://localhost:9000/api/v1/users", {
      params: data,
    });
    return response.data;
  }
);
export const getApiOrderItems = createAsyncThunk<any>(
  "orderItems",
  async () => {
    const response = await BaseAxios.get(
      "http://localhost:9000/api/v1/orderItems"
    );
    return response.data;
  }
);
export const getDetailOrder = createAsyncThunk<any, any>(
  "getDetailOrder",
  async (id: any) => {
    const response = await BaseAxios.get(
      `http://localhost:9000/api/v1/orders/${id}`
    );
    return response.data;
  }
);
export const getApiBank = createAsyncThunk<any>("banks", async () => {
  const response = await BaseAxios.get("http://localhost:9000/api/v1/banks");
  return response.data;
});
export const getDetailProduct = createAsyncThunk<any, any>(
  "getDetailProduct",
  async (id: any) => {
    const response = await BaseAxios.get(
      `http://localhost:9000/api/v1/products/${id}`
    );
    return response.data;
  }
);
export const getDetailUser = createAsyncThunk("getDetailUser", async () => {
  const response = await BaseAxios.get(`http://localhost:9000/api/v1/users/me`);
  return response.data;
});
export const getOrderApi = createAsyncThunk<any>("getOrderApi", async () => {
  const response = await BaseAxios.get("http://localhost:9000/api/v1/orders");
  return response.data;
});
export const getHistoryOrderByUser = createAsyncThunk<any, any>(
  "getHistoryOrderByUser",
  async (userId: any) => {
    const response = await BaseAxios.get(
      "http://localhost:9000/api/v1/orders/historyByUser",
      {
        params: userId,
      }
    );
    return response.data;
  }
);
export const getPayments = createAsyncThunk<any, any>(
  "getPayments",
  async (data: IParams) => {
    const response = await BaseAxios.get(
      "http://localhost:9000/api/v1/payments",
      {
        params: data,
      }
    );
    return response.data;
  }
);
export const getDetailPayment = createAsyncThunk<any, any>(
  "getDetailPayment",
  async (id: number) => {
    const response = await BaseAxios.get(
      `http://localhost:9000/api/v1/payments/${id}`
    );
    return response.data;
  }
);
