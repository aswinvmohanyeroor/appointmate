// store.js
import { configureStore } from "@reduxjs/toolkit";
import apiReducer from "../slices/userSlice";

const store = configureStore({
  reducer: {
    useApiData: apiReducer,
  },
});

export default store;
