import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./Slices/productSlice";
import userSlice from "./Slices/userSlice";
import brandSlice from "./Slices/brandSlice";
import { useDispatch } from "react-redux";
import bankSlice from "./Slices/bankSlice";
import orderSlice from "./Slices/orderSlice";
import categorySlice from "./Slices/categorySlice";
import sizesSlice from "./Slices/sizesSlice";
import productSizeSlice from "./Slices/productSizeSlice";
import cartSlice from "./Slices/cartSlice";
import paymentSlice from "./Slices/payment";
import orderItemSlice from "./Slices/orderItemSlice";

const store = configureStore({
  reducer: {
    productReducer: productSlice,
    brandReducer: brandSlice,
    categoryReducer: categorySlice,
    sizeReducer: sizesSlice,
    orderItemReducer: orderItemSlice,
    productSizeReducer: productSizeSlice,
    cartReducer: cartSlice,
    userReducer: userSlice,
    bankReducer: bankSlice,
    paymentReducer: paymentSlice,
    orderReducer: orderSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export default store;
