import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TOrderState, TOrderOwner, TOrderCompleted } from "../models";

const initialState: TOrderState = {
  owner: {
    first_name: "",
    last_name: "",
    patronymic: "",
    phone: "",
    email: "",
    payment_method: "",
  },
  order: null,
  loading: false,
  error: null,
  orderStatus: false,
};

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setOrder: (state, action: PayloadAction<TOrderCompleted>) => {
      state.order = action.payload;
    },

    updateOrder: (state, action: PayloadAction<TOrderOwner>) => {
      if (state.order) {
        state.order.user = action.payload;
      }
    },

    updateOwner: (state, action: PayloadAction<{
      field: keyof TOrderState["owner"],
      value: string,
    }>) => {
      const { field, value } = action.payload;

      state.owner[field] = value;
    },

    submitOrder: (state) => {
      state.loading = true;
      state.error = null;
    },
    getOrderStatus: (state, action: PayloadAction<boolean>) => {
      state.loading = false;
      state.error = null;
      state.orderStatus = action.payload;
    },
    resetOrderState: () => {
      return initialState;
    }
  }
});

export const {
  setOrder,
  updateOrder,
  updateOwner,
  submitOrder,
  getOrderStatus,
  resetOrderState
} = orderSlice.actions;
export default orderSlice.reducer;