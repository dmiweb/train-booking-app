import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TLastTicketsState, TLastTicket } from "../models";

const initialState: TLastTicketsState = {
  lastTickets: [],
  lastTicketsLoading: false,
  lastTicketsError: null,
};

export const lastTicketsSlice = createSlice({
  name: "lastTickets",
  initialState,
  reducers: {
    requestLastTickets: ((state) => {
      state.lastTickets = [];
      state.lastTicketsLoading = true;
      state.lastTicketsError = null;
    }),

    getLastTicketsSuccess: ((state, action: PayloadAction<TLastTicket[]>) => {
      state.lastTickets = action.payload;
      state.lastTicketsLoading = false;
    }),

    getLastTicketsFailure: ((state, action: PayloadAction<string>) => {
      state.lastTicketsError = action.payload;
      state.lastTicketsLoading = false;
    }),

    cancelRequestLastTickets: ((state) => {
      state.lastTickets = [];
      state.lastTicketsError = null;
      state.lastTicketsLoading = false;
    }),
  }
});

export const {
  requestLastTickets,
  getLastTicketsSuccess,
  getLastTicketsFailure,
  cancelRequestLastTickets,
} = lastTicketsSlice.actions;

export default lastTicketsSlice.reducer;