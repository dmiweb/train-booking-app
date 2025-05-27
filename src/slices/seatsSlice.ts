import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TSeatsState, TSeat, TSelectedSeat, TSelectedOptions } from '../models';

const initialState: TSeatsState = {
  seatsFrom: [],
  seatsTo: [],
  activeTypeSeat: {
    from: "",
    to: "",
  },
  activeTypeCoach: {
    from: "",
    to: "",
  },
  optionsService: {
    from: {
      conditioner: "unselected",
      wifi: "unselected",
      linens: "unselected",
      food: "unselected",
    },
    to: {
      conditioner: "unselected",
      wifi: "unselected",
      linens: "unselected",
      food: "unselected",
    }
  },
  openedCoaches: { from: [], to: [] },
  limitPassenger: 4,
  adultPassenger: 0,
  childPassenger: 0,
  childNoSeat: 0,
  selectedSeats: {
    from: [],
    to: [],
  },
  loading: false,
  error: null,
};

export const seatsSlice = createSlice({
  name: 'seats',
  initialState,
  reducers: {
    requestSeats: (state) => {
      state.seatsFrom = [];
      state.seatsTo = [];
      state.activeTypeSeat = { from: "", to: "" };
      state.activeTypeCoach = { from: "", to: "" };
      state.optionsService = {
        from: {
          conditioner: "unselected",
          wifi: "unselected",
          linens: "unselected",
          food: "unselected",
        },
        to: {
          conditioner: "unselected",
          wifi: "unselected",
          linens: "unselected",
          food: "unselected",
        }
      };
      state.openedCoaches = { from: [], to: [] };
      state.selectedSeats = { from: [], to: [] };
      state.loading = true;
      state.error = null;
    },

    setActiveTypeSeat: (state, action: PayloadAction<{ type: "from" | "to", value: string }>) => {
      state.activeTypeSeat[action.payload.type] = action.payload.value;
    },

    setActiveTypeCoach: (state, action: PayloadAction<{ type: "from" | "to", value: string }>) => {
      state.activeTypeCoach[action.payload.type] = action.payload.value;
    },

    setOptionsService: (
      state,
      action: PayloadAction<{ type: "from" | "to", value: TSelectedOptions }>
    ) => {
      state.optionsService[action.payload.type] = action.payload.value;
    },

    setOpenedCoaches: (state, action: PayloadAction<{ direction: 'from' | 'to'; coaches: string[] }>) => {
      state.openedCoaches[action.payload.direction] = action.payload.coaches;
    },

    addSeat: (state, action: PayloadAction<{ type: "from" | "to", value: TSelectedSeat }>) => {
      state.selectedSeats[action.payload.type] =
        [...state.selectedSeats[action.payload.type], action.payload.value];
    },

    removeSeat: (state, action: PayloadAction<{ type: "from" | "to", value: TSelectedSeat }>) => {
      const { coach_id, seat_number } = action.payload.value;

      state.selectedSeats[action.payload.type] =
        state.selectedSeats[action.payload.type].filter(s =>
          !(s.coach_id === coach_id && s.seat_number === seat_number))
    },

    getSeatsFromSuccess: (state, action: PayloadAction<TSeat[]>) => {
      state.seatsFrom = action.payload;
      state.loading = false;
    },

    getSeatsToSuccess: (state, action: PayloadAction<TSeat[]>) => {
      state.seatsTo = action.payload;
      state.loading = false;
    },

    getSeatsFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
    resetSeatsState: () => {
      return initialState;
    }
  },
});

export const {
  requestSeats,
  setActiveTypeSeat,
  setActiveTypeCoach,
  setOptionsService,
  setOpenedCoaches,
  addSeat,
  removeSeat,
  getSeatsFromSuccess,
  getSeatsToSuccess,
  getSeatsFailure,
  resetSeatsState
} = seatsSlice.actions;

export default seatsSlice.reducer;