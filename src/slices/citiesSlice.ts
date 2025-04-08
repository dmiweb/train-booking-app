import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TСitiesState, TCities } from "../models";

const initialState: TСitiesState = {
  cities: [],
  cityTo: "",
  cityFrom: "",
  citiesLoading: false,
  citiesError: null,
};

export const citiesSlice = createSlice({
  name: "cities",
  initialState,
  reducers: (create) => ({
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    requestCities: create.reducer((state, _: PayloadAction<string | "">) => {
      state.cities = [];
      state.citiesLoading = true;
      state.citiesError = null;
    }),

    getCitiesSuccess: create.reducer((state, action: PayloadAction<TCities[]>) => {
      state.cities = action.payload;
      state.citiesLoading = false;
      state.citiesError = null;
    }),

    getCitiesFailure: create.reducer((state, action: PayloadAction<string>) => {
      state.citiesError = action.payload;
      state.citiesLoading = true;
    }),
    cancelRequestCities: create.reducer((state) => {
      state.citiesError = null;
      state.citiesLoading = false;
    }),
  })
});

export const {
  requestCities,
  getCitiesSuccess,
  getCitiesFailure,
  cancelRequestCities
} = citiesSlice.actions;
export default citiesSlice.reducer;