import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  isSearchModalShown: false,
};

const modal = createSlice({
  name: "modal",
  initialState,
  reducers: {
    TOGGLE_SEARCH_MODAL: (state, action) => {
      state.isSearchModalShown = !state.isSearchModalShown;
    },
  },
});
export const { TOGGLE_SEARCH_MODAL } = modal.actions;
export default modal.reducer;
