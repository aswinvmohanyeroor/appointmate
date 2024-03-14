// features/myFeature/myFeatureSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // Define your initial state here
  data: {},
};

const apiReducer = createSlice({
  name: "apiReducer",
  initialState,
  reducers: {
    setData: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setData } = apiReducer.actions;
export default apiReducer.reducer;
