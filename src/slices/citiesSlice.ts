import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TСitiesState, TCities } from "../models";

const initialState: TСitiesState = {
  cities: [],
  cityDeparture: "",
  cityArrival: "",
  citiesLoading: false,
  citiesError: null,
};

export const citiesSlice = createSlice({
  name: "cities",
  initialState,
  reducers: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    requestCities: ((state, _: PayloadAction<string>) => {
      state.cities = [];
      state.citiesLoading = true;
      state.citiesError = null;
    }),

    setCityDeparture: (state, action: PayloadAction<string>) => {
      state.cityDeparture = action.payload
    },

    setCityArrival: (state, action: PayloadAction<string>) => {
      state.cityArrival = action.payload
    },

    getCitiesSuccess: ((state, action: PayloadAction<TCities[]>) => {
      state.cities = action.payload;
      state.citiesLoading = false;
      state.citiesError = null;
    }),

    getCitiesFailure: ((state, action: PayloadAction<string>) => {
      state.citiesError = action.payload;
      state.citiesLoading = true;
    }),

    cancelRequestCities: ((state) => {
      state.citiesError = null;
      state.citiesLoading = false;
    }),
    resetCitiesState: () => {
      return initialState;
    },
  }
});

export const {
  requestCities,
  setCityDeparture,
  setCityArrival,
  getCitiesSuccess,
  getCitiesFailure,
  cancelRequestCities,
  resetCitiesState
} = citiesSlice.actions;
export default citiesSlice.reducer;