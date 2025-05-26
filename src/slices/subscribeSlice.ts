import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { subscribeState } from "../models";

const initialState: subscribeState = {
  subscribeStatus: false,
  loading: false,
  error: null,
};

export const subscribeSlice = createSlice({
  name: "subscribe",
  initialState,
  reducers: {
    requestSubscribe: ((state, action: PayloadAction<string>) => {
      void action;
      state.subscribeStatus = false;
      state.loading = true;
      state.error = null;
    }),

    getSubscribeStatusSuccess: ((state, action: PayloadAction<boolean>) => {
      state.subscribeStatus = action.payload;
      state.loading = false;
      state.error = null;
    }),

    getSubscribeStatusFailure: ((state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    }),

    cancelRequestSubscribe: ((state) => {
      state.error = null;
      state.loading = false;
    }),
  }
});

export const {
  requestSubscribe,
  getSubscribeStatusSuccess,
  getSubscribeStatusFailure,
  cancelRequestSubscribe,
} = subscribeSlice.actions;
export default subscribeSlice.reducer;