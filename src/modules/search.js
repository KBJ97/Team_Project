import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentSearch: null,
  searchLastVisible: null,
};
const search = createSlice({
  name: "search",
  initialState,
  reducers: {
    SET_CURRENT_SEARCH: (state, action) => {
      state.currentSearch = action.payload;
    },
    SET_SEARCH_LAST_VISIBLE: (state, action) => {
      state.searchLastVisible = action.payload;
    },
  },
});

export const { SET_CURRENT_SEARCH, SET_SEARCH_LAST_VISIBLE } = search.actions;
export default search.reducer;
