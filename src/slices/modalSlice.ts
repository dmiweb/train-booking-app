import { createSlice } from "@reduxjs/toolkit";

const initialState: { isOpen: boolean } = {
  isOpen: false,
};

export const modalSlice = createSlice({
  name: "cities",
  initialState,
  reducers: {
    setOpenModal: ((state) => {
      state.isOpen = true;
    }),

    setCloseModal: (state) => {
      state.isOpen = false;
    },
  }
});

export const {
  setOpenModal,
  setCloseModal,
} = modalSlice.actions;
export default modalSlice.reducer;