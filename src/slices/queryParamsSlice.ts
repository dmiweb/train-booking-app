import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TQueryParams } from "../models";

const initialState: TQueryParams = {
  limit: 5,
  offset: 0,
  sort: "date",
  from_city_id: "",
  to_city_id: "",
  date_start: "",
  date_end: "",
  have_first_class: false,
  have_second_class: false,
  have_third_class: false,
  have_fourth_class: false,
  have_wifi: false,
  have_express: false,
  price_from: 0,
  price_to: 0,
  start_departure_hour_from: 0,
  start_arrival_hour_from: 0,
  start_departure_hour_to: 0,
  start_arrival_hour_to: 0,
  end_departure_hour_from: 0,
  end_departure_hour_to: 0,
  end_arrival_hour_from: 0,
  end_arrival_hour_to: 0,
  have_air_conditioning: false,
};

export const queryParamsSlice = createSlice({
  name: "queryParams",
  initialState,
  reducers: {
    setLimit: ((state, action: PayloadAction<number>) => {
      state.limit = action.payload;
    }),
    setOffset: ((state, action: PayloadAction<number>) => {
      state.offset = action.payload;
    }),
    setSort: ((state, action: PayloadAction<string>) => {
      state.sort = action.payload;
    }),
    setFromCityId: ((state, action: PayloadAction<string>) => {
      state.from_city_id = action.payload;
    }),
    setToCityId: ((state, action: PayloadAction<string>) => {
      state.to_city_id = action.payload;
    }),
    setDateStart: ((state, action: PayloadAction<string>) => {
      // console.log(action.payload)
      state.date_start = action.payload;
    }),
    setDateEnd: ((state, action: PayloadAction<string>) => {
      state.date_end = action.payload;
    }),
    setFirstClass: ((state, action: PayloadAction<boolean>) => {
      state.have_first_class = action.payload;
    }),
    setSecondClass: ((state, action: PayloadAction<boolean>) => {
      state.have_second_class = action.payload;
    }),
    setThirdClass: ((state, action: PayloadAction<boolean>) => {
      state.have_third_class = action.payload;
    }),
    setFourthClass: ((state, action: PayloadAction<boolean>) => {
      state.have_fourth_class = action.payload;
    }),
    setWifi: ((state, action: PayloadAction<boolean>) => {
      state.have_wifi = action.payload;
    }),
    setExpress: ((state, action: PayloadAction<boolean>) => {
      state.have_express = action.payload;
    }),
    setPriceFrom: ((state, action: PayloadAction<number>) => {
      state.price_from = action.payload;
    }),
    setPriceTo: ((state, action: PayloadAction<number>) => {
      state.price_to = action.payload;
    }),
    setStartDepartureHourFrom: ((state, action: PayloadAction<number>) => {
      state.start_departure_hour_from = action.payload;
    }),
    setStartDepartureHourTo: ((state, action: PayloadAction<number>) => {
      state.start_departure_hour_to = action.payload;
    }),
    setStartArrivalHourFrom: ((state, action: PayloadAction<number>) => {
      state.start_arrival_hour_from = action.payload;
    }),
    setStartArrivalHourTo: ((state, action: PayloadAction<number>) => {
      state.start_arrival_hour_to = action.payload;
    }),
    setEndDepartureHourFrom: ((state, action: PayloadAction<number>) => {
      state.end_departure_hour_from = action.payload;
    }),
    setEndDepartureHourTo: ((state, action: PayloadAction<number>) => {
      state.end_departure_hour_to = action.payload;
    }),
    setEndArrivalHourFrom: ((state, action: PayloadAction<number>) => {
      state.end_arrival_hour_from = action.payload;
    }),
    setEndArrivalHourTo: ((state, action: PayloadAction<number>) => {
      state.end_arrival_hour_to = action.payload;
    }),
    setAirConditioning: ((state, action: PayloadAction<boolean>) => {
      state.have_air_conditioning = action.payload;
    }),
    resetQueryParamsState: (() => {
      return initialState;
    }),
    setMultipleParams: ((state, action: PayloadAction<Partial<TQueryParams>>) => {
      // console.log(action)
      return { ...state, ...action.payload };
    }),
  },
});

export const {
  setLimit,
  setOffset,
  setSort,
  setFromCityId,
  setToCityId,
  setDateStart,
  setDateEnd,
  setFirstClass,
  setSecondClass,
  setThirdClass,
  setFourthClass,
  setWifi,
  setExpress,
  setPriceFrom,
  setPriceTo,
  setStartDepartureHourFrom,
  setStartDepartureHourTo,
  setStartArrivalHourFrom,
  setStartArrivalHourTo,
  setEndDepartureHourFrom,
  setEndDepartureHourTo,
  setEndArrivalHourFrom,
  setEndArrivalHourTo,
  setAirConditioning,
  resetQueryParamsState,
  setMultipleParams,
} = queryParamsSlice.actions;

export default queryParamsSlice.reducer;