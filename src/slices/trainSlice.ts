import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TTrainsData, TTrainState, TTrain, TLastTicket } from "../models";

const initialState: TTrainState = {
  trains: {
    total_count: 0,
    items: []
  },
  page: 1,
  minPrice: 0,
  maxPrice: 5000,
  selectedTrain: null,
  directionFromId: "",
  directionToId: "",
  loading: false,
  error: null,
};

export const trainSlice = createSlice({
  name: "trains",
  initialState,
  reducers: {
    requestTrains: (state) => {
      state.trains = {
        total_count: 0,
        items: []
      };
      state.directionFromId = "";
      state.directionToId = "";
      state.loading = true;
      state.error = null;
    },

    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },

    setMinPrice: (state, action: PayloadAction<number>) => {
      state.minPrice = action.payload;
    },

    setMaxPrice: (state, action: PayloadAction<number>) => {
      state.maxPrice = action.payload;
    },

    setSelectedTrain: (state, action: PayloadAction<TTrain | TLastTicket | null>) => {
      state.selectedTrain = action.payload;
      // console.log('Setting selectedTrain:', action.payload);
    },

    setDirectionFromId: (state, action: PayloadAction<string>) => {
      state.directionFromId = action.payload;
    },

    setDirectionToId: (state, action: PayloadAction<string>) => {
      state.directionToId = action.payload;
    },

    getTrainsSuccess: (state, action: PayloadAction<TTrainsData>) => {
      state.trains = action.payload;
      state.loading = false;
    },

    getTrainsFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },

    cancelRequestTrains: (state) => {
      state.error = null;
      state.loading = false;
    },
    resetTrainState: () => {
      return initialState;
    },
  }
});

export const {
  requestTrains,
  setPage,
  setMinPrice,
  setMaxPrice,
  setSelectedTrain,
  setDirectionFromId,
  setDirectionToId,
  getTrainsSuccess,
  getTrainsFailure,
  cancelRequestTrains,
  resetTrainState
} = trainSlice.actions;

export default trainSlice.reducer;