import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mainPostPending: false,
  postImgPending: false,
};

const pending = createSlice({
  name: "pending",
  initialState,
  reducers: {
    START_MAIN_POST_PENDING: (state) => {
      state.mainPostPending = true;
    },
    END_MAIN_POST_PENDING: (state) => {
      state.mainPostPending = false;
    },
    START_POST_IMG_PENDING: (state) => {
      state.postImgPending = true;
    },
    END_POST_IMG_PENDING: (state) => {
      state.postImgPending = false;
    },
  },
});

export const { START_MAIN_POST_PENDING, END_MAIN_POST_PENDING, START_POST_IMG_PENDING, END_POST_IMG_PENDING } = pending.actions;
export default pending.reducer;
