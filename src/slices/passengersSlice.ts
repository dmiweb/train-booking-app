import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TPassengersState, TPassengers, TPassengerInfo } from "../models";

const initialState: TPassengersState = {
  departure: {
    route_direction_id: "",
    seats: [],
  },
  arrival: {
    route_direction_id: "",
    seats: [],
  }
}

export const passengersSlice = createSlice({
  name: "passengers",
  initialState,
  reducers: {
    addPassenger: (state, action: PayloadAction<{
      type: "departure" | "arrival",
      value: TPassengers
    }>) => {
      state[action.payload.type] = action.payload.value;
    },

    updatePassenger: (state, action: PayloadAction<{
      direction: "departure" | "arrival",
      coach_id: string,
      seat_number: number,
      field: keyof TPassengerInfo["person_info"],
      value: string | boolean
    }>) => {
      const { direction, coach_id, seat_number, field, value } = action.payload;

      const passenger = state[direction].seats.find(
        (p) => p.seat_number === seat_number && p.coach_id === coach_id,
      );

      if (passenger && passenger.person_info[field] !== undefined) {
        // console.log(field, value)
        if (field === 'is_adult') {
          passenger.person_info[field] = value as boolean;
        } else {
          passenger.person_info[field] = value as string;
        }
      }
    },
    deletePassenger: (state, action: PayloadAction<{
      type: "departure" | "arrival",
      seat_number: number,
      coach_id: string
    }>) => {
      const { type, seat_number, coach_id } = action.payload;

      state[type].seats = state[type].seats.filter(p =>
        !(p.seat_number === seat_number && p.coach_id === coach_id)
      );
    },
    resetPassengersState: () => {
      return initialState;
    },
  }
});

export const {
  addPassenger,
  updatePassenger,
  deletePassenger,
  resetPassengersState
} = passengersSlice.actions;

export default passengersSlice.reducer;